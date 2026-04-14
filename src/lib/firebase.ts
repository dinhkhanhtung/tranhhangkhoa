import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { configStore } from "./config-store";

/**
 * Dynamically initialize Firebase based on stored config.
 * This allows "cloning" and setting up via Admin UI.
 */
const getFirebaseInstance = () => {
  const settings = configStore.getSettings();
  
  // Use .env as fallback if settings are empty
  const firebaseConfig = {
    apiKey: settings.firebase.apiKey || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: settings.firebase.authDomain || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: settings.firebase.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: settings.firebase.storageBucket || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: settings.firebase.messagingSenderId || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: settings.firebase.appId || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Ensure all required fields exist before initializing
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn("Firebase config is missing. Please set up in Admin Dashboard.");
    return null;
  }

  // Initialize Firebase (Avoid re-initialization)
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return { app, db, auth, storage };
};

// Singleton pattern for client-side use
const firebase = getFirebaseInstance();

export const db = firebase?.db;
export const auth = firebase?.auth;
export const storage = firebase?.storage;
export default firebase;
