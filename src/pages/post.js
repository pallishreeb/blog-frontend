/** @format */

import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  InstapaperIcon,
  InstapaperShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Card from "../components/Card";
import { Link, useParams, useLocation } from "react-router-dom";
import authContext from "../context";
import { singlePost, relatedPost } from "../networkCalls/post";
import { Carousel } from "antd";
import ListComments from "../components/ListComments";
import useWindowSize from "../components/useWindowSize";
const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  height: "400px",
  textAlign: "center",
  // background: '#364d79',
  background: "#000",
  position: "relative",
};
function Post() {
  const size = useWindowSize();
  let location = useLocation();
  let currentUrl = "http://www.croztek.com" + location.pathname;
  const params = useParams();
  const { id } = params;
  const { token } = useContext(authContext);
  const [post, setpost] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
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

    // console.log("post", post)
  }, [id]);
  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;
      wrapper.innerHTML = post?.text;
      const editor = document.createElement("div");
      wrapper.append(editor);
    },
    [post.text]
  );

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-2 col-xs-12">
            <div class="share">
              <p className="mt-1">Share</p>
              <ul>
                <li>
                  <FacebookShareButton
                    url={currentUrl}
                    quote={post?.title}
                    hashtag="kroztek -Motors"
                  >
                    <FacebookIcon size={32} />
                  </FacebookShareButton>
                </li>
                <li>
                  <InstapaperShareButton
                    url={currentUrl}
                    quote={post?.title}
                    hashtag="kroztek -Motors"
                  >
                    <InstapaperIcon size={32} />
                  </InstapaperShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={currentUrl}
                    quote={post?.title}
                    hashtag="kroztek -Motors"
                  >
                    <TwitterIcon size={32} />
                  </TwitterShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    url={currentUrl}
                    quote={post?.title}
                    hashtag="kroztek -Motors"
                    className="p-1"
                  >
                    <WhatsappIcon size={32} />
                  </WhatsappShareButton>
                </li>
              </ul>
              <div class="sep"></div>
            </div>
          </div>

          {loading ? (
            "Loading data..."
          ) : (
            <div class="col-md-8 col-md-offset-2 col-xs-12">
              <div class="mainheading">
                <div class="row post-top-meta">
                  <div class="col-md-10">
                    <span class="post-date">
                      {new Date(post?.createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>

                    {/* <br /> */}
                    {size.width <= 960 ? (
                      <>
                        <p>Share On</p>
                        <div class="row justify-content-center">
                          <FacebookShareButton
                            url={currentUrl}
                            quote={post?.title}
                            hashtag="kroztek -Motors"
                            className="p-1"
                          >
                            <FacebookIcon size={32} />
                          </FacebookShareButton>
                          <InstapaperShareButton
                            url={currentUrl}
                            quote={post?.title}
                            hashtag="kroztek -Motors"
                            className="p-1"
                          >
                            <InstapaperIcon size={32} />
                          </InstapaperShareButton>
                          <TwitterShareButton
                            url={currentUrl}
                            quote={post?.title}
                            hashtag="kroztek -Motors"
                            className="p-1"
                          >
                            <TwitterIcon size={32} />
                          </TwitterShareButton>
                          <WhatsappShareButton
                            url={currentUrl}
                            quote={post?.title}
                            hashtag="kroztek -Motors"
                            className="p-1"
                          >
                            <WhatsappIcon size={32} />
                          </WhatsappShareButton>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <h1 class="posttitle">{post?.title}</h1>
              </div>

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

              <div class="article-post" ref={wrapperRef}>
                {/* <blockquote>
                Gen-z strategy long tail churn rate seed money channels user
                experience incubator startup partner network low hanging fruit
                direct mailing. Client backing success startup assets responsive
                web design burn rate A/B testing metrics first mover advantage
                conversion.
              </blockquote> */}
              </div>

              <div class="after-post-tags">
                <ul
                  class="tags"
                  style={{
                    display: "flex",
                    gap: "15px",
                    cursor: "pointer",
                  }}
                >
                  <li>
                    <Link to={`/post/category/${post?.category?._id}`}>
                      {post?.category?.categoryName}
                    </Link>
                  </li>
                  {post?.subcategory && (
                    <li>
                      <Link to={`/post/subcategory/${post?.subcategory?._id}`}>
                        {post?.subcategory?.subcategoryName}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              <ListComments />
            </div>
          )}
          <div className="graybg">
            <div className="container">
              <h3 className="text-center">Related Blog Posts</h3>
              {loading ? (
                "Loading Data..."
              ) : (
                <>
                  {relatedPosts.length > 0 ? (
                    <Card posts={relatedPosts} token={token} />
                  ) : (
                    <p className="text-center">No Related Post Found</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
