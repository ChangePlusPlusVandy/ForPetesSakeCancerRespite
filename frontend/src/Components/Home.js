import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { useAuth } from "../AuthContext";
import CONFIG from "../Config"
import { useNavigation, Link } from "@react-navigation/native";

const Home = () => {
	const [data, setData] = useState("");
	const { currentUserIn } = useAuth();

	const navigation = useNavigation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await currentUserIn.getIdToken();

				const payloadHeader = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				};

				const res = await fetch(CONFIG.URL + "/data", payloadHeader);
				setData(await res.text());
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [currentUserIn]);

	return (
		<View style={styles.container}>
		<Text>Welcome {currentUserIn.email}!</Text>
		<Text>{data}</Text>
		<Link to={{screen: "Profile"}}>Profile</Link>
		<Link to={{screen: "Logout"}}>Logout</Link>
		<Link to={{screen: "CreatePost"}}>Create Post</Link>
		<Link to={{screen: "Messaging"}}>Messaging</Link>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Home;
