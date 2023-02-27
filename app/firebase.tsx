// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_2R9KVic3eaewBe7igvgRWTQZwGz1bkc",
  authDomain: "stylify-179be.firebaseapp.com",
  projectId: "stylify-179be",
  storageBucket: "stylify-179be.appspot.com",
  messagingSenderId: "626592737693",
  appId: "1:626592737693:web:0fcda884059351a111e774",
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
