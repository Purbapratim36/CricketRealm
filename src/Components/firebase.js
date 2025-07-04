import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDpOTEFmProG4nU3BECnZMx9IypImnI3Fs",
  authDomain: "cricket-realm-c2367.firebaseapp.com",
  projectId: "cricket-realm-c2367",
  storageBucket: "cricket-realm-c2367.appspot.com",
  messagingSenderId: "292464458505",
  appId: "1:292464458505:web:3a913fd47dcd5b479e31d8",
  measurementId: "G-METMX09XHS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // ✅ Firestore export
