import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useAuth } from "../../AuthContext";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
	const { logout } = useAuth();
	const navigation = useNavigation();

	useEffect(() => {
		logout();
		navigation.navigate("AccountSetup")
	}, [logout]);

	return <Text>Logging out...</Text>;
};

export default Logout;
