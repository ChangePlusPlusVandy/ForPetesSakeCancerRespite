import firebase from "firebase";
import "@firebase/auth";
// import data from "../env.json"
import config from "./Config"

// Firebase configuration
const firebaseConfig = {
  apiKey: config["REACT_APP_FIREBASE_API_KEY"],
  authDomain: config["REACT_APP_FIREBASE_AUTH_DOMAIN"],
  projectId: config["REACT_APP_FIREBASE_PROJECT_ID"],
  storageBucket: config["REACT_APP_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: config["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
  appId: config["REACT_APP_FIREBASE_APP_ID"],
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
