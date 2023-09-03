import axios from "axios";
import { toast } from "react-toastify"
import { API_URL as url } from "../config"

export const allNotifications = async (authtoken) => {
    try {
        const res = await axios.get(
            `${url}/notification`,
            {
                headers: {
                    Authorization: authtoken,
                },
            }

        );
        return res.data.response;
    } catch (error) {
        console.log(error)
        // toast.error("Error in Fetching Notifications,try later")
        return;
    }
}

export const deleteNotication = async (authtoken, notifcationId) => {
    try {
        const res = await axios.delete(
            `${url}/notification/delete?notifcationId=${notifcationId}`,
            {
                headers: {
                    Authorization: authtoken,
                },
            }

        );
        return res.data.response;
    } catch (error) {
        console.log(error)
        toast.error("Error in Deleting notification, Try later")
        return;
    }
}