import React,{useState,useContext} from 'react'
import { Modal,Input } from 'antd'
import authContext from '../context'
import { useCommentApi } from '../context/commentProvider'
import { replyOnComment, editReplyOnComment, editComment } from "../networkCalls/comment"
const { TextArea } = Input;
const CommentModal = ({ show, setShow, name, value, id }) => {
    const { token, user } = useContext(authContext)
    const {  dispatch } = useCommentApi();
    const [text, setText] = useState(value?.comment || value?.reply || "")
// console.log(value);
    const editCommentFunc = () => {
        if (value && id && token && text !== "") {
            editComment({commentId:id,commentText:text}, token).then(() => {
                dispatch({
                    type:"EDIT_COMMENT",
                    payload:{
                        ...value,
                        reply:text
                    }
                })
                setText("")
                setShow(false)
            }).catch((err) => console.log(err))
        }
    }
    const postreply = async () => {
        if (id && token && text !== "") {
         const res =   await replyOnComment({ commentId:id, reply:text }, token)
            dispatch({
                type: "ADD_REPLY", payload: res.data.response
});
            setText("")
            setShow(false)
            
        }

    }
    const editReply = () => {
        if (value && id && token && text !== "") {
            editReplyOnComment({ replyId: id, reply: text }, token).then(() => {
                dispatch({
                    type: "EDIT_COMMENT",
                    payload: {
                        ...value,
                        comment: text
                    }
                })
                setText("")
                setShow(false)
            }).catch((err) => console.log(err))
        }
    }
    const handleSubmit = () =>{
        if(name === "Reply"){
                postreply()
        }
        else if (name === "EditComment"){
                editCommentFunc()
        } else if(name === "EditReply"){
               editReply()
        }
       
    }
  return (
      <Modal open={show} onCancel={() => {
       
        setShow(false)}}
          okText={name === "Reply" ? "Reply":"Update"}
          onOk={()=>handleSubmit()}
          
          >
          <div className="form-group">
             
              <TextArea
              className='mt-4'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={"Say something..."}
                  autoSize={{
                      minRows: 3,
                      maxRows: 5,
                  }}
              />
          </div>
          
       
      </Modal>
  )
}

export default CommentModal