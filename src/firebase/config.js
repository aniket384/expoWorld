// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAjhVGXE8RBC4UqAh4SallkvDic41Ue60",
  authDomain: "tradefairwala.firebaseapp.com",
  databaseURL: "https://tradefairwala-default-rtdb.firebaseio.com",
  projectId: "tradefairwala",
  storageBucket: "tradefairwala.firebasestorage.app",
  messagingSenderId: "44285431546",
  appId: "1:44285431546:web:65b6680b01dea8786c0343",
  measurementId: "G-C7722XLDZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Auth
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
