# AI Hiring System - Intelligent Candidate Evaluation & Management

[![Firebase](https://img.shields.io/badge/Firebase-Hosted-orange?logo=firebase)](https://ai-hiring-system.web.app)
[![React](https://img.shields.io/badge/React-18.0+-blue?logo=react)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.0+-blue?logo=mui)](https://mui.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-green?logo=python)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Live Demo**: [https://ai-hiring-system.web.app](https://ai-hiring-system.web.app)

A comprehensive, AI-powered hiring management system built with modern web technologies. Streamline your recruitment process with intelligent candidate evaluation, automated bias detection, and real-time analytics.

## Features

### Core Functionality
- **AI-Powered Evaluation**: Machine learning algorithms for candidate assessment
- **Bias Detection**: Automated identification of potential hiring biases
- **Skills Matching**: Intelligent matching of candidates to job requirements
- **Real-time Analytics**: Live dashboard with hiring metrics and insights

### Hiring Management
- **Candidate Management**: Complete CRUD operations for candidate profiles
- **Job Posting System**: Create and manage job openings with requirements
- **Interview Scheduling**: Automated interview coordination and management
- **Document Management**: Resume upload, storage, and AI analysis
- **Evaluation Tracking**: Comprehensive candidate evaluation history

### Technical Features
- **Real-time Database**: Firebase Firestore for live data synchronization
- **File Storage**: Firebase Storage for document management
- **Authentication**: Secure user management and role-based access
- **Responsive Design**: Mobile-first, cross-platform compatibility
- **Modern UI/UX**: Material-UI components with professional design

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Material-UI (MUI)** - Professional UI component library
- **Firebase** - Real-time database, authentication, and storage
- **Recharts** - Interactive data visualization and analytics
- **React Router** - Client-side routing and navigation

### Backend
- **FastAPI** - High-performance Python web framework
- **Python AI/ML** - scikit-learn, NLTK, NumPy, Pandas
- **AI Components** - Resume parser, skills matcher, bias detector
- **RESTful API** - Comprehensive API endpoints for all operations

### Infrastructure
- **Firebase Hosting** - Global CDN with SSL
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Storage** - Cloud file storage
- **Firebase Authentication** - User management and security

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Firebase account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-hiring-system.git
cd ai-hiring-system
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 4. Firebase Configuration
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database, Authentication, and Storage
3. Update `frontend/src/firebase/config.js` with your credentials
4. Deploy to Firebase Hosting: `firebase deploy`

## Live Demo

**Production URL**: [https://ai-hiring-system.web.app](https://ai-hiring-system.web.app)

Experience the full system with:
- Real-time candidate management
- AI-powered evaluations
- Interactive analytics dashboard
- Professional user interface

## Project Structure

```
ai-hiring-system/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── firebase/       # Firebase configuration & services
│   │   └── App.js          # Main application component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # FastAPI server
│   ├── app.py              # Main API server
│   ├── ai_components/      # AI/ML modules
│   └── requirements.txt    # Python dependencies
├── docs/                   # Documentation
└── README.md               # This file
```

## API Endpoints

### Candidates
- `GET /api/candidates` - List all candidates
- `POST /api/candidates` - Create new candidate
- `PUT /api/candidates/{id}` - Update candidate
- `DELETE /api/candidates/{id}` - Delete candidate

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job

### Evaluations
- `GET /api/evaluations` - List all evaluations
- `POST /api/evaluations` - Run new evaluation
- `GET /api/evaluations/{id}` - Get evaluation details

### Analytics
- `GET /api/analytics` - Get hiring metrics
- `GET /api/analytics/dashboard` - Dashboard data

## AI Components

### Resume Parser
- Extracts key information from resumes
- Identifies skills, experience, and education
- Supports multiple document formats

### Skills Matcher
- ML-based skills assessment
- Job-candidate compatibility scoring
- Intelligent recommendation system

### Bias Detector
- Identifies potential hiring biases
- Ensures fair evaluation process
- Provides bias analysis reports

### Candidate Evaluator
- Comprehensive candidate assessment
- Multi-factor evaluation scoring
- Performance prediction algorithms

## Features in Detail

### Dashboard Analytics
- Real-time hiring metrics
- Interactive charts and graphs
- Performance tracking
- Success rate analysis

### Candidate Management
- Profile creation and editing
- Skills assessment
- Experience tracking
- Document management

### Job Management
- Job posting creation
- Requirements specification
- Applicant tracking
- Status management

### Interview System
- Automated scheduling
- Calendar integration
- Interview feedback
- Result tracking

## Deployment

### Firebase Hosting
```bash
cd frontend
npm run build
firebase deploy
```

### Environment Variables
Create `.env` files for configuration:
```env
# Frontend
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

# Backend
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Material-UI** for the beautiful component library
- **Firebase** for the robust backend infrastructure
- **FastAPI** for the high-performance API framework
- **React** for the modern frontend framework

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-hiring-system/issues)
- **Documentation**: [Project Wiki](https://github.com/yourusername/ai-hiring-system/wiki)
- **Email**: your.email@example.com

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/ai-hiring-system&type=Date)](https://star-history.com/#yourusername/ai-hiring-system&Date)

---

<div align="center">

**Made with dedication for better hiring experiences**

[![Deploy to Firebase](https://img.shields.io/badge/Deploy%20to-Firebase-orange?logo=firebase)](https://ai-hiring-system.web.app)
[![View Demo](https://img.shields.io/badge/View-Demo-blue?logo=github)](https://ai-hiring-system.web.app)

</div>