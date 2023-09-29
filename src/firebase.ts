// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqvRnG-d2QSE37p_3dafudVpef0Zm7NSE",
  authDomain: "shopping-list-71952.firebaseapp.com",
  projectId: "shopping-list-71952",
  storageBucket: "shopping-list-71952.appspot.com",
  messagingSenderId: "550502454892",
  appId: "1:550502454892:web:f5253754085bc5eb6a6a49"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Now, you can initialize Firestore and Authentication using the firebaseApp instance
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth, firebaseApp };
