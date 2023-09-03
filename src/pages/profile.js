/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "antd";
import ViewProfile from "../components/ViewProfile";
import EditProfile from "../components/EditProfile";
import { savedPost, removeSavedPost } from "../networkCalls/post";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authContext from "../context";
import imgPlaceholder from "../img/no-image.jpg";
import { htmlToText } from "html-to-text";

function Profile() {
  const navigate = useNavigate();
  const { token, isAuthenticated, user, loadUser } = useContext(authContext);
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      navigate("/login");
    }

    if (isAuthenticated && !user) {
      loadUser(token);
    }
  }, [token, isAuthenticated, user]);
  useEffect(() => {
    token && getData();
  }, [token]);

  const getData = async () => {
    setLoading(true);
    savedPost(token).then((res) => {
      setposts(res.data.response);
      // console.log(res.data.response);
      setLoading(false);
    });
  };

  const removeSavePost = async (savedPostId) => {
    removeSavedPost(token, savedPostId).then((res) => {
      // console.log("Remoed from saved post", res);
      getData(token);
    });
  };

  const items = [
    {
      label: "View",
      key: "1",
      children: <ViewProfile />,
    },
    {
      label: "Edit",
      key: "2",
      children: <EditProfile />,
    },
  ];
  return (
    <>
      <div className="authorpage mt-3">
        <div className="container">
          <h1 className="text-center">
            My Profile <i class="fa fa-user text-muted"></i>
          </h1>

          <Tabs defaultActiveKey="1" centered items={items} />
        </div>
      </div>
      <div class="graybg authorpage">
        <div class="container">
          <div class="listrecent listrelated">
            <h1 class="text-center">My Saved Post</h1>
            {loading ? (
              "Loading data..."
            ) : (
              <>
                {posts.length > 0 &&
                  posts.map((item) => (
                    <div class="authorpostbox" key={item._id}>
                      <div class="card">
                        <a href="author.html">
                          <img
                            class="img-fluid img-thumb"
                            width="100%"
                            height="200px"
                            src={item?.postId.images[0] || imgPlaceholder}
                            alt="saved-post-img"
                          />
                        </a>
                        <div class="card-block">
                          <h2 class="card-title">
                            <Link
                              to={`/post/${item.postId._id}`}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              {item?.postId.title}
                            </Link>
                          </h2>
                          <h4 class="card-text">
                            {htmlToText(item?.postId.text).split("", 20)}
                            This is a longer card with supporting text below as
                            a natural lead-in to additional content. This
                            content is a little bit longer.
                          </h4>
                          <div class="metafooter">
                            <div class="wrapfooter">
                              <span class="author-meta">
                                <span class="post-date">
                                  {new Date(item.createdAt).toLocaleString(
                                    "en-GB",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                    }
                                  )}
                                </span>
                              </span>
                              <span class="post-read-more">
                                <button
                                  onClick={() => removeSavePost(item._id)}
                                >
                                  Remove
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
