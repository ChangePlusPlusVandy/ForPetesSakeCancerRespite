import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import Svg, { Path } from "react-native-svg";

const ForgotPassword = () => {
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

  return (
    <Text>Hello World</Text>
  );
};

export default ForgotPassword;