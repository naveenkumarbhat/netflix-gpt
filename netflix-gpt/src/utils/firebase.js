// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-_9HKoF3Y5PSAe2h0cbg-9gE6PusNbSs",
  authDomain: "netflixgpt-ea3d6.firebaseapp.com",
  projectId: "netflixgpt-ea3d6",
  storageBucket: "netflixgpt-ea3d6.appspot.com",
  messagingSenderId: "672805071995",
  appId: "1:672805071995:web:a4042b7712c9c3a4a7c6de",
  measurementId: "G-9QT742QYLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();