import React from "react";
import logo from "../folder.svg";

const Header = () => {
  const _handleBurger = () => {
    const navBurger = document.getElementById("navBurger");
    const navbarMenu = document.getElementById("navbarMenu");

    navBurger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  };
  return (
    <div>
      <nav className="navbar ">
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

        <div id="navbarMenu" className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item is-hidden-tablet" href="#theMath">
              <span className="icon">
                <i className="fas fa-info"></i>
              </span>
              <span>the Math</span>
            </a>
            <a className="navbar-item is-hidden-tablet" href="#evScaleInfo">
              <span className="icon">
                <i className="fas fa-bars"></i>
              </span>
              <span>EV Scale</span>
            </a>
            <a
              className="navbar-item"
              href="http://github.com/wizardoutofwater/react-project"
            >
              <span className="icon">
                <i className="fas fa-file-alt"></i>
              </span>
              <span>gitHub</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
