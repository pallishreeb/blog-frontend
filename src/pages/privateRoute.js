// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authContext from "../context";

function PrivateRoute({ path, element }) {
    const { isAuthenticated } = useContext(authContext);
    const token = JSON.parse(localStorage.getItem("token"))
    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;

