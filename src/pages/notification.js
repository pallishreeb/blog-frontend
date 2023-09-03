/** @format */

import React, { useEffect, useState, useContext } from "react";
import "../css/notification.css";
import {
    allNotifications,
    deleteNotication,
} from "../networkCalls/notification";
import authContext from "../context";
import { usePostApi } from "../context/PostProvider";
// import { toast } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
function Notification() {
    const navigate = useNavigate();
    const { token, loadUser } = useContext(authContext);
    const { state, dispatch } = usePostApi();
    const { notifications } = state;
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
            navigate("/login");
        }
        const loadNitification = () => {
            setLoading(true);
            allNotifications(token).then((res) => {
                setNotification(res);
                dispatch({
                    type: "FETCH_NOTIFICATIONS",
                    payload: res,
                });
                loadUser(token);
                // console.log("notifications", res)
                setLoading(false);
            });
        };
        loadNitification(token);
    }, [token]);
    const removeNotification = (token, notifcationId) => {
        deleteNotication(token, notifcationId).then((res) => {
            dispatch({
                type: "REMOVE_NOTIFICATIONS",
                payload: notifcationId,
            });
            // console.log("removed notifications", res)
        });
    };
    return (
        <div>
            {loading ? (
                "loading data ..."
            ) : (
                <section class="section-50">
                    <div class="container">
                        <h3 class="m-b-50 heading-line">
                            Notifications <i class="fa fa-bell text-muted"></i>
                        </h3>

                        <div class="notification-ui_dd-content">
                            {notifications?.length > 0 ? (
                                notification.map((n, i) => (
                                    <div
                                        class="notification-list notification-list--unread"
                                        key={i}
                                    >
                                        <div class="notification-list_content">
                                            <div class="notification-list_detail">
                                                <p>
                                                    <b>{n?.createdBy?.name}</b> replied to your comment on
                                                    post - {n?.postId?.title}
                                                </p>
                                                <p class="text-muted">{n?.replyId?.reply}</p>
                                                {/* <p class="text-muted"><small>10 mins ago</small></p> */}
                                                <button
                                                    onClick={() => removeNotification(token, n?._id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div class="notification-list_feature-img">
                                            <Link to={`/post/${n?.postId?._id}`}>
                                                <img src={n?.postId?.images[0]} alt="Feature" />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>No Notifications Found for you</h1>
                            )}
                        </div>

                        {/* <div class="text-center">
            <a href="#!" class="dark-link">Load more activity</a>
        </div> */}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Notification;
