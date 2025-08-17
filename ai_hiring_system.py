"""
AI-Powered Hiring Evaluation System
====================================

This project demonstrates an AI-driven system that improves how candidates 
are evaluated for jobs, addressing the core challenge of the AI Hiring Challenge.

Key Features:
- Resume parsing and analysis using NLP
- Skills extraction and matching
- Candidate-job fit scoring
- Bias detection and mitigation
- Performance analytics dashboard

Author: AI Hiring Challenge Participant
Date: August 2024
"""

import json
import re
import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# DATA STRUCTURES
# ============================================================================

@dataclass
class Candidate:
    """Represents a job candidate with their profile and evaluation data."""
    id: str
    name: str
    email: str
    resume_text: str
    skills: List[str]
    experience_years: float
    education_level: str
    location: str
    evaluation_score: float = 0.0
    bias_detected: bool = False
    evaluation_timestamp: Optional[datetime] = None

@dataclass
class Job:
    """Represents a job posting with requirements and criteria."""
    id: str
    title: str
    company: str
    required_skills: List[str]
    preferred_skills: List[str]
    experience_required: float
    education_required: str
    location: str
    department: str
    salary_range: Tuple[float, float]

@dataclass
class EvaluationResult:
    """Contains the results of candidate evaluation."""
    candidate_id: str
    job_id: str
    overall_score: float
    skills_match: float
    experience_match: float
    education_match: float
    location_match: float
    bias_indicators: List[str]
    recommendations: List[str]
    timestamp: datetime

# ============================================================================
# CORE AI COMPONENTS
# ============================================================================

class ResumeParser:
    """AI-powered resume parsing and analysis system."""
    
    def __init__(self):
        self.skill_patterns = {
            'programming': r'\b(python|java|c\+\+|javascript|react|node\.js|sql|aws|docker|kubernetes)\b',
            'soft_skills': r'\b(leadership|communication|teamwork|problem-solving|analytical|creative)\b',
            'tools': r'\b(git|jira|confluence|slack|zoom|teams|figma|photoshop)\b',
            'certifications': r'\b(certified|certification|cert|aws|azure|google|microsoft)\b'
        }
        
    def parse_resume(self, resume_text: str) -> Dict:
        """Extract structured information from resume text using NLP techniques."""
        try:
            # Convert to lowercase for pattern matching
            text_lower = resume_text.lower()
            
            # Extract skills using regex patterns
            extracted_skills = []
            for category, pattern in self.skill_patterns.items():
                matches = re.findall(pattern, text_lower)
                extracted_skills.extend(matches)
            
            # Extract experience (look for years, months patterns)
            experience_match = re.search(r'(\d+)\s*(?:years?|yrs?)', text_lower)
            experience_years = float(experience_match.group(1)) if experience_match else 0.0
            
            # Extract education level
            education_levels = ['phd', 'masters', 'bachelor', 'associate', 'high school']
            education_level = 'bachelor'  # default
            for level in education_levels:
                if level in text_lower:
                    education_level = level
                    break
            
            # Extract location (look for city, state patterns)
            location_match = re.search(r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z]{2})', resume_text)
            location = location_match.group(0) if location_match else "Unknown"
            
            return {
                'skills': list(set(extracted_skills)),
                'experience_years': experience_years,
                'education_level': education_level,
                'location': location
            }
            
        except Exception as e:
            logger.error(f"Error parsing resume: {e}")
            return {
                'skills': [],
                'experience_years': 0.0,
                'education_level': 'unknown',
                'location': 'unknown'
            }

class SkillsMatcher:
    """AI-powered skills matching and scoring system."""
    
    def __init__(self):
        self.skill_weights = {
            'programming': 0.3,
            'soft_skills': 0.2,
            'tools': 0.15,
            'certifications': 0.1
        }
    
    def calculate_skills_match(self, candidate_skills: List[str], 
                             required_skills: List[str], 
                             preferred_skills: List[str]) -> float:
        """Calculate skills match score using weighted matching algorithm."""
        try:
            if not required_skills:
                return 0.0
            
            # Calculate required skills match
            required_matches = sum(1 for skill in required_skills 
                                if any(req_skill.lower() in skill.lower() 
                                      for req_skill in required_skills))
            required_score = required_matches / len(required_skills)
            
            # Calculate preferred skills bonus
            preferred_matches = sum(1 for skill in candidate_skills 
                                 if any(pref_skill.lower() in skill.lower() 
                                       for pref_skill in preferred_skills))
            preferred_bonus = min(preferred_matches * 0.1, 0.2)  # Max 20% bonus
            
            # Calculate weighted score
            total_score = (required_score * 0.8) + preferred_bonus
            
            return min(total_score, 1.0)  # Cap at 1.0
            
        except Exception as e:
            logger.error(f"Error calculating skills match: {e}")
            return 0.0

class BiasDetector:
    """AI system for detecting and mitigating bias in hiring decisions."""
    
    def __init__(self):
        self.bias_indicators = {
            'gender_bias': ['male', 'female', 'he', 'she', 'his', 'her'],
            'age_bias': ['young', 'old', 'senior', 'junior', 'fresh graduate'],
            'location_bias': ['local', 'remote', 'onsite', 'relocation'],
            'education_bias': ['ivy league', 'top university', 'prestigious']
        }
    
    def detect_bias(self, resume_text: str, job_description: str) -> Dict:
        """Detect potential bias indicators in resume and job description."""
        try:
            bias_found = {}
            text_lower = resume_text.lower() + " " + job_description.lower()
            
            for bias_type, indicators in self.bias_indicators.items():
                matches = [indicator for indicator in indicators 
                          if indicator in text_lower]
                if matches:
                    bias_found[bias_type] = matches
            
            return bias_found
            
        except Exception as e:
            logger.error(f"Error detecting bias: {e}")
            return {}

class CandidateEvaluator:
    """Main AI system for comprehensive candidate evaluation."""
    
    def __init__(self):
        self.resume_parser = ResumeParser()
        self.skills_matcher = SkillsMatcher()
        self.bias_detector = BiasDetector()
        
        # Evaluation weights
        self.weights = {
            'skills': 0.35,
            'experience': 0.25,
            'education': 0.20,
            'location': 0.10,
            'bias_penalty': 0.10
        }
    
    def evaluate_candidate(self, candidate: Candidate, job: Job) -> EvaluationResult:
        """Perform comprehensive AI-powered candidate evaluation."""
        try:
            # Parse resume if not already done
            if not candidate.skills:
                parsed_data = self.resume_parser.parse_resume(candidate.resume_text)
                candidate.skills = parsed_data['skills']
                candidate.experience_years = parsed_data['experience_years']
                candidate.education_level = parsed_data['education_level']
                candidate.location = parsed_data['location']
            
            # Calculate individual match scores
            skills_match = self.skills_matcher.calculate_skills_match(
                candidate.skills, job.required_skills, job.preferred_skills
            )
            
            experience_match = self._calculate_experience_match(
                candidate.experience_years, job.experience_required
            )
            
            education_match = self._calculate_education_match(
                candidate.education_level, job.education_required
            )
            
            location_match = self._calculate_location_match(
                candidate.location, job.location
            )
            
            # Detect bias
            bias_indicators = self.bias_detector.detect_bias(
                candidate.resume_text, f"{job.title} {job.company}"
            )
            
            # Calculate overall score
            overall_score = (
                skills_match * self.weights['skills'] +
                experience_match * self.weights['experience'] +
                education_match * self.weights['education'] +
                location_match * self.weights['location']
            )
            
            # Apply bias penalty if bias detected
            if bias_indicators:
                overall_score *= (1 - self.weights['bias_penalty'])
                candidate.bias_detected = True
            
            # Generate recommendations
            recommendations = self._generate_recommendations(
                skills_match, experience_match, education_match, 
                location_match, bias_indicators
            )
            
            return EvaluationResult(
                candidate_id=candidate.id,
                job_id=job.id,
                overall_score=overall_score,
                skills_match=skills_match,
                experience_match=experience_match,
                education_match=education_match,
                location_match=location_match,
                bias_indicators=list(bias_indicators.keys()),
                recommendations=recommendations,
                timestamp=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Error evaluating candidate: {e}")
            return None
    
    def _calculate_experience_match(self, candidate_exp: float, required_exp: float) -> float:
        """Calculate experience match score."""
        if candidate_exp >= required_exp:
            return 1.0
        elif candidate_exp >= required_exp * 0.7:
            return 0.8
        elif candidate_exp >= required_exp * 0.5:
            return 0.6
        else:
            return 0.3
    
    def _calculate_education_match(self, candidate_edu: str, required_edu: str) -> float:
        """Calculate education match score."""
        education_hierarchy = {
            'high school': 1,
            'associate': 2,
            'bachelor': 3,
            'masters': 4,
            'phd': 5
        }
        
        candidate_level = education_hierarchy.get(candidate_edu.lower(), 1)
        required_level = education_hierarchy.get(required_edu.lower(), 1)
        
        if candidate_level >= required_level:
            return 1.0
        elif candidate_level >= required_level - 1:
            return 0.7
        else:
            return 0.4
    
    def _calculate_location_match(self, candidate_loc: str, job_loc: str) -> float:
        """Calculate location match score."""
        if candidate_loc.lower() == job_loc.lower():
            return 1.0
        elif 'remote' in job_loc.lower():
            return 0.9
        elif any(word in candidate_loc.lower() for word in job_loc.lower().split()):
            return 0.7
        else:
            return 0.3
    
    def _generate_recommendations(self, skills_match: float, experience_match: float,
                                education_match: float, location_match: float,
                                bias_indicators: Dict) -> List[str]:
        """Generate AI-powered recommendations for improvement."""
        recommendations = []
        
        if skills_match < 0.7:
            recommendations.append("Consider acquiring additional required skills through courses or certifications")
        
        if experience_match < 0.7:
            recommendations.append("Gain more relevant work experience in the field")
        
        if education_match < 0.7:
            recommendations.append("Consider pursuing higher education or relevant certifications")
        
        if location_match < 0.7:
            recommendations.append("Consider relocation or remote work opportunities")
        
        if bias_indicators:
            recommendations.append("Review content for potential bias indicators and ensure inclusive language")
        
        if not recommendations:
            recommendations.append("Strong candidate profile - consider for next round")
        
        return recommendations

# ============================================================================
# DATA MANAGEMENT
# ============================================================================

class HiringDatabase:
    """Database management for candidates, jobs, and evaluations."""
    
    def __init__(self):
        self.candidates = {}
        self.jobs = {}
        self.evaluations = []
    
    def add_candidate(self, candidate: Candidate):
        """Add a new candidate to the database."""
        self.candidates[candidate.id] = candidate
        logger.info(f"Added candidate: {candidate.name}")
    
    def add_job(self, job: Job):
        """Add a new job posting to the database."""
        self.jobs[job.id] = job
        logger.info(f"Added job: {job.title} at {job.company}")
    
    def add_evaluation(self, evaluation: EvaluationResult):
        """Add evaluation result to the database."""
        self.evaluations.append(evaluation)
        logger.info(f"Added evaluation for candidate {evaluation.candidate_id}")
    
    def get_top_candidates(self, job_id: str, limit: int = 5) -> List[Tuple[Candidate, float]]:
        """Get top candidates for a specific job based on evaluation scores."""
        job_evaluations = [e for e in self.evaluations if e.job_id == job_id]
        job_evaluations.sort(key=lambda x: x.overall_score, reverse=True)
        
        top_candidates = []
        for eval_result in job_evaluations[:limit]:
            candidate = self.candidates.get(eval_result.candidate_id)
            if candidate:
                top_candidates.append((candidate, eval_result.overall_score))
        
        return top_candidates
    
    def export_data(self, filename: str):
        """Export data to JSON format for analysis."""
        data = {
            'candidates': {cid: {
                'name': c.name,
                'email': c.email,
                'skills': c.skills,
                'experience_years': c.experience_years,
                'education_level': c.education_level,
                'location': c.location,
                'evaluation_score': c.evaluation_score,
                'bias_detected': c.bias_detected
            } for cid, c in self.candidates.items()},
            'jobs': {jid: {
                'title': j.title,
                'company': j.company,
                'required_skills': j.required_skills,
                'experience_required': j.experience_required,
                'education_required': j.education_required,
                'location': j.location
            } for jid, j in self.jobs.items()},
            'evaluations': [{
                'candidate_id': e.candidate_id,
                'job_id': e.job_id,
                'overall_score': e.overall_score,
                'skills_match': e.skills_match,
                'experience_match': e.evaluation_match,
                'education_match': e.education_match,
                'location_match': e.location_match,
                'bias_indicators': e.bias_indicators,
                'recommendations': e.recommendations,
                'timestamp': e.timestamp.isoformat()
            } for e in self.evaluations]
        }
        
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        
        logger.info(f"Data exported to {filename}")

# ============================================================================
# ANALYTICS AND REPORTING
# ============================================================================

class HiringAnalytics:
    """AI-powered analytics and insights for hiring decisions."""
    
    def __init__(self, database: HiringDatabase):
        self.db = database
    
    def generate_hiring_report(self, job_id: str) -> Dict:
        """Generate comprehensive hiring report with AI insights."""
        try:
            job = self.db.jobs.get(job_id)
            if not job:
                return {"error": "Job not found"}
            
            # Get all evaluations for this job
            job_evaluations = [e for e in self.db.evaluations if e.job_id == job_id]
            
            if not job_evaluations:
                return {"error": "No evaluations found for this job"}
            
            # Calculate statistics
            scores = [e.overall_score for e in job_evaluations]
            skills_scores = [e.skills_match for e in job_evaluations]
            experience_scores = [e.experience_match for e in job_evaluations]
            
            # Identify top performers
            top_candidates = self.db.get_top_candidates(job_id, 3)
            
            # Bias analysis
            bias_count = sum(1 for e in job_evaluations if e.bias_indicators)
            bias_percentage = (bias_count / len(job_evaluations)) * 100
            
            # Generate insights
            insights = self._generate_insights(scores, skills_scores, experience_scores, bias_percentage)
            
            return {
                'job_title': job.title,
                'company': job.company,
                'total_candidates': len(job_evaluations),
                'statistics': {
                    'average_score': np.mean(scores),
                    'score_std': np.std(scores),
                    'min_score': np.min(scores),
                    'max_score': np.max(scores),
                    'average_skills_match': np.mean(skills_scores),
                    'average_experience_match': np.mean(experience_scores)
                },
                'top_candidates': [
                    {
                        'name': c.name,
                        'score': score,
                        'skills': c.skills[:5]  # Top 5 skills
                    } for c, score in top_candidates
                ],
                'bias_analysis': {
                    'bias_detected_count': bias_count,
                    'bias_percentage': bias_percentage,
                    'recommendation': 'Consider bias training for evaluators' if bias_percentage > 20 else 'Bias levels are acceptable'
                },
                'insights': insights,
                'recommendations': self._generate_strategic_recommendations(scores, bias_percentage)
            }
            
        except Exception as e:
            logger.error(f"Error generating hiring report: {e}")
            return {"error": str(e)}
    
    def _generate_insights(self, scores: List[float], skills_scores: List[float], 
                          experience_scores: List[float], bias_percentage: float) -> List[str]:
        """Generate AI-powered insights from evaluation data."""
        insights = []
        
        # Score distribution insights
        if np.std(scores) < 0.1:
            insights.append("Low score variance suggests the evaluation criteria may be too broad")
        elif np.std(scores) > 0.3:
            insights.append("High score variance indicates good candidate differentiation")
        
        # Skills gap insights
        avg_skills = np.mean(skills_scores)
        if avg_skills < 0.6:
            insights.append("Skills gap detected - consider training programs or adjusting requirements")
        elif avg_skills > 0.8:
            insights.append("Strong skills alignment - focus on other differentiating factors")
        
        # Experience insights
        avg_experience = np.mean(experience_scores)
        if avg_experience < 0.5:
            insights.append("Experience requirements may be too high for available talent pool")
        
        # Bias insights
        if bias_percentage > 30:
            insights.append("High bias detection rate - review evaluation process for fairness")
        
        return insights
    
    def _generate_strategic_recommendations(self, scores: List[float], bias_percentage: float) -> List[str]:
        """Generate strategic recommendations for hiring process improvement."""
        recommendations = []
        
        avg_score = np.mean(scores)
        
        if avg_score < 0.6:
            recommendations.append("Consider revising job requirements to better match available talent")
            recommendations.append("Implement targeted recruitment strategies for specific skill sets")
        
        if bias_percentage > 20:
            recommendations.append("Implement bias training for all evaluators")
            recommendations.append("Review and update evaluation criteria for inclusivity")
        
        if len(scores) < 10:
            recommendations.append("Expand candidate pool for better selection diversity")
        
        recommendations.append("Regularly review and update evaluation criteria based on performance data")
        
        return recommendations

# ============================================================================
# DEMO AND TESTING
# ============================================================================

def create_sample_data():
    """Create sample data for demonstration purposes."""
    
    # Sample candidates
    candidates = [
        Candidate(
            id="C001",
            name="Alice Johnson",
            email="alice.johnson@email.com",
            resume_text="Experienced Python developer with 5 years in web development. Proficient in React, Node.js, and AWS. Strong leadership and communication skills.",
            skills=["python", "react", "node.js", "aws", "leadership"],
            experience_years=5.0,
            education_level="bachelor",
            location="San Francisco, CA"
        ),
        Candidate(
            id="C002",
            name="Bob Smith",
            email="bob.smith@email.com",
            resume_text="Java developer with 3 years experience. Knowledge of Spring Boot, Docker, and Kubernetes. Team player with problem-solving abilities.",
            skills=["java", "spring boot", "docker", "kubernetes"],
            experience_years=3.0,
            education_level="bachelor",
            location="New York, NY"
        ),
        Candidate(
            id="C003",
            name="Carol Davis",
            email="carol.davis@email.com",
            resume_text="Senior software engineer with 8 years experience. Expert in Python, machine learning, and cloud architecture. PhD in Computer Science.",
            skills=["python", "machine learning", "aws", "docker"],
            experience_years=8.0,
            education_level="phd",
            location="Austin, TX"
        )
    ]
    
    # Sample jobs
    jobs = [
        Job(
            id="J001",
            title="Senior Python Developer",
            company="TechCorp",
            required_skills=["python", "react", "aws"],
            preferred_skills=["docker", "kubernetes", "machine learning"],
            experience_required=5.0,
            education_required="bachelor",
            location="San Francisco, CA",
            department="Engineering",
            salary_range=(120000, 180000)
        ),
        Job(
            id="J002",
            title="Java Backend Developer",
            company="StartupXYZ",
            required_skills=["java", "spring boot"],
            preferred_skills=["docker", "kubernetes", "aws"],
            experience_required=3.0,
            education_required="bachelor",
            location="New York, NY",
            department="Backend",
            salary_range=(90000, 130000)
        )
    ]
    
    return candidates, jobs

def run_demo():
    """Run a demonstration of the AI hiring system."""
    print("=" * 60)
    print("AI-POWERED HIRING EVALUATION SYSTEM DEMO")
    print("=" * 60)
    
    # Initialize system components
    database = HiringDatabase()
    evaluator = CandidateEvaluator()
    analytics = HiringAnalytics(database)
    
    # Create sample data
    candidates, jobs = create_sample_data()
    
    # Add data to database
    for candidate in candidates:
        database.add_candidate(candidate)
    
    for job in jobs:
        database.add_job(job)
    
    print(f"\nLoaded {len(candidates)} candidates and {len(jobs)} jobs")
    
    # Evaluate candidates for jobs
    print("\n" + "=" * 40)
    print("EVALUATING CANDIDATES")
    print("=" * 40)
    
    for job in jobs:
        print(f"\nEvaluating candidates for: {job.title} at {job.company}")
        print("-" * 50)
        
        for candidate in candidates:
            evaluation = evaluator.evaluate_candidate(candidate, job)
            if evaluation:
                database.add_evaluation(evaluation)
                
                print(f"\nCandidate: {candidate.name}")
                print(f"Overall Score: {evaluation.overall_score:.2f}")
                print(f"Skills Match: {evaluation.skills_match:.2f}")
                print(f"Experience Match: {evaluation.experience_match:.2f}")
                print(f"Education Match: {evaluation.education_match:.2f}")
                print(f"Location Match: {evaluation.location_match:.2f}")
                
                if evaluation.bias_indicators:
                    print(f"⚠️  Bias Detected: {', '.join(evaluation.bias_indicators)}")
                
                print(f"Recommendations: {evaluation.recommendations[0]}")
    
    # Generate analytics reports
    print("\n" + "=" * 40)
    print("ANALYTICS REPORTS")
    print("=" * 40)
    
    for job in jobs:
        report = analytics.generate_hiring_report(job.id)
        if 'error' not in report:
            print(f"\n📊 Hiring Report for {report['job_title']}")
            print(f"Total Candidates: {report['total_candidates']}")
            print(f"Average Score: {report['statistics']['average_score']:.2f}")
            print(f"Top Candidate: {report['top_candidates'][0]['name']} (Score: {report['top_candidates'][0]['score']:.2f})")
            print(f"Bias Detection: {report['bias_analysis']['bias_percentage']:.1f}%")
    
    # Export data
    database.export_data("hiring_data_export.json")
    print(f"\n💾 Data exported to hiring_data_export.json")
    
    print("\n" + "=" * 60)
    print("DEMO COMPLETED SUCCESSFULLY!")
    print("=" * 60)

# ============================================================================
# MAIN EXECUTION
# ============================================================================

if __name__ == "__main__":
    try:
        run_demo()
    except Exception as e:
        logger.error(f"Demo failed: {e}")
        print(f"Error running demo: {e}")
