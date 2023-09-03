/** @format */

import React, { useState, useEffect, useRef } from "react";
import Replies from "./Replies";
import { useCommentApi } from "../context/commentProvider";
import {
  replyOnComment,
  getRepliesOnComment,
  editComment,
  deleteComment,
} from "../networkCalls/comment";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
const { confirm } = Modal;
function Comments({ item, token, user, postId }) {
  const { state, dispatch } = useCommentApi();
  const effectRan = useRef(false);
  const { replies } = state;
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [reply, setReply] = useState("");
  const [comment, setComment] = useState("");
  const [repliesToShow, setRepliesToShow] = useState(0);
  // let available = replies.some((obj) => obj.commentId === item._id);
  useEffect(() => {
    if (effectRan.current === false) {
      getReplies();
    }
    return () => {
      effectRan.current = true;
    };
  }, [repliesToShow]);

  // item?._id, token, showReplyBox
  const postreply = () => {
    if (item?._id && token && reply !== "") {
      replyOnComment({ commentId: item._id, reply, postId }, token)
        .then((res) => {
          dispatch({
            type: "ADD_REPLY",
            payload: res.data.response,
          });
        })
        .catch((err) => {
          console.log("error in add comment", err.response.data);
        });
      setReply("");
      setShowReplyBox(false);
      //  getReplies()
    }
  };
  const getReplies = () => {
    if (item?._id) {
      getRepliesOnComment(item._id).then((res) => {
        setRepliesToShow(res.data.response.length);
        dispatch({
          type: "FETCH_REPLIES",
          payload: res.data.response,
        });
      });
    }
  };
  const deleteCommentFunc = async () => {
    if (item?._id && token) {
      await deleteComment(item._id, token);
      dispatch({
        type: "DELETE_COMMENT",
        payload: item._id,
      });
    }
  };
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      content: "Your comment will be deleted after clicked on Yes",
      okText: "yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCommentFunc();
      },
    });
  };
  const editCommentFunc = () => {
    if (item?._id && token && comment !== "") {
      editComment({ commentId: item._id, commentText: comment }, token)
        .then(() => {
          dispatch({
            type: "EDIT_COMMENT",
            payload: {
              ...item,
              comment: comment,
            },
          });
          setComment("");
          setShowEditComment(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div
      class="show-comments mt-2"
      style={{
        outline: "none",
      }}
    >
      <Modal
        open={showEditComment}
        onCancel={() => {
          setShowEditComment(false);
        }}
        okText={"Edit"}
        onOk={() => editCommentFunc()}
      >
        <div className="form-group">
          <TextArea
            className="mt-4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={"Say something..."}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </div>
      </Modal>
      <Modal
        open={showReplyBox}
        onCancel={() => {
          setShowReplyBox(false);
        }}
        okText={"Reply"}
        onOk={() => postreply()}
      >
        <div className="form-group">
          <TextArea
            className="mt-4"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={"Say something..."}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </div>
      </Modal>

      <div className="comment-text">
        <p className="">
          {item?.createdBy?.name} -{" "}
          {new Date(item?.createdAt).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="">{item?.comment}</p>
      </div>

      <button onClick={() => setShowReplyBox(!showReplyBox)}>Reply </button>
      {repliesToShow > 0 && (
        <button
          onClick={() => {
            setShowReplies(!showReplies);
          }}
        >
          {showReplies ? "Hide Replies" : "Show Replies"}
        </button>
      )}

      {user?._id === item?.createdBy._id && (
        <>
          {" "}
          <button
            onClick={() => {
              setComment(item?.comment);
              setShowEditComment(true);
            }}
          >
            <i className="fa fa-pencil fa-solid" />
          </button>
          <button onClick={() => showDeleteConfirm()}>
            <i className="fa fa-trash fa-solid" />
          </button>
        </>
      )}

      {showReplies && repliesToShow > 0 && (
        <Replies replies={replies} commentId={item._id} />
      )}
    </div>
  );
}

export default Comments;
