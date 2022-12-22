import firebase from "firebase";
import "@firebase/auth";
import data from "../env.json"

// Firebase configuration
const firebaseConfig = {
  apiKey: data["REACT_APP_FIREBASE_API_KEY"],
  authDomain: data["REACT_APP_FIREBASE_AUTH_DOMAIN"],
  projectId: data["REACT_APP_FIREBASE_PROJECT_ID"],
  storageBucket: data["REACT_APP_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: data["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
  appId: data["REACT_APP_FIREBASE_APP_ID"],
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
  
export default firebase;
