// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRjzkzqyzA2FqTlDS6QIpcYLtLd-DUdhE",
  authDomain: "legislatethis-8ca94.firebaseapp.com",
  projectId: "legislatethis-8ca94",
  storageBucket: "legislatethis-8ca94.firebasestorage.app",
  messagingSenderId: "633877492276",
  appId: "1:633877492276:web:43cfdbf4ee4eb1ed7ad061",
  measurementId: "G-1KD73QTY12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);