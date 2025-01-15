// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtBb_y9QcyWRkJPhJ67NTurS3Dyq9BO4A",
  authDomain: "vidolister-5c162.firebaseapp.com",
  projectId: "vidolister-5c162",
  storageBucket: "vidolister-5c162.firebasestorage.app",
  messagingSenderId: "297686284285",
  appId: "1:297686284285:web:e320618db0430ab22f4b94",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


