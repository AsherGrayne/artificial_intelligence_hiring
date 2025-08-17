from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import json
import sys
import os

# Add the parent directory to sys.path to import the AI system
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ai_hiring_system import (
    Candidate, Job, EvaluationResult, ResumeParser, SkillsMatcher, 
    BiasDetector, CandidateEvaluator, HiringDatabase, HiringAnalytics,
    create_sample_data
)

app = FastAPI(
    title="AI Hiring Evaluation System API",
    description="Backend API for AI-powered candidate evaluation and hiring analytics",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
resume_parser = ResumeParser()
skills_matcher = SkillsMatcher()
bias_detector = BiasDetector()
candidate_evaluator = CandidateEvaluator()
hiring_db = HiringDatabase()
hiring_analytics = HiringAnalytics(hiring_db)

# Create sample data on startup
sample_data = create_sample_data()
candidates, jobs = sample_data
for candidate in candidates:
    hiring_db.add_candidate(candidate)
for job in jobs:
    hiring_db.add_job(job)

# Pydantic models for API requests/responses
class CandidateCreate(BaseModel):
    name: str
    email: str
    experience: int
    education: str
    location: str
    skills: List[str]
    resume_text: Optional[str] = None

class JobCreate(BaseModel):
    title: str
    company: str
    department: str
    location: str
    required_skills: List[str]
    experience_required: int
    education_required: str
    description: str

class EvaluationRequest(BaseModel):
    candidate_id: int
    job_id: int

class ResumeUpload(BaseModel):
    candidate_id: int
    resume_text: str

# API Endpoints

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "AI Hiring Evaluation System API",
        "version": "1.0.0",
        "endpoints": {
            "candidates": "/candidates",
            "jobs": "/jobs", 
            "evaluations": "/evaluations",
            "analytics": "/analytics",
            "resume": "/resume/upload"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "AI Hiring System is running"}

# Candidates endpoints
@app.get("/candidates", response_model=List[Dict[str, Any]])
async def get_candidates(
    status: Optional[str] = None,
    experience_min: Optional[int] = None,
    experience_max: Optional[int] = None,
    skills: Optional[str] = None,
    location: Optional[str] = None
):
    """Get all candidates with optional filtering"""
    candidates = hiring_db.get_all_candidates()
    
    # Apply filters
    if status:
        candidates = [c for c in candidates if c.status == status]
    if experience_min is not None:
        candidates = [c for c in candidates if c.experience >= experience_min]
    if experience_max is not None:
        candidates = [c for c in candidates if c.experience <= experience_max]
    if skills:
        skill_list = [s.strip().lower() for s in skills.split(',')]
        candidates = [c for c in candidates if any(skill in [s.lower() for s in c.skills] for skill in skill_list)]
    if location:
        candidates = [c for c in candidates if location.lower() in c.location.lower()]
    
    return [c.__dict__ for c in candidates]

@app.get("/candidates/{candidate_id}", response_model=Dict[str, Any])
async def get_candidate(candidate_id: int):
    """Get a specific candidate by ID"""
    candidate = hiring_db.get_candidate(candidate_id)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate.__dict__

@app.post("/candidates", response_model=Dict[str, Any])
async def create_candidate(candidate_data: CandidateCreate):
    """Create a new candidate"""
    try:
        # Parse resume if provided
        parsed_skills = []
        if candidate_data.resume_text:
            parsed_skills = resume_parser.extract_skills(candidate_data.resume_text)
            # Merge with provided skills
            all_skills = list(set(candidate_data.skills + parsed_skills))
        else:
            all_skills = candidate_data.skills
        
        candidate = Candidate(
            id=len(hiring_db.candidates) + 1,
            name=candidate_data.name,
            email=candidate_data.email,
            experience=candidate_data.experience,
            education=candidate_data.education,
            location=candidate_data.location,
            skills=all_skills,
            status="active",
            last_evaluation=None,
            average_score=0.0,
            bias_detected=False
        )
        
        hiring_db.add_candidate(candidate)
        return {"message": "Candidate created successfully", "candidate": candidate.__dict__}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/candidates/{candidate_id}", response_model=Dict[str, Any])
async def update_candidate(candidate_id: int, candidate_data: CandidateCreate):
    """Update an existing candidate"""
    candidate = hiring_db.get_candidate(candidate_id)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    try:
        # Update candidate fields
        candidate.name = candidate_data.name
        candidate.email = candidate_data.email
        candidate.experience = candidate_data.experience
        candidate.education = candidate_data.education
        candidate.location = candidate_data.location
        candidate.skills = candidate_data.skills
        
        return {"message": "Candidate updated successfully", "candidate": candidate.__dict__}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/candidates/{candidate_id}")
async def delete_candidate(candidate_id: int):
    """Delete a candidate"""
    candidate = hiring_db.get_candidate(candidate_id)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    hiring_db.candidates = [c for c in hiring_db.candidates if c.id != candidate_id]
    return {"message": "Candidate deleted successfully"}

# Jobs endpoints
@app.get("/jobs", response_model=List[Dict[str, Any]])
async def get_jobs(
    department: Optional[str] = None,
    location: Optional[str] = None,
    experience_required: Optional[int] = None
):
    """Get all jobs with optional filtering"""
    jobs = hiring_db.get_all_jobs()
    
    # Apply filters
    if department:
        jobs = [j for j in jobs if department.lower() in j.department.lower()]
    if location:
        jobs = [j for j in jobs if location.lower() in j.location.lower()]
    if experience_required is not None:
        jobs = [j for j in jobs if j.experience_required <= experience_required]
    
    return [j.__dict__ for j in jobs]

@app.get("/jobs/{job_id}", response_model=Dict[str, Any])
async def get_job(job_id: int):
    """Get a specific job by ID"""
    job = hiring_db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job.__dict__

@app.post("/jobs", response_model=Dict[str, Any])
async def create_job(job_data: JobCreate):
    """Create a new job posting"""
    try:
        job = Job(
            id=len(hiring_db.jobs) + 1,
            title=job_data.title,
            company=job_data.company,
            department=job_data.department,
            location=job_data.location,
            required_skills=job_data.required_skills,
            experience_required=job_data.experience_required,
            education_required=job_data.education_required,
            description=job_data.description,
            status="active"
        )
        
        hiring_db.add_job(job)
        return {"message": "Job created successfully", "job": job.__dict__}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/jobs/{job_id}", response_model=Dict[str, Any])
async def update_job(job_id: int, job_data: JobCreate):
    """Update an existing job"""
    job = hiring_db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    try:
        # Update job fields
        job.title = job_data.title
        job.company = job_data.company
        job.department = job_data.department
        job.location = job_data.location
        job.required_skills = job_data.required_skills
        job.experience_required = job_data.experience_required
        job.education_required = job_data.education_required
        job.description = job_data.description
        
        return {"message": "Job updated successfully", "job": job.__dict__}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/jobs/{job_id}")
async def delete_job(job_id: int):
    """Delete a job"""
    job = hiring_db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    hiring_db.jobs = [j for j in hiring_db.jobs if j.id != job_id]
    return {"message": "Job deleted successfully"}

# Evaluation endpoints
@app.get("/evaluations", response_model=List[Dict[str, Any]])
async def get_evaluations(
    candidate_id: Optional[int] = None,
    job_id: Optional[int] = None
):
    """Get all evaluations with optional filtering"""
    evaluations = hiring_db.get_all_evaluations()
    
    # Apply filters
    if candidate_id:
        evaluations = [e for e in evaluations if e.candidate_id == candidate_id]
    if job_id:
        evaluations = [e for e in evaluations if e.job_id == job_id]
    
    return [e.__dict__ for e in evaluations]

@app.get("/evaluations/{evaluation_id}", response_model=Dict[str, Any])
async def get_evaluation(evaluation_id: int):
    """Get a specific evaluation by ID"""
    evaluation = hiring_db.get_evaluation(evaluation_id)
    if not evaluation:
        raise HTTPException(status_code=404, detail="Evaluation not found")
    return evaluation.__dict__

@app.post("/evaluations", response_model=Dict[str, Any])
async def create_evaluation(evaluation_request: EvaluationRequest):
    """Create a new evaluation for a candidate-job pair"""
    try:
        candidate = hiring_db.get_candidate(evaluation_request.candidate_id)
        job = hiring_db.get_job(evaluation_request.job_id)
        
        if not candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        # Run the AI evaluation
        evaluation_result = candidate_evaluator.evaluate_candidate(candidate, job)
        
        # Store the evaluation
        evaluation = EvaluationResult(
            id=len(hiring_db.evaluations) + 1,
            candidate_id=candidate.id,
            job_id=job.id,
            overall_score=evaluation_result.overall_score,
            skills_score=evaluation_result.skills_score,
            experience_score=evaluation_result.experience_score,
            education_score=evaluation_result.education_score,
            location_score=evaluation_result.location_score,
            bias_penalty=evaluation_result.bias_penalty,
            bias_detected=evaluation_result.bias_detected,
            evaluation_date=evaluation_result.evaluation_date,
            notes=evaluation_result.notes
        )
        
        hiring_db.add_evaluation(evaluation)
        
        # Update candidate's average score
        candidate_evaluations = [e for e in hiring_db.evaluations if e.candidate_id == candidate.id]
        if candidate_evaluations:
            candidate.average_score = sum(e.overall_score for e in candidate_evaluations) / len(candidate_evaluations)
            candidate.bias_detected = any(e.bias_detected for e in candidate_evaluations)
            candidate.last_evaluation = evaluation.evaluation_date
        
        return {
            "message": "Evaluation completed successfully",
            "evaluation": evaluation.__dict__,
            "candidate": candidate.__dict__,
            "job": job.__dict__
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Resume parsing endpoint
@app.post("/resume/upload", response_model=Dict[str, Any])
async def upload_resume(resume_data: ResumeUpload):
    """Parse resume text and extract skills"""
    try:
        candidate = hiring_db.get_candidate(resume_data.candidate_id)
        if not candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")
        
        # Extract skills from resume
        extracted_skills = resume_parser.extract_skills(resume_data.resume_text)
        
        # Update candidate skills
        all_skills = list(set(candidate.skills + extracted_skills))
        candidate.skills = all_skills
        
        return {
            "message": "Resume parsed successfully",
            "extracted_skills": extracted_skills,
            "all_skills": all_skills,
            "candidate": candidate.__dict__
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Analytics endpoints
@app.get("/analytics/dashboard", response_model=Dict[str, Any])
async def get_dashboard_analytics():
    """Get dashboard analytics and metrics"""
    try:
        analytics = hiring_analytics.generate_dashboard_insights(hiring_db)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/candidates", response_model=Dict[str, Any])
async def get_candidate_analytics():
    """Get candidate-specific analytics"""
    try:
        analytics = hiring_analytics.generate_candidate_insights(hiring_db)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/jobs", response_model=Dict[str, Any])
async def get_job_analytics():
    """Get job-specific analytics"""
    try:
        analytics = hiring_analytics.generate_job_insights(hiring_db)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/bias", response_model=Dict[str, Any])
async def get_bias_analytics():
    """Get bias detection analytics"""
    try:
        analytics = hiring_analytics.generate_bias_insights(hiring_db)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Skills matching endpoint
@app.post("/skills/match", response_model=Dict[str, Any])
async def match_skills(candidate_skills: List[str], job_skills: List[str]):
    """Match candidate skills with job requirements"""
    try:
        match_score = skills_matcher.calculate_match_score(candidate_skills, job_skills)
        missing_skills = skills_matcher.identify_missing_skills(candidate_skills, job_skills)
        
        return {
            "match_score": match_score,
            "missing_skills": missing_skills,
            "candidate_skills": candidate_skills,
            "job_skills": job_skills
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Bias detection endpoint
@app.post("/bias/detect", response_model=Dict[str, Any])
async def detect_bias(candidate_data: Dict[str, Any]):
    """Detect potential biases in candidate data"""
    try:
        bias_result = bias_detector.detect_bias(candidate_data)
        return bias_result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
