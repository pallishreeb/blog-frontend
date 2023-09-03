import React, {useState,useContext,useEffect} from 'react'
import '../css/login.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import authContext from '../context'
import OtpCountdown from '../components/OtpCountdown'
export default function Resetpassword() {
    const navigate = useNavigate()
    const { resetPassword ,isAuthenticated} = useContext(authContext)
    //email, otp, newPassword
    const [otp, setOtp] = useState(0)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [secondsLeft, setSecondsLeft] = useState(10);
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/')
        }
    }, [isAuthenticated])
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = localStorage.getItem("emailToVerify")
        if (confirmPassword === newPassword) {
            resetPassword({ email, otp: parseInt(otp), newPassword })
            setNewPassword("")
            setConfirmPassword("")
            navigate('/login')
        } else {
            toast("New Password does not match with confirm New Password")
        }
    }
  return (
      <div className="container auth">
          <div className="row justify-content-center">
              <div className="col-md-6 offset">
                  <div class="center">
                      <h1>Login</h1>
                      <form method="post" onSubmit={handleSubmit}>
                          <div class="txt_field">
                            
                              <input className='input' type="number" name='name' value={otp} onChange={(e) => setOtp(e.target.value)} required />
                              <span></span>
                              <label>
                                  Enter OTP{" "}
                              </label>
                          </div>
                              <div class="txt_field">
                                  <input type="password" name='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                  <span></span>
                                  <label> New Password</label>
                              </div>
                              <div class="txt_field">
                                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' required />
                                  <span></span>
                                  <label> Confirm New Password</label>
                              </div>

                              <input type="submit" value="Submit" />


                          <OtpCountdown secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} />
                      </form>
                  </div>
              </div>
          </div>
      </div>
  )
}
