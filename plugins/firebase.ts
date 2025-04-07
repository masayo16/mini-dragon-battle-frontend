import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Firebaseアプリを初期化
export const firebaseApp = initializeApp(firebaseConfig);

// Firebase Authオブジェクトを初期化
export const auth = getAuth(firebaseApp);
