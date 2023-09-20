/** @format */

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addComment, getComments } from "../networkCalls/comment";
import authContext from "../context";
import { useCommentApi } from "../context/commentProvider";
import Comments from "./Comments";
import '../css/comments.css'
const ListComments = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const { token, user } = useContext(authContext);
    const { state, dispatch } = useCommentApi();
    const { comments } = state;
    const [comment, setComment] = useState("");
    const [page, setPage] = useState(1);
    const [totalComments, setTotalComments] = useState(0);
    useEffect(() => {
        getCommentsFcn(id, page);
    }, [id, page]);

    const getCommentsFcn = (id, page) => {
        if (id) {
            getComments(id, page).then((res) => {
                setTotalComments(res.data.totalComments);
                dispatch({
                    type: "FETCH_COMMENTS",
                    payload: res.data?.response,
                });
            });
        }
    };
    const postComment = async (e) => {
        e.preventDefault()
        if (!token) {
            navigate("/login");
        }
        if (comment && id) {
            await addComment({ postId: id, comment }, token);
            setComment("");
            getCommentsFcn(id, page);
        }
    };
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <div id="comment-section">
            {token ? (
                <div className="comment-input-container">
                    <form onSubmit={postComment}>
                        <textarea
                            className="comment-input"
                            placeholder="Add your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button type="submit" className="comment-submit-button">
                            Post Comment
                        </button>
                    </form>
                </div>
            ) : (
                <p>
                    {" "}
                    <Link to="/login" className="btn-link">Login to Comment </Link>
                </p>
            )}

            <hr />
            {comments?.length > 0 &&
                comments.map((item, i) => (
                    <Comments item={item} token={token} user={user} key={i} postId={id} />
                ))}

            {totalComments > comments.length && (
                <button onClick={() => handleLoadMore()} className="btn btn-success">
                    {" "}
                    Load More
                </button>
            )}
        </div>
    );
};

export default ListComments;
