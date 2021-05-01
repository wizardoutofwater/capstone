import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../folder.svg";
import "./Header.css";

function Header({ token, setToken }) {
  const _handleBurger = () => {
    const navBurger = document.getElementById("navBurger");
    const navbarMenu = document.getElementById("navbarMenu");

    navBurger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  };

  const _logOut = () => {
    setToken("");
    localStorage.setItem("user-token", "");
  };

  return (
    <div className="Header">
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img className="mr-2" src={logo} alt="snippit logo" />
            Snippit
          </div>
          <div
            className="navbar-burger burger"
            id="navBurger"
            data-target="navbarMenu"
            onClick={_handleBurger}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarMenu" className="navbar-menu ">
          <div className="navbar-end">
            <NavLink
              to="/dashboard/add"
              className="navbar-item is-hidden-tablet"
            >
              <span className="icon">
                <i className="far fa-plus-square"></i>
              </span>
              <span>New Snippet</span>
            </NavLink>
            <NavLink
              to="dashboard/library"
              className="navbar-item is-hidden-tablet"
              href="#evScaleInfo"
            >
              <span className="icon">
                <i className="fas fa-code"></i>
              </span>
              <span>Library</span>
            </NavLink>
            {/* <a className="navbar-item is-hidden-tablet" href="#evScaleInfo">
              <span className="icon">
                <i className="fas fa-archive"></i>
              </span>
              <span>Collections</span>
            </a> */}
            <hr className="navdivider"></hr>

            {token && token !== "" ? (
              <NavLink to="/dashboard" className="navbar-item">
                <span className="icon">
                  <i className="far fa-user"></i>
                </span>
                <span>Profile</span>
              </NavLink>
            ) : (
              ""
            )}

            {token && token !== "" ? (
              <Link to="/login" className="navbar-item" onClick={_logOut}>
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span>Log Out</span>
              </Link>
            ) : (
              <Link to="/login" className="navbar-item">
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span>Log In</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
