import React from 'react'
import { usePostApi } from '../context/PostProvider'
function Footer() {
	const { state } = usePostApi()
	const { metadata } = state
	return (
		<div class="footer">
			<p class="text-center">
				Contact -:  {metadata && metadata.phoneNumber ? metadata.phoneNumber : '9999999999'}
				{"  "}
				and
				{"  "}
				{metadata && metadata.email ? metadata.email : 'youremail@email.com'}
			</p>

			<p class="text-center">
				Copyright &copy; 2023 Kroztek Integrated Solution
			</p>
			<p class="text-center">
				Blog app By<a target="_blank" href="http://www.croztek.com" rel="noreferrer">CrozTek.com</a>
			</p>
			<div class="clearfix">
			</div>
		</div>
	)
}

export default Footer