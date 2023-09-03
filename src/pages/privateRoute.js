// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authContext from "../context";

function PrivateRoute({ path, element }) {
    const { isAuthenticated } = useContext(authContext);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;

