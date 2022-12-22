import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import { useAuth } from "../AuthContext";

const Home = () => {
  const [fact, setFact] = useState("");
  const { currentUser } = useAuth();

  
  useEffect(() => {
    const fetchFact = async () => {
      console.log("called");
      try {
        const token = await currentUser.getIdToken();

        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await fetch("http://localhost:3000/data", payloadHeader);
        setFact(await res.text());
      } catch (err) {
        console.log(err);
      }
    };

    fetchFact();
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <Text>Welcome {currentUser.email}!</Text>
      <Text>{fact}</Text>
      <Link to="/profile">Profile</Link>
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

Home.propTypes = {
	navigation: PropTypes.any.isRequired
};

export default Home;