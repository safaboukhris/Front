// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey:"AIzaSyBcoeF4yxbWrb1sKmi1lM_aBFXIQE8oifA",
    authDomain: "pepiniere-safa.firebaseapp.com",
    projectId: "pepiniere-safa",
    storageBucket: "pepiniere-safa.appspot.com",
    messagingSenderId:  "687582618392",
    appId:  "1:687582618392:web:4a33c0243839600a55b46d",
    measurementId:"G-LRMBPNZ7GN"  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);