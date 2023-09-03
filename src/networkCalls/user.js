import axios from "axios";
import { API_URL as url } from "../config"


export const _register = async (data) =>
    axios.post(`${url}/user/register`, {data});
export const _login = async (data) =>
    axios.post(`${url}/user/login`, {data});
export const _forgotPassword = async (data) =>
    axios.post(`${url}/user/sendOTP`, { data });
