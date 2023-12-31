/** @format */

import React from "react";
import { Layout, Row, Col } from "antd";
import { usePostApi } from "../context/PostProvider";
import {
	MailOutlined,
	PhoneOutlined,
	EnvironmentOutlined,
	MessageOutlined,
} from "@ant-design/icons";
import "../css/footer.css";
const { Footer } = Layout;

function AppFooter() {
	const { state } = usePostApi();
	const { metadata } = state;
	return (
		<Footer style={{ backgroundColor: "#001529", color: "#fff" }}>
			<div className="footer-container">
				<Row gutter={[16, 16]} justify="center" align="middle">
					{/* Quick Links */}
					{/* <Col className='links' xs={24} sm={24} md={8} lg={8}>
						<h3>Quick Links</h3>
						<ul>
							<li>

								About Us

							</li>
							<li>

								FAQs

							</li>
							<li>

								Terms and Conditions

							</li>
						</ul>
					</Col> */}

					{/* Direct Contact */}
					<Col xs={24} sm={24} md={8} lg={7}>
						<h3>Direct Contact</h3>
						<ul>
							<li>
								<a href={`https://wa.me/${metadata?.phoneNumber || "+918144128737"}/?text=Hello%2C%20I%20want%20to%20chat`}>
									<MessageOutlined /> Chat via WhatsApp
								</a>
							</li>
							<li>
								<a href={`mailto:${metadata?.email || "shreelearning.tech@gmail.com"}?subject=Email%20Subject&body=Hello%2C%20I%20want%20to%20email`}>
									<MailOutlined /> Contact Via Email
								</a>
							</li>
						</ul>
					</Col>

					{/* Contact Us */}
					<Col xs={24} sm={24} md={8} lg={9}>
						<h3>Contact Us</h3>
						<ul>
							<li>
								<strong>Office Location:</strong> <EnvironmentOutlined />{" "}
								Odisha
							</li>
							<li>
								<strong>Call Us at:</strong>{" "}
								<a href="tel:+918144128737">
									<PhoneOutlined /> +91-9999999999
								</a>
							</li>
						</ul>
					</Col>
				</Row>

				<Row justify="center">
					<Col xs={24}>
						<p
							style={{
								textAlign: "center",
								margin: "20px 0",
								fontSize: "14px",
							}}
						>
							&copy; {new Date().getFullYear()} Crosstech. All rights
							reserved.
						</p>
					</Col>
				</Row>
			</div>
		</Footer >
	);
}

export default AppFooter;
