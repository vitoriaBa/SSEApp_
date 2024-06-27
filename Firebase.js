
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1kDIeiOQevdMZph6VPbXbyy-52C8SGy0",
  authDomain: "sseapp-715cf.firebaseapp.com",
  projectId: "sseapp-715cf",
  storageBucket: "sseapp-715cf.appspot.com",
  messagingSenderId: "384311598256",
  appId: "1:384311598256:web:36771f75c6981d9505af75",
  measurementId: "G-PSSXM9HTNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore  = getFirestore(app);
export const auth = getAuth(app);