# 🤖 AI-Powered Hiring Evaluation System

A comprehensive AI-driven hiring platform that uses machine learning to evaluate candidates, detect biases, and provide data-driven hiring insights.

## 🚀 Features

### Core AI Capabilities
- **Resume Parsing**: Extract skills and information from resumes using NLP
- **Skills Matching**: Intelligent algorithm for matching candidate skills with job requirements
- **Bias Detection**: AI-powered detection of potential hiring biases (gender, age, location, education)
- **Candidate Evaluation**: Comprehensive scoring based on multiple criteria
- **Hiring Analytics**: Generate insights and strategic recommendations

### System Features
- **Professional Dashboard**: Real-time metrics, charts, and insights
- **Candidate Management**: Full CRUD operations with advanced filtering
- **Job Posting Management**: Create and manage job requirements
- **Evaluation Engine**: Automated AI-powered candidate assessment
- **Bias Monitoring**: Track and mitigate hiring biases
- **Performance Analytics**: Comprehensive reporting and insights

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  FastAPI Backend│    │  AI Core System │
│                 │    │                 │    │                 │
│ • Dashboard     │◄──►│ • REST API      │◄──►│ • Resume Parser │
│ • Candidates    │    │ • CORS Enabled  │    │ • Skills Matcher│
│ • Jobs          │    │ • Async Endpoints│   │ • Bias Detector │
│ • Evaluations   │    │ • Pydantic Models│   │ • Evaluator     │
│ • Analytics     │    │ • Error Handling│   │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Material-UI (MUI)** - Professional component library
- **React Router** - Navigation and routing
- **Recharts** - Data visualization
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - High-performance Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation and serialization
- **CORS** - Cross-origin resource sharing

### AI/ML
- **scikit-learn** - Machine learning algorithms
- **NLTK** - Natural language processing
- **TextBlob** - Text processing and analysis
- **NumPy & Pandas** - Data manipulation and analysis

## 📁 Project Structure

```
Artificial_Intellinnn_Hiring_Challenge/
├── ai_hiring_system.py          # Core AI system
├── test_system.py               # AI system tests
├── requirements.txt             # Python dependencies
├── README.md                   # This file
├── frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── App.js             # Main app component
│   │   └── index.js           # Entry point
│   ├── package.json           # Frontend dependencies
│   └── README.md              # Frontend documentation
└── backend/                    # FastAPI backend
    ├── app.py                 # Main API application
    ├── requirements.txt       # Backend dependencies
    ├── start_server.py       # Server startup script
    ├── test_api.py           # API tests
    └── README.md             # Backend documentation
```

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Git** for cloning the repository

### 1. Clone and Setup
```bash
git clone <repository-url>
cd Artificial_Intellinnn_Hiring_Challenge
```

### 2. Backend Setup
```bash
# Install Python dependencies
cd backend
pip install -r requirements.txt

# Start the backend server
python start_server.py
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup
```bash
# In a new terminal, install frontend dependencies
cd frontend
npm install

# Start the React development server
npm start
```

The frontend will be available at `http://localhost:3000`

### 4. Access the System
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📖 API Documentation

### Core Endpoints
- `GET /` - API information
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
- `POST /evaluations` - Create new evaluation

### AI Features
- `POST /resume/upload` - Parse resume and extract skills
- `POST /skills/match` - Skills matching
- `POST /bias/detect` - Bias detection

### Analytics
- `GET /analytics/dashboard` - Dashboard analytics
- `GET /analytics/candidates` - Candidate analytics
- `GET /analytics/jobs` - Job analytics
- `GET /analytics/bias` - Bias analytics

## 🧪 Testing

### Backend Testing
```bash
cd backend
python test_api.py
```

### Frontend Testing
```bash
cd frontend
npm test
```

### AI System Testing
```bash
python test_system.py
```

## 🔧 Development

### Backend Development
```bash
cd backend
# Start with auto-reload for development
python start_server.py --reload --debug
```

### Frontend Development
```bash
cd frontend
# Start with hot reload
npm start
```

### Code Quality
```bash
# Backend
cd backend
pip install black flake8
black .
flake8 .

# Frontend
cd frontend
npm run lint
```

## 📊 Sample Data

The system comes with pre-loaded sample data:
- **Candidates**: 4 sample candidates with different skill sets
- **Jobs**: 2 sample job postings
- **Evaluations**: Sample evaluation results

## 🎯 Use Cases

### For HR Professionals
- **Streamlined Hiring**: Automated candidate evaluation
- **Bias Reduction**: AI-powered bias detection and mitigation
- **Data-Driven Decisions**: Comprehensive analytics and insights
- **Skills Matching**: Intelligent candidate-job matching

### For Hiring Managers
- **Efficient Screening**: Quick candidate assessment
- **Objective Evaluation**: Consistent evaluation criteria
- **Performance Insights**: Track hiring effectiveness
- **Strategic Planning**: Data-driven hiring strategies

### For Organizations
- **Compliance**: Bias detection and mitigation
- **Efficiency**: Reduced time-to-hire
- **Quality**: Better candidate-job matches
- **Analytics**: Hiring performance insights

## 🔒 Security Features

- **Input Validation**: All inputs validated using Pydantic
- **Error Handling**: Secure error messages without data leakage
- **CORS Configuration**: Properly configured for production use
- **Data Sanitization**: Clean and safe data processing

## 🚀 Deployment

### Production Considerations
- **Environment Variables**: Configure for production settings
- **Authentication**: Implement JWT-based authentication
- **Rate Limiting**: Add API rate limiting
- **HTTPS**: Use SSL/TLS in production
- **Monitoring**: Implement logging and monitoring
- **Database**: Use production database (PostgreSQL recommended)

### Docker Support
```bash
# Build and run with Docker (future enhancement)
docker build -t ai-hiring-system .
docker run -p 8000:8000 ai-hiring-system
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **FastAPI** team for the excellent web framework
- **Material-UI** team for the beautiful component library
- **scikit-learn** team for the machine learning tools
- **NLTK** team for natural language processing capabilities

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the repository
- Contact the development team
- Check the documentation at `/docs` endpoint

---

**🎉 Welcome to the AI-Powered Hiring Revolution! 🎉**

Transform your hiring process with intelligent automation, bias detection, and data-driven insights.
#   a r t i f i c i a l _ i n t e l l i g e n c e _ h i r i n g  
 