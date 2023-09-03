import React, { useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../context'
import { toast } from 'react-toastify';
import "../css/login.css"
import { Collapse } from 'antd';
const { Panel } = Collapse;
const EditProfile = () => {
    const navigate = useNavigate()
    const { user, token, isAuthenticated, loadUser,Update } = useContext(authContext)
    const [password, setPassword] = useState("")
      const [newPassword, setNewPassword] = useState("")
      const [confirmPassword, setConfirmPassword] = useState("")
      const [phoneNumber, setPhoneNumber] = useState(0)
      const updatePassword = (e) =>{
        e.preventDefault()
        if( confirmPassword === newPassword){
               Update({password,newPassword},token)
               setPassword("")
               setNewPassword("")
               setConfirmPassword("")
        }else{
            toast("New Password does not match with confirm New Password")
        }
         
                
      }
    const updatePhoneNumber = (e) =>{
        e.preventDefault()
        if(phoneNumber === user.phoneNumber){
            toast("Phone Number is not changed")
        }else{
            Update({phoneNumber},token)
            setPhoneNumber(0)
        }
    }
  return (
      <div className="authorpostbox">
          <div className="card" style={{
              color: "black",
              fontSize: "1.4rem",
              fontWeight: "650",
              border: "0",
              padding: "15px 50px"
          }}>
              <div className="card-block" >
                  <Collapse defaultActiveKey="1">
                      <Panel header="Edit Password" key="1">
                          <form method="post" onSubmit={updatePassword} >
                              <div class="txt_field">
                                  <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                  <span></span>
                                  <label> Old Password</label>
                              </div>
                              <div class="txt_field">
                                  <input type="password" name='newPassword' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required />
                                  <span></span>
                                  <label> New Password</label>
                              </div>
                              <div class="txt_field">
                                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' required />
                                  <span></span>
                                  <label> Confirm New Password</label>
                              </div>
                              <div class="pass">Forgot Password?</div>
                              <input type="submit" value="Submit" />

                          </form>
                      </Panel>
                      <Panel header="Edit Phone Number" key="2">
                          <form method="post" onSubmit={updatePhoneNumber}>
                             
                              <div class="txt_field">
                                  <input type="number" name='phoneNumber' value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} required />
                                  <span></span>
                                  <label> New Phone Number</label>
                              </div>
                            
                              <input type="submit" value="Submit" />

                          </form>
                      </Panel>
              </Collapse>
              
              
              </div>
          </div>
      </div>
  )
}

export default EditProfile