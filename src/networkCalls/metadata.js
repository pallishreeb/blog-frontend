import axios from "axios";
import { toast } from "react-toastify"
import { API_URL as url } from "../config"

export const getMetadata = async () => {
    try {
        return await axios.get(
            `${url}/metadata/`,

        );
    } catch (error) {
        console.log(error)
        toast.error("Error in fetching metadata")
        return;
    }
}