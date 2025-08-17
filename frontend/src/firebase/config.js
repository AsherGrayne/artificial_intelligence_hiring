import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration for ai-hiring-system project
const firebaseConfig = {
  apiKey: "AIzaSyA75pw_g0VkJqIgNzFd1ehbamZGCHdkcwc",
  authDomain: "ai-hiring-system.firebaseapp.com",
  projectId: "ai-hiring-system",
  storageBucket: "ai-hiring-system.firebasestorage.app",
  messagingSenderId: "212973616307",
  appId: "1:212973616307:web:d3a6b942d7a35d762a44c6",
  measurementId: "G-W2CX0GBGQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
