// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAf-kKeO5z8IFIEBVlF1Dp7fc46o-Yclc",
    authDomain: "simple-chat-7d1c6.firebaseapp.com",
    projectId: "simple-chat-7d1c6",
    storageBucket: "simple-chat-7d1c6.appspot.com",
    messagingSenderId: "581607638273",
    appId: "1:581607638273:web:9929f41edaf7aebb764700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();