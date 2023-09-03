import React, { useEffect, useState, useContext } from "react";
import Menu from "../components/Menu";
import Slider from "../components/Slider";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import authContext from '../context'
import { AllPosts, mostViewedPost } from "../networkCalls/post";
import { getMetadata } from "../networkCalls/metadata";
// import { Link } from "react-router-dom";
import { Pagination } from 'antd';
import { usePostApi } from "../context/PostProvider";
import Card from "../components/Card";
function Home() {
  // img-fluid
  const { token } = useContext(authContext)
  const { categoryId, subcategoryId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { state, dispatch } = usePostApi()
  const { posts, isSearching, metadata } = state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [mostViewedPosts, setMostViewedPosts] = useState([])
  // const [metadatas, setMetadatas] = useState({})
  const [loading, setLoading] = useState(false);
  useEffect(() => {


    const getMeta = () => {
      setLoading(true)
      getMetadata().then((res) => {
        // console.log("fetched metadata", metadatas)
        dispatch({
          type: "FETCH_METADATA",
          payload: res.data.response[0]
        })
        setLoading(false);
      }).catch((error) => {
        console.log('Error  in fetching data', error)
      })
    }


    const getData = async () => {
      setLoading(true)
      AllPosts().then((res) => {
        dispatch({
          type: "FETCH_POSTS",
          payload: res
        })
        // console.log("res of all posts", res)
        setLoading(false)
      })

      if (categoryId) {
        dispatch({
          type: "FILTER_POSTS_BY_CATEGORY",
          payload: categoryId
        })
      } else if (subcategoryId) {
        dispatch({
          type: "FILTER_POSTS_BY_SUBCATEGORY",
          payload: subcategoryId
        })
      }
    }

    mostViewedPost().then((res) => {
      // console.log("most viewed", res.data)
      setMostViewedPosts(res.data.response)
    })
    getMeta()
    getData()

  }, [])

  //  useEffect(() => {
  // it has implemented in getData function
  //   //filter by category
  //   if(categoryId){
  //     dispatch({
  //       type: "CLEAR_FILTERS_PARTLY"
  //     })
  //     dispatch({
  //       type: "FILTER_POSTS_BY_CATEGORY",
  //       payload: categoryId
  //     })
  //   }
  // //filter by subCategory
  //    if (subcategoryId) {
  //     console.log(subcategoryId);
  //     console.log(posts);

  //     dispatch({
  //        type: "CLEAR_FILTERS_PARTLY"
  //      })
  //      dispatch({
  //        type: "FILTER_POSTS_BY_SUBCATEGORY",
  //        payload: subcategoryId
  //      })
  //    }

  //  }, [categoryId, subcategoryId])



  const Clearfilters = () => {

    dispatch({
      type: "CLEAR_FILTERS"
    })
    navigate("/")

  }

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  useEffect(() => {

  }, [])

  // Get the posts to render based on the current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const postsToRender = posts.slice(startIndex, endIndex);
  const totalPageCount = Math.ceil(posts.length / pageSize + 9);


  return (
    <>
      <Menu />
      {/* {
        isSearching || categoryId ? (<button className=" btn btn-link" onClick={() => Clearfilters()}> Go Back</button>) : ""
        } */}
      {
        location.pathname !== "/" && (<button className=" btn btn-link" onClick={() => Clearfilters()}> Go Back</button>)
      }
      <div class="container">
        {loading ? "Loading ..." :
          <div class="mainheading" id="home">
            <h1 class="sitetitle">{metadata && metadata.siteName ? metadata.siteName : 'Kroztek integrated solution'}</h1>
            <p class="lead">{metadata && metadata.description ? metadata.description : "Deals with sales and services for LT Motors VFD."}</p>
          </div>
        }
        {
          isSearching === false ? (<section class="featured-posts">
            <div class="section-title">
              <h2>
                <span>Featured</span>
              </h2>
            </div>
            <Slider mostViewedPosts={mostViewedPosts} />

          </section>) : ""
        }


        <section class="recent-posts">
          <div class="container">
            <div class="section-title">
              <h2>
                <span>All Stories</span>
              </h2>
            </div>
            {/* <Card  token={token}/> */}

            {loading ? "loading data ..." : <>

              <Card token={token} posts={postsToRender} />
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalPageCount}
                onChange={onPageChange}
              />

            </>}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
