import React, { useContext, useState, useEffect } from 'react'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom'
import authContext from '../context'
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isAuthenticated } = useContext(authContext)

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault()
    login({ email, password }).then((res) => {
      navigate('/')
    }).catch((err) => {
      navigate('/login')
    })
  }

  return (
    <div className="container auth">
      <div className="row justify-content-center">
        <div className="col-md-6 offset">
          <div class="center">
            <h1>Login</h1>
            <form method="post" onSubmit={handleSubmit}>
              <div class="txt_field">
                <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <span></span>
                <label>Email</label>
              </div>
              <div class="txt_field">
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <span></span>
                <label>Password</label>
              </div>
              <div class="pass">
                <Link to="/forgot-password"> Forgot Password? </Link> </div>
              <input type="submit" value="Login" />
              <div class="signup_link">
                Dont have an account? <a href="/register">Signup</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login