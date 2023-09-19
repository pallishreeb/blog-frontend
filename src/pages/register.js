import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import authContext from '../context'

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState(null)
  const { register, isRegistered, token } = useContext(authContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("from register", { name, email, password, phoneNumber: phone });
    register({ name, email, password, phoneNumber: phone })
  }
  useEffect(() => {
    if (isRegistered === true) {
      navigate('/verify')
    }
  }, [isRegistered])

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token])
  return (
    <div className="auth-container">


      <div class="center">

        <form method="post" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div class="txt_field">
            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} required />
            <span></span>
            <label>Full Name</label>
          </div>
          <div class="txt_field">
            <input type="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <span></span>
            <label>Email</label>
          </div>
          <div class="txt_field">
            <input type="tel" name='phoneNumber' value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <span></span>
            <label>Phone Number</label>
          </div>
          <div class="txt_field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span></span>
            <label>Password</label>
          </div>

          <input type="submit" className='btn-submit' value="Register" />
          <div class="signup_link">
            Have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Register