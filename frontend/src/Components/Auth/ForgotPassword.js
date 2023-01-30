import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Button,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useAuth } from "../../AuthContext";
import Svg, { Path } from "react-native-svg";

const { forgotPassword } = useAuth();

	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		setMessage("");
		setError("");
		e.preventDefault();
		forgotPassword(email)
			.then(() => {
				setMessage("Check your email for a reset link");
				setEmail("");
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const backToLoginPress = () => {
		history.push("/login");
	};

class ForgotPassword extends React.Component {
	render() {
		return (
			<View style={styles.headerContainer}>
				<View>
					<View>
						<Svg
							width="100%"
							viewBox="0 0 411 280"
							style={{ flex: 1, justifyContent: "flex-end" }}>
							<Path
								fill="#088da9"
								d="M102.287 -243.938C104.22 -247.286 108.501 -248.433 111.849 -246.5L607.62 39.7335C610.968 41.6665 612.116 45.9476 610.183 49.2957L434.51 353.569C432.416 357.196 426.862 354.957 427.869 350.892C453.249 248.457 364.663 153.871 260.786 172.495L164.754 189.712C70.1604 201.22 -23.5617 162.414 -82.3332 87.4061L-85.8758 82.8848C-86.0595 82.6503 -86.0823 82.3278 -85.9333 82.0698L102.287 -243.938Z"
							/>
						</Svg>
					</View>
				</View>
				<View style={styles.centerContainer}>
					<Text style={styles.loginText}>Forgot Password</Text>
					<Text style={{ color: "#5f6566" }}>Email</Text>
					<View style={styles.textInput}>
						<TextInput
							style={{ marginLeft: 10, marginTop: 12 }}
							value={email}
							onChangeText={(e) => setEmail(e)}
						/>
					</View>
					<TouchableOpacity onPress={backToLoginPress}>
						<Text style={styles.forgot_button}>Back To Login</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleSubmit} style={styles.resetbutton}>
						<Text style={{ color: "white" }}>Reset Password</Text>
					</TouchableOpacity>
					<View style={{ alignContent: "center", justifyContent: "center" }}>
						<Text style={{ color: "red" }}>{error}</Text>
						<Text style={{ color: "black" }}>{message}</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<Svg
						width="100%"
						height="60%"
						viewBox="0 0 411 149"
						style={{ flex: 1, justifyContent: "flex-end", marginBottom: 0 }}>
						<Path
							fill="#088da9"
							d="M520.047 349.5C519.769 353.356 516.418 356.256 512.562 355.978L-35.0181 316.52C-38.8741 316.243 -41.7748 312.891 -41.4969 309.035L-19.9302 9.74317C-19.6484 5.83188 -14.0912 5.36214 -13.1568 9.17063V9.17063C9.54297 101.694 116.659 144.268 196.68 92.5706L281.766 37.6008V37.6008C359.222 -6.64413 453.094 -11.45 534.663 24.6533L542.688 28.2052C542.985 28.3368 543.168 28.641 543.144 28.9653L520.047 349.5Z"
						/>
					</Svg>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	forgot_button: {
		height: 30,
		marginBottom: 30,
		marginLeft: 200,
	},
	textInput: {
		color: "#ffffff",
		borderColor: "#5f6566",
		borderWidth: 1,
		borderRadius: 15,
		marginBottom: 20,
		width: "85%",
		height: "15%",
		alignItems: "left",
		justifyContent: "left",
	},
	resetbutton: {
		backgroundColor: "#088da9",
		borderRadius: 15,
		marginTop: 10,
		marginBottom: 20,
		width: "85%",
		height: "15%",
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	headerContainer: {
		flex: 1,
	},
	headerText: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
		marginTop: 35,
	},
	footer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
	},
	centerContainer: {
		backgroundColor: "#ffffff",
		alignItems: "left",
		justifyContent: "left",
		marginLeft: 30,
	},
	loginText: {
		fontSize: 36,
		lineHeight: 43,
		color: "#088da9",
		marginBottom: 20,
		fontWeight: "bold",
		//fontFamily: "Lato",
		fontStyle: "normal",
	},
});

export default ForgotPassword;
