import { useContext, useState, useEffect, createContext } from "react";
import firebase from "./firebase";
import config from "./Config";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUserIn, setCurrentUserIn] = useState(null);

	async function login(email, password) {
		const userData = await firebase.auth().signInWithEmailAndPassword(email, password);

		//sync data to mongoDB
		if (userData.user) {
			var url = config["URL"] + "/api/users/login";
			var headers = await getAuthHeader();
			headers["Content-Type"] = "application/json";
			const requestOptions = {
				method: "POST",
				headers,
			};
			await fetch(url, requestOptions);
		}

		return userData;
	}

	async function getAuthHeader()
	{
		const token = await getToken();
		return { Authorization: `Bearer ${token}`, };
	}

	async function register(name, email, password) {
		const userData = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((cred) => {
				return cred.user.updateProfile({
					displayName: name,
				});
			});

		//add user data to mongoDB
		var url = config["URL"] + "/api/users/signup";
		var headers = await getAuthHeader();
		headers["Content-Type"] = "application/json";

		const requestOptions = {
			method: "POST",
			headers,
		};

		await fetch(url, requestOptions);

		return userData;
	}

	async function getToken()
	{
		let currUser = getUser();

		if (currUser == null)
		{
			throw new Error("User is not logged in");
		}

		const token = currUser.getIdToken();
		return token;
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
		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged(function (user) {
				if (user) {
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

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
