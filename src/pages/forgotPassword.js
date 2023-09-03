import React, { useContext, useState, useEffect } from 'react'
import '../css/login.css'
import { useNavigate } from 'react-router-dom'
import authContext from '../context'
const Forgotpassword = () => {
const navigate = useNavigate()
const { forgotPassword,isAuthenticated } = useContext(authContext)
const [email, setEmail] = useState("")
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/')
        }
    }, [isAuthenticated])
    const handleSubmit = async (e) => {
        e.preventDefault()
        forgotPassword({ email})
        navigate('/reset-password')
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

                            <input type="submit" value="Submit" />
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

export default Forgotpassword