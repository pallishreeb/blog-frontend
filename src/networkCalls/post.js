//defines all the api calls here
import axios from "axios";
import { toast } from "react-toastify"
import { API_URL as url } from "../config"



export const singlePost = async (id) => {
  try {
    return await axios.get(
      `${url}/post/singlepost?postId=${id}`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Post")
    return;
  }
}
export const AllPosts = async () => {
  try {
    const res = await axios.get(
      `${url}/post/allPost`,

    );
    // console.table(res.data.response);
    return res.data.response;
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Posts")
    return;
  }
}
export const mostViewedPost = async () => {
  try {
    return await axios.get(
      `${url}/post/most-viewed`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Most Viwed Post Posts")
  }
}


export const relatedPost = async (id) => {
  try {
    return await axios.get(
      `${url}/post/related-post?postId=${id}`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Related Post")
    return;
  }
}


// export const featuredPost = async (id, authtoken) =>
// axios.post(
//   `${url}/singlepost?id=${id}`,

//   {
//     headers: {
//       Authorization: authtoken,
//     },
//   }
// );

export const filterByCategory = async (id, authtoken) => {
  try {
    return await axios.get(
      `${url}/post/filterByCategory?categoryId=${id}`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Filter Post By Category")
    return;
  }
}

export const savePost = async (id, authtoken) => {
  try {
    const res = await axios.get(
      `${url}/post/save-post?postId=${id}`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    toast.success("Post Saved..")
    return res;
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
    return;
  }
}

export const savedPost = async (authtoken) => {
  try {
    return await axios.get(
      `${url}/post/savedpost`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
    return;
  }
}

export const removeSavedPost = async (authtoken, savedPostId) => {
  try {
    const res = await axios.delete(
      `${url}/post/remove-saved-post?savedPostId=${savedPostId}`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    toast.success("Post Removed From SavedPost")
    return res;
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
    return;
  }
}
