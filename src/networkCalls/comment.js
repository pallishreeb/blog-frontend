import axios from "axios";
import { toast } from "react-toastify"
import { API_URL as url } from "../config"


export const addComment = async (data, authtoken) => {
    try {
        return await axios.post(
            `${url}/comment/add`,data,
            {
                headers: {
                    Authorization: authtoken,
                },
            }
        );
    } catch (error) {
        console.log(error)
        toast.error("Error in posting the  comment")
        return;
    }
}
export const getComments = async (id,page) => {
    try {
        return await axios.get(
            `${url}/comment/allcomments?postId=${id}&page=${page}`,
           
        );
    } catch (error) {
        console.log(error)
        toast.error("Error in fetching comments")
        return;
    }
}
export const editComment = async (data, authtoken) => {
    try {
        return await axios.put(
            `${url}/comment/edit`,data,
            {
                headers: {
                    Authorization: authtoken,
                },
            }
        );
    } catch (error) {
        console.log(error)
        toast.error("Error in editing the  comment")
        return;
    }
}
export const deleteComment = async (id, authtoken) => {
    try {
        return await axios.delete(
            `${url}/comment/delete?commentId=${id}`,
            {
                headers: {
                    Authorization: authtoken,
                },
            }
        );
    } catch (error) {
        console.log(error)
        toast.error("Error in deleting the comment")
        return;
    }
}
export const replyOnComment = async (data, authtoken) => {
    try {
        return await axios.post(
            `${url}/comment/reply`,data,
            {
                headers: {
                    Authorization: authtoken,
                },
            }
        );
    } catch (error) {
        console.log(error)
        toast.error("Error in reply on the comment")
        return;
    }
}
export const getRepliesOnComment = async (id) => {
    try {
        return await axios.get(
            `${url}/comment/replies?commentId=${id}`,
        );
    } catch (error) {
        console.log(error)
        toast.error("Error in fetching replies")
        return;
    }
}
export const editReplyOnComment = async (data, authtoken) => {
    try {
        return await axios.put(
            `${url}/comment/reply/edit`,data,
            {
                headers: {
                    Authorization: authtoken,
                },
            }
        );
    } catch (error) {
        console.log(error)
        toast.error("Error in edit  reply")
        return;
    }
}
export const deleteReplyOnComment = async (id, authtoken) => {
    try {
        return await axios.delete(
            `${url}/comment/reply/delete?replyId=${id}`,
            {
                headers: {
                    Authorization: authtoken,
                },
            }
        );
    } catch (error) {
        console.log(error)
        toast.error("Error in deleting reply")
        return;
    }
}