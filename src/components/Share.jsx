/** @format */

import React from "react";
import "../css/post.css";
import {
  FacebookShareButton,
  FacebookIcon,
  InstapaperIcon,
  InstapaperShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useLocation } from "react-router-dom";
import { APP_URL } from "../config";
const Share = ({ post }) => {
  let location = useLocation();
  let currentUrl = APP_URL + location.pathname;
  const iconStyle = {
    borderRadius: "50%",
  };
  return (
    <div className="share">
      <p>Share On</p>
      <div className="share-icons">
        <FacebookShareButton
          url={currentUrl}
          quote={post?.title}
          hashtag="Blog Article"
          className="share-icon"
        >
          <FacebookIcon size={32} style={iconStyle} />
        </FacebookShareButton>
        <InstapaperShareButton
          url={currentUrl}
          quote={post?.title}
          hashtag="Blog Article"
          className="share-icon"
        >
          <InstapaperIcon size={32} style={iconStyle} />
        </InstapaperShareButton>
        <TwitterShareButton
          url={currentUrl}
          quote={post?.title}
          hashtag="Blog Article"
          className="share-icon"
        >
          <TwitterIcon size={32} style={iconStyle} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={currentUrl}
          quote={post?.title}
          hashtag="Blog Article"
          className="share-icon"
        >
          <WhatsappIcon size={32} style={iconStyle} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default Share;
