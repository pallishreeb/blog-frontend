import React from 'react';
import { Layout, Row, Col } from 'antd';
import { usePostApi } from '../context/PostProvider'
import { FaPhoneAlt, FaMailBulk,FaCoffee } from 'react-icons/fa'; // You can import other icons as needed

const { Footer } = Layout;

function AppFooter() {
	const { state } = usePostApi()
	const { metadata } = state
	return (
		<Footer style={{ backgroundColor: '#001529', color: '#fff'}}>
		<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
		  <Row gutter={[16, 16]} justify="center" align="middle">
		
			
			{/* Quick Links */}
			<Col xs={24} sm={24} md={8} lg={8}>
			  <h3>Quick Links</h3>
			  <ul>
				<li>
				  <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>
					About Us
				  </a>
				</li>
				<li>
				  <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>
					FAQs
				  </a>
				</li>
				<li>
				  <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>
					Terms and Conditions
				  </a>
				</li>
			  </ul>
			</Col>
			
			{/* Direct Contact */}
			<Col xs={24} sm={24} md={8} lg={7}>
			  <h3>Direct Contact</h3>
			  <p>
				<a
				  href="https://wa.me/+918144128737/?text=Hello%2C%20I%20want%20to%20chat"
				  style={{ color: '#fff', textDecoration: 'none' }}
				>
				  Chat via WhatsApp
				</a>
			  </p>
			  <p>
				<a
				  href="mailto:youremail@example.com?subject=Email%20Subject&body=Hello%2C%20I%20want%20to%20email"
				  style={{ color: '#fff', textDecoration: 'none' }}
				>
				  Email via Email
				</a>
			  </p>
			</Col>

				{/* Contact Us */}
				<Col xs={24} sm={24} md={8} lg={9}>
			  <h3>Contact Us</h3>
			  <p>
				<strong>Office Location:</strong> Your Office Address
			  </p>
			  <p>
				<strong>Call Us at:</strong>{' '}
				<a href="tel:+918144128737" style={{ color: '#fff', textDecoration: 'none' }}>
				   +1 (234) 567-890
				</a>
			  </p>
			  <p>
				<strong>Email at:</strong>{' '}
				<a href="mailto:youremail@example.com" style={{ color: '#fff', textDecoration: 'none' }}>
				  youremail@example.com
				</a>
			  </p>
			</Col>
		  </Row>
  
		  <Row justify="center">
			<Col xs={24}>
			  <p style={{ textAlign: 'center', margin: '20px 0', fontSize: '14px' }}>
				&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
			  </p>
			</Col>
		  </Row>
		</div>
	  </Footer>
	)
}

export default AppFooter