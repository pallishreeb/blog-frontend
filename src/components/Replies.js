/** @format */

import React, { useState, useContext, useEffect } from "react";
import authContext from "../context";
import { useCommentApi } from "../context/commentProvider";
import {
  deleteReplyOnComment,
  editReplyOnComment,
} from "../networkCalls/comment";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
const { confirm } = Modal;
function Replies({ replies, commentId }) {
  // console.log("replies", replies);
  const { user, token } = useContext(authContext);
  const { state, dispatch } = useCommentApi();
  const [replyiesToShow, setReplyiesToShow] = useState([]);
  const [replyToEdit, SetReplyToEdit] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    setReplyiesToShow(filterReplies());
    // console.log("repliesToShow",replyiesToShow);
  }, [replies.length, showEditModal]);
  const filterReplies = () => {
    return replies.filter((item) => item.commentId === commentId);
  };

  const deleteReplyFunc = async (replyId) => {
    if (replyId && token) {
      await deleteReplyOnComment(replyId, token);
      dispatch({
        type: "DELETE_REPLY",
        payload: replyId,
      });

      // setReplyiesToShow(filterReplies())
    }
  };
  const showDeleteConfirm = (replyId) => {
    confirm({
      title: "Are you sure delete this task?",
      content: "Your comment will be deleted after clicked on Yes",
      okText: "yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteReplyFunc(replyId);
      },
    });
  };
  const editReply = () => {
    if (replyToEdit._id && token && replyToEdit.reply !== "") {
      console.log(replyToEdit);
      editReplyOnComment(
        { replyId: replyToEdit._id, replyText: replyToEdit.reply },
        token
      )
        .then((res) => {
          console.log("response of edit reply", res.data);
          dispatch({
            type: "EDIT_REPLY",
            payload: replyToEdit,
          });
          SetReplyToEdit("");
          setShowEditModal(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div class=" replies mt-2">
      {replyiesToShow.length > 0 &&
        replyiesToShow.map((item, i) => (
          <div className="single-reply" key={i}>
            <Modal
              open={showEditModal}
              onCancel={() => setShowEditModal(false)}
              okText={"Edit"}
              onOk={() => editReply()}
            >
              <div className="form-group">
                <TextArea
                  className="mt-4"
                  value={replyToEdit?.reply}
                  onChange={(e) =>
                    SetReplyToEdit({ ...replyToEdit, reply: e.target.value })
                  }
                  placeholder={"Say something..."}
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                />
              </div>
            </Modal>
            <div className="single-reply-meta">
              <p>
                {item?.createdBy?.name} -{" "}
                {new Date(item?.createdAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {user?._id === item.createdBy?._id && (
                <>
                  <button
                    onClick={() => {
                      SetReplyToEdit(item);
                      setShowEditModal(true);
                    }}
                  >
                    <i className="fa fa-pencil fa-solid" />
                  </button>
                  <button onClick={() => showDeleteConfirm(item._id)}>
                    <i className="fa fa-trash fa-solid" />
                  </button>
                </>
              )}
            </div>

            <p>{item.reply}</p>
          </div>
        ))}
    </div>
  );
}

export default Replies;
