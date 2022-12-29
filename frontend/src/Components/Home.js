import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import { useAuth } from "../AuthContext";

const Home = () => {
  const [data, setData] = useState("");
  const { currentUserIn } = useAuth();

  
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

        const res = await fetch("http://localhost:3000/data", payloadHeader);
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
      <Link to="/profile">Profile</Link>
      <Link to="/logout">Logout</Link>
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