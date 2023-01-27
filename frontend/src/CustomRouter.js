import React from "react";
import { View } from "react-native";
import { Route, Routes, Redirect } from "react-router-native";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext"; 
//import PrivateRoute from "./Components/PrivateRoute";

// Routes
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Logout from "./Components/Auth/Logout";
import Register from "./Components/Auth/Register";
import AccountSetup from "./Components/Auth/AccountSetup";
import Profile from "./Components/Profile";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import CreatePost from "./Components/BlogPosts/CreatePost";
import Messaging from "./Components/Messaging";

const CustomRouter = () => {
  // use PrivateRoute for protected routes
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<AccountSetup />} />
        <Route exact path="/account-setup" element={<AccountSetup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/create-post" element={<CreatePost />} />
        <Route exact path="/messaging" element={<Messaging />} />
      </Routes>
    </AuthProvider>
  );
};

export default CustomRouter;
