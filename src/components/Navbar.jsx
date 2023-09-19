/** @format */

import "../css/Navbar.css";

import React, { useState, useEffect } from "react";
import {
  MenuOutlined,
  SearchOutlined,
  ReadOutlined,
  UserOutlined,
  BellOutlined,
  MailOutlined,
  LogoutOutlined,
  CloseOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge } from "antd";
import { useAuthApi } from "../context/authState";
import { usePostApi } from "../context/PostProvider";
import Menu from "./Menu";
const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout, user } = useAuthApi();
  const { dispatch, metadata } = usePostApi();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const menusNotLoggedIn = [
    {
      path: "/",
      icon: <ReadOutlined className="icon" />,
      name: "Stories",
    },
    {
      path: "/contact",
      icon: <MailOutlined className="icon" />,
      name: "Contact",
    },
  ];
  const menusLoggedIn = [
    {
      path: "/",
      icon: <ReadOutlined className="icon" />,
      name: "Stories",
    },
    {
      path: "/profile",
      icon: <UserOutlined className="icon" />,
      name: "Profile",
    },
    {
      path: "/notification",
      icon:
        user && user.notificationCount > 0 ? (
          <Badge count={user?.notificationCount}>
            <BellOutlined className="icon" />
          </Badge>
        ) : (
          <BellOutlined className="icon" />
        ),
      name: "Notification",
    },
    {
      path: "/contact",
      icon: <MailOutlined className="icon" />,
      name: "Contact",
    },
  ];
  const renderMenusInLargeScreen = () => {
    if (token) {
      return menusLoggedIn.map((item) => (
        <div className={"menu-item"}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ));
    } else {
      return menusNotLoggedIn.map((item) => (
        <div className={"menu-item"}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ));
    }
  };
  const renderMenusInSmallScreen = () => {
    if (token) {
      return menusLoggedIn.map((item) => (
        <div className={"menu-item-vertical"}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ));
    } else {
      return menusNotLoggedIn.map((item) => (
        <div className={"menu-item-vertical"}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </Link>
        </div>
      ));
    }
  };
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handleSearch = (e) => {
    if (e.target.value) {
      dispatch({
        type: "FILTER_SEARCHED_POSTS",
        payload: e.target.value,
      });
      navigate("/");
    } else {
      dispatch({ type: "CLEAR_FILTERS" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to={"/"}>
          <div className="logo">Kroztek</div>
        </Link>

        {isSmallScreen ? (
          <div className="menu-icon" onClick={toggleMenu}>
            {menuVisible ? (
              <CloseOutlined className="icon" />
            ) : (
              <MenuOutlined className="icon" />
            )}
          </div>
        ) : (
          <nav className="menu">
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                onChange={(e) => handleSearch(e)}
              />
              <SearchOutlined className="search-icon" />
            </div>

            <div className="menu-items">
              <div className="menu-item">
                <Menu />
              </div>
              {renderMenusInLargeScreen()}
              {token ? (
                <div className="menu-item" onClick={() => logout()}>
                  <LogoutOutlined className="icon" />
                  <span className="menu-text">Logout</span>
                </div>
              ) : (
                <div className="menu-item">
                  <Link
                    to={"/login"}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <LoginOutlined className="icon" />
                    <span className="menu-text">Login</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
      {menuVisible && isSmallScreen && (
        <nav className="mobile-menu">
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={(e) => handleSearch(e)}
              style={{ backgroundColor: "white" }}
            />
            <SearchOutlined className="search-icon" />
          </div>
          <div className="menu-items-vertical">
            <div className="menu-item-vertical">
              <Menu />
            </div>
            {renderMenusInSmallScreen()}
            {token ? (
              <div className="menu-item-vertical" onClick={() => logout()}>
                <LogoutOutlined className="icon" />
                <span className="menu-text">Logout</span>
              </div>
            ) : (
              <div className="menu-item-vertical">
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <LoginOutlined className="icon" />
                  <span className="menu-text">Login</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
