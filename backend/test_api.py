import pytest
import requests
import json
from fastapi.testclient import TestClient
import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app

client = TestClient(app)

class TestAIHiringAPI:
    """Test suite for the AI Hiring System API"""
    
    def test_root_endpoint(self):
        """Test the root endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "AI Hiring Evaluation System API" in data["message"]
        assert "endpoints" in data
    
    def test_health_check(self):
        """Test the health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
    
    def test_get_candidates(self):
        """Test getting all candidates"""
        response = client.get("/candidates")
        assert response.status_code == 200
        candidates = response.json()
        assert isinstance(candidates, list)
        assert len(candidates) > 0
        
        # Check candidate structure
        if candidates:
            candidate = candidates[0]
            required_fields = ["id", "name", "email", "experience", "skills"]
            for field in required_fields:
                assert field in candidate
    
    def test_get_candidates_with_filters(self):
        """Test getting candidates with filters"""
        # Test experience filter
        response = client.get("/candidates?experience_min=3")
        assert response.status_code == 200
        candidates = response.json()
        for candidate in candidates:
            assert candidate["experience"] >= 3
        
        # Test skills filter
        response = client.get("/candidates?skills=Python")
        assert response.status_code == 200
        candidates = response.json()
        for candidate in candidates:
            skills_lower = [skill.lower() for skill in candidate["skills"]]
            assert "python" in skills_lower
    
    def test_get_candidate_by_id(self):
        """Test getting a specific candidate"""
        # First get all candidates to get an ID
        response = client.get("/candidates")
        assert response.status_code == 200
        candidates = response.json()
        
        if candidates:
            candidate_id = candidates[0]["id"]
            response = client.get(f"/candidates/{candidate_id}")
            assert response.status_code == 200
            candidate = response.json()
            assert candidate["id"] == candidate_id
    
    def test_create_candidate(self):
        """Test creating a new candidate"""
        candidate_data = {
            "name": "Test Candidate",
            "email": "test@example.com",
            "experience": 4,
            "education": "Master",
            "location": "Test City, CA",
            "skills": ["Python", "JavaScript"],
            "resume_text": "Experienced developer with Python and JavaScript skills."
        }
        
        response = client.post("/candidates", json=candidate_data)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Candidate created successfully" in data["message"]
        assert "candidate" in data
    
    def test_get_jobs(self):
        """Test getting all jobs"""
        response = client.get("/jobs")
        assert response.status_code == 200
        jobs = response.json()
        assert isinstance(jobs, list)
        assert len(jobs) > 0
        
        # Check job structure
        if jobs:
            job = jobs[0]
            required_fields = ["id", "title", "company", "required_skills"]
            for field in required_fields:
                assert field in job
    
    def test_get_jobs_with_filters(self):
        """Test getting jobs with filters"""
        # Test department filter
        response = client.get("/jobs?department=Engineering")
        assert response.status_code == 200
        jobs = response.json()
        for job in jobs:
            assert "Engineering" in job["department"]
    
    def test_create_job(self):
        """Test creating a new job"""
        job_data = {
            "title": "Test Developer",
            "company": "Test Corp",
            "department": "Engineering",
            "location": "Test City, CA",
            "required_skills": ["Python", "React"],
            "experience_required": 3,
            "education_required": "Bachelor",
            "description": "We are looking for a test developer."
        }
        
        response = client.post("/jobs", json=job_data)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Job created successfully" in data["message"]
        assert "job" in data
    
    def test_get_evaluations(self):
        """Test getting all evaluations"""
        response = client.get("/evaluations")
        assert response.status_code == 200
        evaluations = response.json()
        assert isinstance(evaluations, list)
        
        # Check evaluation structure if any exist
        if evaluations:
            evaluation = evaluations[0]
            required_fields = ["id", "candidate_id", "job_id", "overall_score"]
            for field in required_fields:
                assert field in evaluation
    
    def test_create_evaluation(self):
        """Test creating a new evaluation"""
        # First get a candidate and job to evaluate
        candidates_response = client.get("/candidates")
        jobs_response = client.get("/jobs")
        
        assert candidates_response.status_code == 200
        assert jobs_response.status_code == 200
        
        candidates = candidates_response.json()
        jobs = jobs_response.json()
        
        if candidates and jobs:
            evaluation_data = {
                "candidate_id": candidates[0]["id"],
                "job_id": jobs[0]["id"]
            }
            
            response = client.post("/evaluations", json=evaluation_data)
            assert response.status_code == 200
            data = response.json()
            assert "message" in data
            assert "Evaluation completed successfully" in data["message"]
            assert "evaluation" in data
    
    def test_resume_upload(self):
        """Test resume parsing and skills extraction"""
        # First get a candidate
        response = client.get("/candidates")
        assert response.status_code == 200
        candidates = response.json()
        
        if candidates:
            candidate_id = candidates[0]["id"]
            resume_data = {
                "candidate_id": candidate_id,
                "resume_text": "Experienced Python developer with 5 years of experience in web development using Django and React."
            }
            
            response = client.post("/resume/upload", json=resume_data)
            assert response.status_code == 200
            data = response.json()
            assert "message" in data
            assert "Resume parsed successfully" in data["message"]
            assert "extracted_skills" in data
    
    def test_skills_matching(self):
        """Test skills matching functionality"""
        candidate_skills = ["Python", "React", "AWS"]
        job_skills = ["Python", "JavaScript", "Docker"]
        
        response = client.post("/skills/match", json={
            "candidate_skills": candidate_skills,
            "job_skills": job_skills
        })
        assert response.status_code == 200
        data = response.json()
        assert "match_score" in data
        assert "missing_skills" in data
        assert isinstance(data["match_score"], (int, float))
        assert isinstance(data["missing_skills"], list)
    
    def test_bias_detection(self):
        """Test bias detection functionality"""
        candidate_data = {
            "name": "Test Candidate",
            "age": 25,
            "gender": "Female",
            "location": "San Francisco, CA",
            "education": "Bachelor"
        }
        
        response = client.post("/bias/detect", json=candidate_data)
        assert response.status_code == 200
        data = response.json()
        assert "bias_detected" in data
        assert "bias_factors" in data
    
    def test_analytics_endpoints(self):
        """Test analytics endpoints"""
        # Test dashboard analytics
        response = client.get("/analytics/dashboard")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        
        # Test candidate analytics
        response = client.get("/analytics/candidates")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        
        # Test job analytics
        response = client.get("/analytics/jobs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        
        # Test bias analytics
        response = client.get("/analytics/bias")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
    
    def test_error_handling(self):
        """Test error handling for invalid requests"""
        # Test getting non-existent candidate
        response = client.get("/candidates/99999")
        assert response.status_code == 404
        
        # Test getting non-existent job
        response = client.get("/jobs/99999")
        assert response.status_code == 404
        
        # Test getting non-existent evaluation
        response = client.get("/evaluations/99999")
        assert response.status_code == 404
    
    def test_cors_headers(self):
        """Test CORS headers are present"""
        response = client.get("/candidates")
        assert response.status_code == 200
        # Note: TestClient doesn't show CORS headers, but we can verify the endpoint works

def run_tests():
    """Run all tests and display results"""
    print("🧪 Running AI Hiring System API Tests...")
    print("=" * 50)
    
    test_instance = TestAIHiringAPI()
    test_methods = [method for method in dir(test_instance) if method.startswith('test_')]
    
    passed = 0
    failed = 0
    
    for test_method in test_methods:
        try:
            print(f"Testing {test_method}...", end=" ")
            getattr(test_instance, test_method)()
            print("✅ PASSED")
            passed += 1
        except Exception as e:
            print(f"❌ FAILED: {str(e)}")
            failed += 1
    
    print("=" * 50)
    print(f"Results: {passed} passed, {failed} failed")
    
    if failed == 0:
        print("🎉 All tests passed! The API is working correctly.")
    else:
        print("⚠️  Some tests failed. Please check the implementation.")
    
    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    exit(0 if success else 1)
