/** @format */

import "../css/card.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeSavedPost, savePost, savedPost } from "../networkCalls/post";
import { htmlToText } from "html-to-text";
import imgPlaceholder from "../img/no-image.jpg";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

const BlogCard = ({ posts }) => {
  const navigate = useNavigate();
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    token && getSavedData(token);
  }, [token]);

  const getSavedData = async (token) => {
    setLoading(true);
    savedPost(token)
      .then((res) => {
        setSavedPosts(res?.data?.response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error in getting saved post from home page cards");
      });
  };
  const savePostForUser = (postId) => {
    if (!token) {
      toast.error("Please Login To Save Post");
    }
    if (token) {
      savePost(postId, token)
        .then((res) => {
          // console.log(res.data)
          getSavedData(token);
        })
        .catch((err) => console.log("error in save post", err));
    }
  };

  const isSaved = (postId) => {
    return !!savedPosts?.find((post) => post.postId?._id === postId)
      ? true
      : false;
  };

  const removeSavePost = async (savedPostId) => {
    removeSavedPost(token, savedPostId)
      .then((res) => {
        // console.log("Remoed from saved post", res)
        getSavedData(token);
      })
      .catch((err) => {
        console.log("error in removing saved post", err);
      });
  };
  const removeSavedPostId = (postId) => {
    //return the id from array of savedPosts which contains the postId as item.postId._id
    const savedPostId = savedPosts.findIndex(
      (item) => item.postId?._id === postId
    );
    removeSavePost(savedPosts[savedPostId]._id);
    // console.log(savedPostId);
  };
  const navigateToDetails = (id) => navigate(`/post/${id}`);
  return (
    <div className="custom-card-grid">
      {posts?.length > 0 &&
        posts.map((post, index) => (
       
            <div key={index} className="blog-card">
              <div
                className="card-image"
                onClick={() => navigateToDetails(post?._id)}
              >
                <img
                  src={post?.images[0] || imgPlaceholder}
                  alt="Blog Thumbnail"
                />
                <h2 className="blog-title">
                  {post.title.trim().slice(0, 30)}...
                </h2>
              </div>
              <div className="card-content">
                <p
                  className="blog-details"
                  onClick={() => navigateToDetails(post?._id)}
                >
                  {htmlToText(post?.text).split("", 180)}.....
                </p>
                <div className="card-info">
                  <span className="blog-date">
                    {" "}
                    {new Date(post?.createdAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>

                  {savedPosts?.length > 0 && isSaved(post?._id) === true ? (
                    <HeartFilled
                      onClick={() => removeSavedPostId(post?._id)}
                      className="save-icon"
                      style={{ fontSize: "24px", color: "#001529" }}
                    />
                  ) : (
                    <HeartOutlined
                      onClick={() => savePostForUser(post?._id)}
                      className="save-icon"
                      style={{ fontSize: "24px", color: "#001529" }}
                    />
                  )}
                </div>
              </div>
            </div>
          
        ))}
    </div>
  );
};

export default BlogCard;
