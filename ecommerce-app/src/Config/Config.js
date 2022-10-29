import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'



const firebaseConfig = {
    apiKey: "AIzaSyDRNRLYTAw2SkJz5n_jr0C5up4qEe4RwmM",
    authDomain: "react-ecommerce-app-53c7a.firebaseapp.com",
    projectId: "react-ecommerce-app-53c7a",
    storageBucket: "react-ecommerce-app-53c7a.appspot.com",
    messagingSenderId: "1078451233941",
    appId: "1:1078451233941:web:d425d48b3e5952ecc5a79c",
    measurementId: "G-7HRELSVCF8"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage(); 

export{auth,fs,storage}