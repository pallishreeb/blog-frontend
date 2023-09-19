/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Tabs, Skeleton } from "antd";
import ViewProfile from "../components/ViewProfile";
import EditProfile from "../components/EditProfile";
import { savedPost, removeSavedPost } from "../networkCalls/post";
import { useNavigate } from "react-router-dom";
import authContext from "../context";
import { htmlToText } from "html-to-text";
import imgPlaceholder from "../img/no-image.jpg";
import { HeartFilled } from "@ant-design/icons";
import nodata from "../img/no-data.png"
import "../css/profile.css"


function Profile() {
  const navigate = useNavigate();
  const { token, user, loadUser } = useContext(authContext);
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token !== null && user === null) {
      loadUser(token);
    }
  }, [token, user]);


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
  const navigateToDetails = (id) => navigate(`/post/${id}`);
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
      {/* User profile details and edit tab */}
      <div class="authorpage">
        <div className="profile-details">
          <h1 className="text-center">
            My Profile <i class="fa fa-user text-muted"></i>
          </h1>

          <Tabs defaultActiveKey="1" centered items={items} />
        </div>

        {/* Saved posts for an user */}
        <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
          <div class="saved-posts">
            <h1 class="text-center">My Saved Post</h1>
            {posts?.length > 0 ?
              <div className="custom-card-grid">

                {posts.map((post, index) => (
                  <div key={index} className="blog-card">
                    <div
                      className="card-image"
                      onClick={() => navigateToDetails(post?.postId._id)}
                    >
                      <img
                        src={post?.postId.images[0] || imgPlaceholder}
                        alt="Blog Thumbnail"
                      />
                      <h2 className="blog-title">
                        {post?.postId.title.trim().slice(0, 30)}...
                      </h2>
                    </div>
                    <div className="card-content">
                      <p
                        className="blog-details"
                        onClick={() => navigateToDetails(post?.postId._id)}
                      >
                        {htmlToText(post?.postId.text).split("", 180)}.....
                      </p>
                      <div className="card-info">
                        <span className="blog-date">
                          {" "}
                          {new Date(post?.postId.createdAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </span>
                        <HeartFilled
                          onClick={() => removeSavePost(post?._id)}
                          className="save-icon"
                          style={{ fontSize: "24px", color: "#001529" }}
                        />

                      </div>
                    </div>
                  </div>
                ))}

              </div>
              :
              <div id="no-data-img-conatiner">
                <img src={nodata} alt="No Saved Post Available" id="no-data-img" />
                <h2 className="text-center"> You Don't have Any Saved Post</h2>
              </div>

            }

          </div>
        </Skeleton>
      </div>
    </>
  );
}

export default Profile;
