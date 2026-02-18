import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxQi0zMNxk626b5TNopOKszzLzYe6BTm4",
  authDomain: "chemistryplatform-1e349.firebaseapp.com",
  projectId: "chemistryplatform-1e349",
  storageBucket: "chemistryplatform-1e349.firebasestorage.app",
  messagingSenderId: "691564089227",
  appId: "1:691564089227:web:cca667cc8d1f5e2fe4298e",
  measurementId: "G-X1X2KWENPG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);