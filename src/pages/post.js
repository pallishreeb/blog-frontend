/** @format */
import React, { useState, useEffect, useContext, useCallback } from "react";
import "../css/post.css";
import { Link, useParams, useLocation } from "react-router-dom";
import authContext from "../context";
import { singlePost, relatedPost } from "../networkCalls/post";
import { Carousel, Skeleton } from "antd";
import ListComments from "../components/ListComments";
import {
  CalendarOutlined,
  EyeOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import BlogCard from "../components/BlogCard";
import Share from "../components/Share";
import { useCommentApi } from "../context/commentProvider";
const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  height: "400px",
  textAlign: "center",
  background: "#000",
  position: "relative",
};
function Post() {
  const params = useParams();
  const { pathname } = useLocation();
  const { id } = params;
  const { token } = useContext(authContext);
  const [post, setpost] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useCommentApi();
  const { comments } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      singlePost(id).then((res) => {
        setpost(res.data.response);
        setLoading(false);
      });
    };
    const relatedData = async () => {
      setLoading(true);
      relatedPost(id).then((res) => {
        // console.log(res.data.response);
        let rPost = res.data.response.filter((element) => element._id !== id);
        setRelatedPosts(rPost);
        setLoading(false);
      });
    };
    if (id) {
      getData();
      relatedData();
    }
  }, [id]);

  //convert post description to html content
  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;
      wrapper.innerHTML = post?.text;
      const editor = document.createElement("div");
      wrapper.append(editor);
    },
    [post.text]
  );
  const scrollToComments = () => {
    const element = document.getElementById("comment-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="container">
        {/* Blog details content */}
        <div className="blog-content">
          {/* top content like date share and title */}
          <Skeleton active loading={loading} paragraph={{ rows: 2 }}>
            <div className="mainheading">

              <Share post={post} />
              <div className="post-heading">
                <span className="post-date">
                  <CalendarOutlined />{" "}
                  {new Date(post?.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
                <span className="views">
                  <EyeOutlined /> {post?.views} views
                </span>
                <span className="comments" onClick={scrollToComments}>
                  <CommentOutlined /> {comments?.length} comments
                </span>
              </div>
            </div>
          </Skeleton>
          {/* blog carousel images */}
          <Skeleton active loading={loading} paragraph={{ rows: 3 }}>
            <Carousel autoplay effect="scrollx">
              {post?.images?.length > 0 &&
                post?.images?.map((item, i) => (
                  <div style={contentStyle} key={i}>
                    <img
                      style={{
                        maxHeight: "500px",
                      }}
                      src={item}
                      alt="tn"
                      className="d-block w-100 img"
                    />
                  </div>
                ))}
            </Carousel>
          </Skeleton>
          <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
            <div className="mainheading">
              <h1 className="posttitle">{post?.title}</h1>
            </div>
          </Skeleton>
          {/* blog description */}
          <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
            <div className="article-post" ref={wrapperRef}>
              {" "}
            </div>
          </Skeleton>
          {/* ags like category and subcategory */}
          <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
            <div className="after-post-tags">
              <ul
                className="tags"
                style={{
                  display: "flex",
                  gap: "15px",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/post/category/${post?.category?._id}`}
                >
                  <li>{post?.category?.categoryName}</li>
                </Link>
                {post?.subcategory && (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/post/subcategory/${post?.subcategory?._id}`}
                  >
                    <li>{post?.subcategory?.subcategoryName}</li>
                  </Link>
                )}
              </ul>
            </div>
          </Skeleton>

          {/* List comments component */}

          <ListComments />

        </div>
        {/* Related contents */}
        <Skeleton active loading={loading} paragraph={{ rows: 3 }}>
          <div classNameName="related-content">

            <div className="container">
              <h3 className="text-center">Related Content</h3>

              {relatedPosts.length > 0 ? (
                <BlogCard posts={relatedPosts} token={token} />
              ) : (
                <p className="text-center">No Related Post Found</p>
              )}
            </div>

          </div>
        </Skeleton>
      </div>
    </>
  );
}

export default Post;
