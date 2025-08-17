"""
Test Suite for AI-Powered Hiring Evaluation System
==================================================

This file contains basic tests to validate the core functionality
of the hiring evaluation system.

Run with: python test_system.py
"""

import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ai_hiring_system import (
    Candidate, Job, ResumeParser, SkillsMatcher, 
    BiasDetector, CandidateEvaluator, HiringDatabase
)

def test_resume_parser():
    """Test the resume parsing functionality."""
    print("🧪 Testing Resume Parser...")
    
    parser = ResumeParser()
    
    # Test resume text
    resume_text = """
    John Doe
    Software Engineer
    Experience: 4 years in Python development
    Skills: Python, React, AWS, Docker
    Education: Bachelor's in Computer Science
    Location: Seattle, WA
    """
    
    result = parser.parse_resume(resume_text)
    
    # Validate results
    assert 'python' in result['skills'], "Python skill not detected"
    assert result['experience_years'] == 4.0, "Experience not parsed correctly"
    assert result['education_level'] == 'bachelor', "Education level not detected"
    assert 'Seattle, WA' in result['location'], "Location not parsed correctly"
    
    print("✅ Resume Parser: PASSED")

def test_skills_matcher():
    """Test the skills matching functionality."""
    print("🧪 Testing Skills Matcher...")
    
    matcher = SkillsMatcher()
    
    # Test candidate skills
    candidate_skills = ['python', 'react', 'aws', 'docker']
    required_skills = ['python', 'react']
    preferred_skills = ['aws', 'kubernetes']
    
    score = matcher.calculate_skills_match(candidate_skills, required_skills, preferred_skills)
    
    # Validate score
    assert score > 0.8, f"Skills match score too low: {score}"
    assert score <= 1.0, f"Skills match score exceeds 1.0: {score}"
    
    print("✅ Skills Matcher: PASSED")

def test_bias_detector():
    """Test the bias detection functionality."""
    print("🧪 Testing Bias Detector...")
    
    detector = BiasDetector()
    
    # Test resume with potential bias
    resume_text = "Young female developer with 2 years experience"
    job_description = "Senior developer position for local candidates only"
    
    bias_indicators = detector.detect_bias(resume_text, job_description)
    
    # Validate bias detection
    assert 'gender_bias' in bias_indicators, "Gender bias not detected"
    assert 'age_bias' in bias_indicators, "Age bias not detected"
    assert 'location_bias' in bias_indicators, "Location bias not detected"
    
    print("✅ Bias Detector: PASSED")

def test_candidate_evaluator():
    """Test the candidate evaluation functionality."""
    print("🧪 Testing Candidate Evaluator...")
    
    evaluator = CandidateEvaluator()
    
    # Create test candidate and job
    candidate = Candidate(
        id="TEST001",
        name="Test Candidate",
        email="test@example.com",
        resume_text="Python developer with 5 years experience in web development",
        skills=["python", "react", "aws"],
        experience_years=5.0,
        education_level="bachelor",
        location="San Francisco, CA"
    )
    
    job = Job(
        id="JOB001",
        title="Senior Python Developer",
        company="TestCorp",
        required_skills=["python", "react"],
        preferred_skills=["aws", "docker"],
        experience_required=4.0,
        education_required="bachelor",
        location="San Francisco, CA",
        department="Engineering",
        salary_range=(100000, 150000)
    )
    
    # Evaluate candidate
    evaluation = evaluator.evaluate_candidate(candidate, job)
    
    # Validate evaluation
    assert evaluation is not None, "Evaluation failed"
    assert evaluation.overall_score > 0.7, f"Score too low: {evaluation.overall_score}"
    assert evaluation.skills_match > 0.8, f"Skills match too low: {evaluation.skills_match}"
    assert evaluation.experience_match > 0.8, f"Experience match too low: {evaluation.experience_match}"
    
    print("✅ Candidate Evaluator: PASSED")

def test_database_operations():
    """Test the database operations."""
    print("🧪 Testing Database Operations...")
    
    db = HiringDatabase()
    
    # Create test candidate
    candidate = Candidate(
        id="DB001",
        name="Database Test",
        email="db@test.com",
        resume_text="Test candidate for database operations",
        skills=["python"],
        experience_years=3.0,
        education_level="bachelor",
        location="Test City, TC"
    )
    
    # Test add candidate
    db.add_candidate(candidate)
    assert candidate.id in db.candidates, "Candidate not added to database"
    
    # Test get top candidates (empty for now)
    top_candidates = db.get_top_candidates("JOB001")
    assert len(top_candidates) == 0, "Top candidates should be empty initially"
    
    print("✅ Database Operations: PASSED")

def test_end_to_end():
    """Test the complete system end-to-end."""
    print("🧪 Testing End-to-End System...")
    
    # Initialize system
    db = HiringDatabase()
    evaluator = CandidateEvaluator()
    
    # Create test data
    candidate = Candidate(
        id="E2E001",
        name="End-to-End Test",
        email="e2e@test.com",
        resume_text="Full stack developer with 6 years experience in Python and React",
        skills=["python", "react", "node.js", "aws"],
        experience_years=6.0,
        education_level="masters",
        location="Austin, TX"
    )
    
    job = Job(
        id="E2EJOB001",
        title="Full Stack Developer",
        company="E2ETestCorp",
        required_skills=["python", "react"],
        preferred_skills=["node.js", "aws"],
        experience_required=5.0,
        education_required="bachelor",
        location="Austin, TX",
        department="Engineering",
        salary_range=(120000, 180000)
    )
    
    # Add to database
    db.add_candidate(candidate)
    db.add_job(job)
    
    # Evaluate
    evaluation = evaluator.evaluate_candidate(candidate, job)
    db.add_evaluation(evaluation)
    
    # Validate results
    assert evaluation.overall_score > 0.8, f"End-to-end evaluation score too low: {evaluation.overall_score}"
    
    # Test top candidates
    top_candidates = db.get_top_candidates("E2EJOB001")
    assert len(top_candidates) == 1, "Should have one top candidate"
    assert top_candidates[0][0].id == "E2E001", "Wrong top candidate"
    
    print("✅ End-to-End System: PASSED")

def run_all_tests():
    """Run all test functions."""
    print("🚀 Starting AI Hiring System Tests...\n")
    
    tests = [
        test_resume_parser,
        test_skills_matcher,
        test_bias_detector,
        test_candidate_evaluator,
        test_database_operations,
        test_end_to_end
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            test()
            passed += 1
        except Exception as e:
            print(f"❌ {test.__name__}: FAILED - {str(e)}")
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The AI Hiring System is working correctly.")
    else:
        print("⚠️  Some tests failed. Please review the implementation.")
    
    return passed == total

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
