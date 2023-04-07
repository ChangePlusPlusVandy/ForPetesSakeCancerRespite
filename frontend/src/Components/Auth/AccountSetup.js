import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Button,
	TouchableOpacity,
} from "react-native";
import { useAuth } from "../../AuthContext";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const AccountSetup = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.mainContainer}>
			<View style={styles.container}>
				<Image
					style={styles.logo}
					source={require("../../../assets/logo.png")}></Image>
				<View style={styles.welcomeContainer}>
					<Text style={styles.welcometext}>Welcome</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginbutton}>
					<Text style={{ color: "white" }}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.signupbutton}>
					<Text>Sign Up</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.footer}>
				<Svg
					width="100%"
					height="60%"
					viewBox="0 0 411 149"
					style={{ flex: 1, marginBottom: 0 }}>
					<Path
						fill="#088da9"
						d="M520.047 349.5C519.769 353.356 516.418 356.256 512.562 355.978L-35.0181 316.52C-38.8741 316.243 -41.7748 312.891 -41.4969 309.035L-19.9302 9.74317C-19.6484 5.83188 -14.0912 5.36214 -13.1568 9.17063V9.17063C9.54297 101.694 116.659 144.268 196.68 92.5706L281.766 37.6008V37.6008C359.222 -6.64413 453.094 -11.45 534.663 24.6533L542.688 28.2052C542.985 28.3368 543.168 28.641 543.144 28.9653L520.047 349.5Z"
					/>
				</Svg>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	welcomeContainer: {
		alignItems: "flex-start",
		justifyContent: "center",
	},
	loginbutton: {
		backgroundColor: "#088da9",
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 15,
		width: "75%",
		height: "5%",
		alignItems: "center",
		justifyContent: "center",
	},
	signupbutton: {
		backgroundColor: "#e4f3f6",
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 20,
		width: "75%",
		height: "5%",
		alignItems: "center",
		justifyContent: "center",
	},
	mainContainer: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
	},
	centerContainer: {
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 270,
		height: 270,
		resizeMode: "contain",
		marginBottom: 50,
	},
	welcometext: {
		fontSize: 36,
		lineHeight: 43,
		color: "#088da9",
		marginTop: 20,
		marginBottom: 15,
		//fontFamily: "Lato",
		fontStyle: "normal",
	},
	footer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
	},
});

export default AccountSetup;