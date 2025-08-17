# AI Hiring System - Backend API

## Overview
This is the FastAPI backend for the AI-Powered Hiring Evaluation System. It provides RESTful API endpoints for candidate management, job posting, AI-powered evaluations, and analytics.

## Features
- **Candidate Management**: CRUD operations for candidates with resume parsing
- **Job Management**: CRUD operations for job postings
- **AI Evaluation**: Automated candidate evaluation using multiple criteria
- **Bias Detection**: AI-powered bias detection and mitigation
- **Skills Matching**: Intelligent skills matching algorithms
- **Analytics**: Comprehensive hiring analytics and insights
- **Resume Parsing**: Extract skills and information from resumes

## Technology Stack
- **Framework**: FastAPI (Python)
- **AI/ML**: scikit-learn, NLTK, TextBlob
- **Data Processing**: NumPy, Pandas
- **Document Processing**: python-docx, PyPDF2
- **Visualization**: Matplotlib, Seaborn, Plotly
- **Server**: Uvicorn (ASGI)

## Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Server
```bash
python app.py
```

The API will be available at `http://localhost:8000`

### 3. Access API Documentation
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## API Endpoints

### Core Endpoints
- `GET /` - API information and available endpoints
- `GET /health` - Health check

### Candidates
- `GET /candidates` - Get all candidates (with filtering)
- `GET /candidates/{id}` - Get specific candidate
- `POST /candidates` - Create new candidate
- `PUT /candidates/{id}` - Update candidate
- `DELETE /candidates/{id}` - Delete candidate

### Jobs
- `GET /jobs` - Get all jobs (with filtering)
- `GET /jobs/{id}` - Get specific job
- `POST /jobs` - Create new job
- `PUT /jobs/{id}` - Update job
- `DELETE /jobs/{id}` - Delete job

### Evaluations
- `GET /evaluations` - Get all evaluations
- `GET /evaluations/{id}` - Get specific evaluation
- `POST /evaluations` - Create new evaluation

### Resume Processing
- `POST /resume/upload` - Parse resume and extract skills

### Analytics
- `GET /analytics/dashboard` - Dashboard analytics
- `GET /analytics/candidates` - Candidate analytics
- `GET /analytics/jobs` - Job analytics
- `GET /analytics/bias` - Bias detection analytics

### AI Features
- `POST /skills/match` - Skills matching
- `POST /bias/detect` - Bias detection

## Data Models

### Candidate
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@email.com",
  "experience": 5,
  "education": "Bachelor",
  "location": "San Francisco, CA",
  "skills": ["Python", "React", "AWS"],
  "status": "active",
  "last_evaluation": "2024-06-15",
  "average_score": 0.89,
  "bias_detected": false
}
```

### Job
```json
{
  "id": 1,
  "title": "Senior Python Developer",
  "company": "TechCorp",
  "department": "Engineering",
  "location": "San Francisco, CA",
  "required_skills": ["Python", "React", "AWS"],
  "experience_required": 5,
  "education_required": "Bachelor",
  "description": "We are looking for...",
  "status": "active"
}
```

### Evaluation Result
```json
{
  "id": 1,
  "candidate_id": 1,
  "job_id": 1,
  "overall_score": 0.89,
  "skills_score": 0.95,
  "experience_score": 1.0,
  "education_score": 0.8,
  "location_score": 0.9,
  "bias_penalty": 0.0,
  "bias_detected": false,
  "evaluation_date": "2024-06-15",
  "notes": "Strong candidate with excellent skills match"
}
```

## Filtering and Query Parameters

### Candidates Filtering
- `status`: Filter by candidate status
- `experience_min`: Minimum experience years
- `experience_max`: Maximum experience years
- `skills`: Comma-separated skills to filter by
- `location`: Location filter

### Jobs Filtering
- `department`: Filter by department
- `location`: Filter by location
- `experience_required`: Filter by required experience

### Evaluations Filtering
- `candidate_id`: Filter by candidate
- `job_id`: Filter by job

## AI Evaluation Process

1. **Skills Matching**: Calculate skills alignment score
2. **Experience Evaluation**: Assess experience level match
3. **Education Check**: Verify education requirements
4. **Location Analysis**: Consider location preferences
5. **Bias Detection**: Identify and mitigate potential biases
6. **Overall Scoring**: Weighted combination of all factors

## Error Handling

The API uses standard HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

All errors include detailed error messages for debugging.

## CORS Configuration

The API is configured to allow requests from:
- `http://localhost:3000` (React frontend)
- `http://127.0.0.1:3000`

## Development

### Running Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run tests
pytest
```

### Code Quality
```bash
# Install linting tools
pip install black flake8

# Format code
black .

# Check code quality
flake8 .
```

## Deployment

### Production Considerations
- Use environment variables for configuration
- Implement proper authentication and authorization
- Add rate limiting
- Use HTTPS in production
- Implement logging and monitoring
- Use a production ASGI server like Gunicorn

### Environment Variables
```bash
export API_HOST=0.0.0.0
export API_PORT=8000
export DEBUG=false
```

## Integration with Frontend

The backend is designed to work seamlessly with the React frontend:
- CORS is properly configured
- API responses match frontend expectations
- Real-time data updates
- Error handling for user feedback

## Performance

- **Async Operations**: All endpoints are async for better performance
- **Efficient Filtering**: Server-side filtering reduces data transfer
- **Caching**: Consider implementing Redis for frequently accessed data
- **Database Optimization**: Use proper indexing for large datasets

## Security

- **Input Validation**: All inputs are validated using Pydantic
- **Error Handling**: Sensitive information is not exposed in errors
- **CORS**: Properly configured for production use
- **Rate Limiting**: Consider implementing for production

## Monitoring and Logging

- **Health Checks**: `/health` endpoint for monitoring
- **Structured Logging**: Consider implementing structured logging
- **Metrics**: Consider adding Prometheus metrics
- **Tracing**: Consider implementing distributed tracing

## Future Enhancements

- **Authentication**: JWT-based authentication
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Caching**: Redis for performance optimization
- **Queue System**: Celery for background tasks
- **File Upload**: S3 integration for resume storage
- **Real-time**: WebSocket support for live updates
- **Machine Learning**: Enhanced ML models for better evaluation
- **API Versioning**: Versioned API endpoints
- **Rate Limiting**: Advanced rate limiting strategies
- **Documentation**: Enhanced API documentation with examples
