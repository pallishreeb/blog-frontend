/** @format */

import { useReducer, useEffect } from "react";
import AuthContext from "./index";
import authReducer from "./authReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import {
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    VERIFY_FAIL,
    VERIFY_SUCCESS,
} from "./constants";

const AuthState = ({ children }) => {
    const initialState = {
        user: null,
        token: null,
        isAuthenticated: null,
        isRegistered: false,
        isverified: false,
    };
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        if (state.token === null && localStorage.getItem("token")) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: JSON.parse(localStorage.getItem("token")),
            });
        }
        if (state.user === null && localStorage.getItem("user")) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: JSON.parse(localStorage.getItem("user")),
            });
        }
    }, [state]);

    const loadUser = async (token) => {
        const config = {
            headers: {
                authorization: `${token}`,
            },
        };
        try {
            const res = await axios.get(`${API_URL}/user/singleUser`, config);
            localStorage.setItem("user", JSON.stringify(res.data.response));
            dispatch({ type: LOAD_USER_SUCCESS, payload: res.data.response });
        } catch (error) {
            // console.log(error.response)
            toast(error.response.data.message);
            dispatch({ type: LOAD_USER_FAIL });
        }
    };

    const login = async (formData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(`${API_URL}/user/login`, formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.token,
            });
            localStorage.setItem("token", JSON.stringify(res.data.token));
            loadUser(res.data.token);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Try sometimes later");
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    const register = async (formData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(
                `${API_URL}/user/register`,
                formData,
                config
            );
            //  console.log(res);
            localStorage.setItem("emailToVerify", formData.email);
            dispatch({ type: REGISTER_SUCCESS });
        } catch (error) {
            console.log(error.response.data.email);
            toast.error(
                error.response?.data?.email
                    ? error.response.data.email
                    : "Try again later"
            );
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.message,
            });
        }
    };
    const verifyEmail = async (data) => {
        try {
            console.log(data);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(`${API_URL}/user/verifyEmail`, data, config);
            // console.log(res.data.message);
            toast.success(res.data.message);
            localStorage.removeItem("emailToVerify");
            dispatch({ type: VERIFY_SUCCESS });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            dispatch({ type: VERIFY_FAIL });
        }
    };
    const Update = async (data, token) => {
        try {
            console.log(data);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${token}`,
                },
            };
            const res = await axios.put(`${API_URL}/user/editDetails`, data, config);
            console.log(res.data.message);
            toast.success(res.data.message);
            loadUser(token);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const forgotPassword = async (data) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(`${API_URL}/user/sendOTP`, data, config);
            toast.success(res.data.message);
            localStorage.setItem("emailToVerify", data.email);
            dispatch({ type: VERIFY_SUCCESS });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    const resetPassword = async (data) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(
                `${API_URL}/user/updatePassword`,
                data,
                config
            );
            toast.success(res.data.message);
            localStorage.setItem("emailToVerify", data.email);
            dispatch({ type: VERIFY_SUCCESS });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    const logout = () => {
        dispatch({ type: LOGOUT });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                isRegistered: state.isRegistered,
                isverified: state.isverified,
                login,
                logout,
                loadUser,
                register,
                verifyEmail,
                Update,
                forgotPassword,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;
