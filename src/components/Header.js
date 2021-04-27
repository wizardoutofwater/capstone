import React from "react";
import logo from "../folder.svg";
import './Header.css';

const Header = () => {
  const _handleBurger = () => {
    const navBurger = document.getElementById("navBurger");
    const navbarMenu = document.getElementById("navbarMenu");

    navBurger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  };
  return (
    <div >
      <nav className="navbar" >
        <div className="navbar-brand">
          <div className="navbar-item" href="#">
            <img
              className="mr-2"
              src={logo}
              alt="snippit logo"
            />
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
            <a className="navbar-item is-hidden-tablet" href="#theMath">
              <span className="icon">
                <i className="far fa-plus-square"></i>
              </span>
              <span>New Snippet</span>
            </a>
            <a className="navbar-item is-hidden-tablet" href="#evScaleInfo">
              <span className="icon">
                <i className="fas fa-code"></i>
              </span>
              <span>Library</span>
            </a>
            <a className="navbar-item is-hidden-tablet" href="#evScaleInfo">
              <span className="icon">
                <i className="fas fa-archive"></i>
              </span>
              <span>Collections</span>
            </a>
        <hr className="navdivider"></hr>
            <a
              className="navbar-item"
              href="http://github.com/wizardoutofwater/react-project"
            >
              <span className="icon">
                <i className="far fa-user"></i>
              </span>
              <span>Profile</span>
            </a>
            <a
              className="navbar-item"
              href="http://github.com/wizardoutofwater/react-project"
            >
              <span className="icon">
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span>Log Out</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
