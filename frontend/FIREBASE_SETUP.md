# 🔥 Firebase Setup Guide for AI Hiring System

## 📋 Prerequisites
- Google account
- Node.js and npm installed
- Firebase CLI (optional but recommended)

## 🚀 Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
- Visit [Firebase Console](https://console.firebase.google.com/)
- Click "Create a project" or "Add project"

### 1.2 Project Configuration
- **Project name**: `ai-hiring-system` (or your preferred name)
- **Enable Google Analytics**: Yes (recommended)
- **Analytics account**: Create new or use existing
- Click "Create project"

### 1.3 Wait for Project Creation
- Firebase will set up your project (takes 1-2 minutes)
- Click "Continue" when ready

## 🗄️ Step 2: Set Up Firestore Database

### 2.1 Create Database
- In Firebase Console, click "Firestore Database" in left sidebar
- Click "Create database"
- Choose "Start in test mode" (we'll secure it later)
- Select a location close to your users
- Click "Enable"

### 2.2 Database Structure
Your Firestore will have these collections:

```
ai-hiring-system/
├── candidates/          # Candidate profiles
├── jobs/               # Job postings
├── evaluations/        # AI evaluations
├── interviews/         # Interview scheduling
├── documents/          # Resume and file storage
├── users/              # System users
└── analytics/          # Hiring metrics
```

## 🔐 Step 3: Set Up Authentication

### 3.1 Enable Authentication
- Click "Authentication" in left sidebar
- Click "Get started"
- Click "Sign-in method" tab

### 3.2 Enable Email/Password
- Click "Email/Password"
- Toggle "Enable"
- Click "Save"

### 3.3 Enable Google Sign-in (Optional)
- Click "Google"
- Toggle "Enable"
- Add your support email
- Click "Save"

## 📁 Step 4: Set Up Storage

### 4.1 Enable Storage
- Click "Storage" in left sidebar
- Click "Get started"
- Choose "Start in test mode"
- Select location (same as Firestore)
- Click "Done"

### 4.2 Storage Rules
Update storage rules for secure file access:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## ⚙️ Step 5: Get Configuration

### 5.1 Project Settings
- Click gear icon (⚙️) next to "Project Overview"
- Click "Project settings"

### 5.2 Web App Configuration
- Scroll to "Your apps" section
- Click web icon (</>)
- Enter app nickname: `ai-hiring-system-web`
- Click "Register app"

### 5.3 Copy Config
Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## 🔧 Step 6: Update Configuration

### 6.1 Update config.js
Replace the placeholder config in `src/firebase/config.js` with your actual Firebase config.

### 6.2 Test Connection
Run your app and check browser console for Firebase connection status.

## 🛡️ Step 7: Security Rules

### 7.1 Firestore Rules
Update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to manage hiring data
    match /{collection}/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 7.2 Storage Rules
Update storage rules for secure file access:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📊 Step 8: Sample Data Structure

### 8.1 Candidates Collection
```javascript
{
  "id": "auto-generated",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": "5 years",
  "education": "Bachelor's in Computer Science",
  "location": "San Francisco, CA",
  "status": "active",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 8.2 Jobs Collection
```javascript
{
  "id": "auto-generated",
  "title": "Senior Frontend Developer",
  "company": "Tech Corp",
  "department": "Engineering",
  "location": "San Francisco, CA",
  "requiredSkills": ["JavaScript", "React", "TypeScript"],
  "experience": "5+ years",
  "education": "Bachelor's degree",
  "description": "We're looking for...",
  "status": "active",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 8.3 Evaluations Collection
```javascript
{
  "id": "auto-generated",
  "candidateId": "candidate-id",
  "jobId": "job-id",
  "score": 85,
  "status": "passed",
  "aiAnalysis": {
    "skillsMatch": 90,
    "experienceMatch": 85,
    "biasScore": 95
  },
  "feedback": "Strong technical skills...",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## 🚨 Step 9: Production Considerations

### 9.1 Security
- Update security rules before production
- Enable authentication requirements
- Implement proper user roles and permissions

### 9.2 Performance
- Use indexes for complex queries
- Implement pagination for large datasets
- Use offline persistence for better UX

### 9.3 Monitoring
- Set up Firebase Analytics
- Monitor database usage and costs
- Set up alerts for unusual activity

## 🔍 Step 10: Testing

### 10.1 Test CRUD Operations
- Create a candidate
- Update candidate information
- Delete a candidate
- Search candidates by skills

### 10.2 Test File Upload
- Upload a resume
- Download the file
- Delete the file

### 10.3 Test Authentication
- Sign up a new user
- Sign in with existing user
- Sign out

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error messages
2. Verify configuration values
3. Check browser console for detailed errors
4. Review Firebase documentation
5. Check security rules configuration

## 🎯 Next Steps

After setup:
1. Integrate Firebase services with your React components
2. Implement real-time data synchronization
3. Add offline support
4. Set up user authentication flows
5. Implement file upload functionality
6. Add real-time notifications

---

**Happy coding! 🚀**
