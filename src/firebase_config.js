import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAYXk35JaX8qASKDvyGxY3tY6YXkORTKsE",
  authDomain: "job-applications-quick.firebaseapp.com",
  projectId: "job-applications-quick",
  storageBucket: "job-applications-quick.appspot.com",
  messagingSenderId: "791558834437",
  appId: "1:791558834437:web:dcbc1cb1ecd07b4a504f6c"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };