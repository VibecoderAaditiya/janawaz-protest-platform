// Firebase Configuration & Service Layer
// Supports both live Firebase Project (via .env) and in-memory mock fallback

import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyMockKeyForOpenSourceDemo123456",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "janawaz-platform.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "janawaz-platform",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "janawaz-platform.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Check if valid production keys are supplied
export const isLiveFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  !import.meta.env.VITE_FIREBASE_API_KEY.includes("Mock")
);

let app = null;
let auth = null;

if (isLiveFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
  } catch (error) {
    console.warn("Firebase initialization skipped, fallback to local auth store:", error);
  }
}

export { auth };
