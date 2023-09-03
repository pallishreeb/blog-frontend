/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { removeSavedPost, savePost, savedPost } from "../networkCalls/post";
// import { usePostApi } from "../context/PostProvider";
import { htmlToText } from "html-to-text";
import imgPlaceholder from "../img/no-image.jpg";
function Card({ token, posts }) {
  const navigate = useNavigate();
  // const { state, dispatch } = usePostApi()
  // const { posts} = state
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSavedData(token);
  }, []);

  const getSavedData = async (token) => {
    setLoading(true);
    savedPost(token).then((res) => {
      setSavedPosts(res?.data?.response);
      // console.log(res.data.response);
      setLoading(false);
    });
  };
  const savePostForUser = (postId) => {
    if (!token) {
      navigate("/login");
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

  return (
    <>
      <div class="row listrecent listrelated">
        {posts.length > 0 &&
          posts.map((item, i) => (
            <div class="col-md-4 mt-4" key={i}>
              <div class="card">
                <Link to={`/post/${item?._id}`}>
                  <img
                    class="
                           img-thumb"
                    width="100%"
                    height="300px"
                    src={item.images[0] || imgPlaceholder}
                    alt=""
                  />
                </Link>

                <div class="card-block">
                  <Link
                    to={`/post/${item._id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <h2 class="card-title">{item.title}</h2>

                    <h4 class="card-text">
                      {htmlToText(item.text).split("", 20)}
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </h4>
                  </Link>

                  <div class="metafooter">
                    <div class="wrapfooter">
                      <span class="author-meta">
                        <span class="post-date">
                          {new Date(item.createdAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </span>
                      </span>
                      {loading ? (
                        "..."
                      ) : (
                        <span class="post-read-more">
                          {isSaved(item?._id) === true ? (
                            <button onClick={() => removeSavedPostId(item._id)}>
                              Remove
                            </button>
                          ) : (
                            <svg
                              class="svgIcon-use"
                              width="25"
                              height="25"
                              viewbox="0 0 25 25"
                              onClick={() => savePostForUser(item._id)}
                            >
                              <path
                                d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Card;
