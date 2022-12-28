import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Logout = () => {
    const { logout } = useAuth();
    
    useEffect(() => {
        logout();
        localStorage.clear();
        window.location.href = "/";
    }, [logout]);
    
    return (
        <Text>Logging out...</Text>
    );
};

export default Logout;
