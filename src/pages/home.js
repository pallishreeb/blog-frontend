/** @format */

import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import authContext from "../context";
import { AllPosts, mostViewedPost } from "../networkCalls/post";
import { getMetadata } from "../networkCalls/metadata";
import { Pagination, Skeleton } from "antd";
import { usePostApi } from "../context/PostProvider";
import BlogCard from "../components/BlogCard";
import { toast } from "react-toastify";
import Hero from "../components/Hero";

function Home() {
  const { token } = useContext(authContext);
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { state, dispatch } = usePostApi();
  const { posts, isSearching, metadata } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [mostViewedPosts, setMostViewedPosts] = useState([]);
  // const [metadatas, setMetadatas] = useState({})
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMeta = () => {
      setLoading(true);
      getMetadata()
        .then((res) => {
          // console.log("fetched metadata", metadatas)
          dispatch({
            type: "FETCH_METADATA",
            payload: res.data.response[0],
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error  in fetching data", error);
        });
    };
    const getData = async () => {
      setLoading(true);
      AllPosts().then((res) => {
        dispatch({
          type: "FETCH_POSTS",
          payload: res,
        });
        if (categoryId) {
          dispatch({
            type: "FILTER_POSTS_BY_CATEGORY",
            payload: categoryId
          })
        } else if (subcategoryId) {
          dispatch({
            type: "FILTER_POSTS_BY_SUBCATEGORY",
            payload: subcategoryId,
          });
        }
        setLoading(false);
      }).catch(error => {
        toast.error("We Some Issue In Fetching Posts")
        console.log(error, "error in fetching posts")
      })
    };

    mostViewedPost().then((res) => {
      setMostViewedPosts(res.data.response);
    });
    getMeta();
    getData();
  }, [categoryId, subcategoryId]);


  const Clearfilters = () => {
    console.log("clear filter called");
    dispatch({
      type: "CLEAR_FILTERS",
    });
    navigate("/");
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPageCount = Math.ceil(posts?.length / pageSize);
  // Calculate the current page's data
  const offset = (currentPage - 1) * pageSize;
  const postsToRender = posts?.slice(offset, offset + pageSize);
  // Get the posts to render based on the current page and page size

  return (
    <>
      {location.pathname !== "/" && (
        <button className=" btn btn-link" onClick={() => Clearfilters()}>
          {" "}
          Go Back
        </button>
      )}
      <div className="home-container">

        {isSearching === false && (
          <>
            <Skeleton active loading={loading}>
              <Hero />
            </Skeleton>

            <section class="featured-posts">
              <Skeleton active loading={loading}>
                <div
                  class="section-title"
                  style={{
                    margin: "auto 16px",
                  }}
                >
                  <h2>
                    <span>Most Viewed</span>
                  </h2>
                </div>
                <BlogCard token={token} posts={mostViewedPosts} postLoading={loading} />
              </Skeleton>
            </section>
          </>

        )}

        <section class="recent-posts">
          <Skeleton active loading={loading}>
            <div
              class="section-title"
              style={{
                margin: "auto 16px",
              }}
            >
              <h2 id="all-stories">
                <span>All Stories</span>
              </h2>
            </div>

            <BlogCard token={token} posts={postsToRender} postLoading={loading} />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalPageCount}
              onChange={onPageChange}
            />
          </Skeleton>


        </section>
      </div>
    </>
  );
}

export default Home;
