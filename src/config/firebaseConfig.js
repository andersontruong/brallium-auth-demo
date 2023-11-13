// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBCkleUiQsrYEp10qJHZeLMXtfcvCnirnw",

  authDomain: "fir-user-demo-c2648.firebaseapp.com",

  projectId: "fir-user-demo-c2648",

  storageBucket: "fir-user-demo-c2648.appspot.com",

  messagingSenderId: "486365534347",

  appId: "1:486365534347:web:5150f08e202fa437839c8e"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);