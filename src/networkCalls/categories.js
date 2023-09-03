import axios from "axios";
import { toast } from "react-toastify"
import { API_URL as url } from "../config"

export const allCategories= async () => {
    try {
        const res = await axios.get(
            `${url}/category`,

        );
        return res.data.response;
    } catch (error) {
        console.log(error)
        toast.error("Error in Fetching categories")
        return;
    }
}