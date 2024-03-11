import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBcsNzMEgc6XkoKwfSDFKU-E1vwYrULRGs",
  authDomain: "lively-ai.firebaseapp.com",
  projectId: "lively-ai",
  storageBucket: "lively-ai.appspot.com",
  messagingSenderId: "498439861343",
  appId: "1:498439861343:web:978716e2a5874a686057ea",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
