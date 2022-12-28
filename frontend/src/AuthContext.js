import { useContext, useState, useEffect, createContext } from "react";
import firebase from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUserIn, setCurrentUserIn] = useState(null);

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  function register(name, email, password) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return cred.user.updateProfile({
          displayName: name,
        });
      });
  }

  function logout() {
    return firebase.auth().signOut();
  }

  function getUser() {
    return firebase.auth().currentUser;
  }

  function forgotPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        setCurrentUserIn(user);
      }  
    });

    return () => unregisterAuthObserver();
  }, []);

  const value = {
    currentUserIn,
    login,
    register,
    logout,
    getUser,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}