// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "tasker-e731c.firebaseapp.com",
	projectId: "tasker-e731c",
	storageBucket: "tasker-e731c.appspot.com",
	messagingSenderId: "719463402678",
	appId: "1:719463402678:web:a6c25d06cc005893d22a17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);