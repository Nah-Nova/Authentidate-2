import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCzk6NXb6SkM6cWB-XccAu88uN4dbCMYU",
  authDomain: "authentidate-2.firebaseapp.com",
  databaseURL: "https://authentidate-2.firebaseio.com",
  projectId: "authentidate-2",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "40219467777",
  appId: "app-1-40219467777-ios-4b3999118b3fd321d62000",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };