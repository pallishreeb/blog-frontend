import React ,{useState,useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/verify.css"
import OtpCountdown from '../components/OtpCountdown'
import authContext from '../context'
const Verification = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(1);
  const { verifyEmail, isverified } = useContext(authContext)
  const handleSubmit = (e) => {
  e.preventDefault()
    const email = localStorage.getItem("emailToVerify")
    if (email && otp){
      console.log({ email, verificationCode: otp});
      verifyEmail({ email, verificationCode:parseInt(otp)})
    }
  }
  useEffect(() => {
  if(isverified){
    navigate("/login");
  }
  }, [isverified])
  
  return (
    <div style={{height:"60VH"}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 offset ">
            <div className="center mt-4">
              <form  method={"post"} onSubmit={handleSubmit}>
                <h2>Verify Your Email</h2>
                <p>
                  <h6>
                    Please enter the  OTP that was sent to your email.

                  </h6>
                </p>
              
                <div class="text_field">
                  <label>
                   Enter OTP{" "}
                  </label>
                  <input className='input' type="number" name='name' value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                <input  type="submit" value="Verify" />

                <OtpCountdown secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} />
                 
              </form>
            
            </div>
          </div>
        </div>
      </div>
    </div>

     
  )
}

export default Verification