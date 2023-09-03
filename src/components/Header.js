import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Badge } from 'antd';
import authContext from '../context'
import { usePostApi } from '../context/PostProvider'
import logo from '../img/logo2.png'


const Header = ({ params }) => {
	const navigate = useNavigate();
	const { token, logout, user } = useContext(authContext)
	const [show, setShow] = useState(false)
	const { dispatch, metadata } = usePostApi()
	// const navigate = useNavigate()
	// const { posts } = state
	// console.log(user)
	const handleSearch = (e) => {
		if (e.target.value) {
			dispatch({
				type: "FILTER_SEARCHED_POSTS",
				payload: e.target.value,
			})
			navigate('/');

		} else {
			dispatch({ type: "CLEAR_FILTERS" })
		}

	}



	return (
		<>
			<nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation ">
				<button className="navbar-toggler navbar-toggler-right" type="button" onClick={() => setShow(!show)}>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="container">

					<a href="/" onClick={() => {
						dispatch({ type: "CLEAR_FILTERS" })
					}}>
						<img src={metadata && metadata.logo ? metadata.logo : logo} alt='logo-img' style={{ width: "70px", height: "70px", borderRadius: "50%" }} />
					</a>

					<div className={(show ? "show" : "") + "collapse navbar-collapse"} id="navbarsExampleDefault" >

						<ul className="navbar-nav ml-auto">
							<li className="nav-item active">
								<Link to="/" onClick={() => {
									dispatch({ type: "CLEAR_FILTERS" })
								}} className="nav-link">Stories</Link>
							</li>
							{token ?
								<>
									<li className="nav-item">
										<Link to="/profile" className="nav-link">My profile</Link>
									</li>
									<li className="nav-item">
										{user && user.notificationCount > 0 ?
											<Badge count={user.notificationCount}>
												<Link to="/notification" className="nav-link">Notification</Link>
											</Badge>
											:

											<Link to="/notification" className="nav-link">Notification</Link>

										}


									</li>

									<li className="nav-item" onClick={() => logout()}>

										<Link className="nav-link">Logout</Link>
									</li>
								</>

								:
								<li className="nav-item">
									<Link to="/login" className="nav-link">Login</Link>
								</li>
							}
							<li className="nav-item">
								<Link to="/contact" className="nav-link">Contact</Link>
							</li>

						</ul>

						<form className="form-inline my-2 my-lg-0">
							<input className="form-control mr-sm-2" type="text" placeholder="Search...." onChange={(e) => handleSearch(e)} />

						</form>

					</div>
				</div>
			</nav>
		</>

	)
}

export default Header;