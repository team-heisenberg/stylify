// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import {
  REACT_APP_DEV_FIREBASE_APP_ID,
  REACT_APP_DEV_FIREBASE_DOMAIN,
  REACT_APP_DEV_FIREBASE_BUCKET,
  REACT_APP_DEV_FIREBASE_KEY,
  REACT_APP_DEV_FIREBASE_PROJECT_ID,
  REACT_APP_DEV_FIREBASE_SENDER_ID,
  REACT_APP_PROD_FIREBASE_APP_ID,
  REACT_APP_PROD_FIREBASE_DOMAIN,
  REACT_APP_PROD_FIREBASE_BUCKET,
  REACT_APP_PROD_FIREBASE_KEY,
  REACT_APP_PROD_FIREBASE_PROJECT_ID,
  REACT_APP_PROD_FIREBASE_SENDER_ID,
} from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NODE_ENV === "development"
      ? REACT_APP_DEV_FIREBASE_KEY
      : REACT_APP_PROD_FIREBASE_KEY,
  authDomain:
    process.env.NODE_ENV === "development"
      ? REACT_APP_DEV_FIREBASE_DOMAIN
      : REACT_APP_PROD_FIREBASE_DOMAIN,
  projectId:
    process.env.NODE_ENV === "development"
      ? REACT_APP_DEV_FIREBASE_PROJECT_ID
      : REACT_APP_PROD_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NODE_ENV === "development"
      ? REACT_APP_DEV_FIREBASE_BUCKET
      : REACT_APP_PROD_FIREBASE_BUCKET,
  messagingSenderId:
    process.env.NODE_ENV === "development"
      ? REACT_APP_DEV_FIREBASE_SENDER_ID
      : REACT_APP_PROD_FIREBASE_SENDER_ID,
  appId:
    process.env.NODE_ENV === "development"
      ? REACT_APP_DEV_FIREBASE_APP_ID
      : REACT_APP_PROD_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { auth };

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { db };
