import React from "react";
// import '../css/Header.css';


const HeaderTest = () => {
  // const _handleBurger = () => {
  //   const navBurger = document.getElementById("navBurger");
  //   const navbarMenu = document.getElementById("navbarMenu");

  //   navBurger.classList.toggle("is-active");
  //   navbarMenu.classList.toggle("is-active");

  return (
    <nav className="nav has-shadow">
      <div className="container">
        <div className="nav-left">
          <a className="nav-item">
            Snippit
          </a>
        </div>
        <label for="menu-toggle" className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <input type="checkbox" id="menu-toggle" className="is-hidden" />
        <div className="nav-right nav-menu">
          <a className="nav-item is-tab is-hidden-tablet">
            <span className="icon"><i className="fa fa-home"></i></span> Home
          </a>
          <a className="nav-item is-tab is-hidden-tablet">
            <span className="icon"><i className="fa fa-table"></i></span> Links
          </a>
          <a className="nav-item is-tab is-hidden-tablet">
            <span className="icon"><i className="fa fa-info"></i></span> About
          </a>

          <a className="nav-item is-tab is-active">
            <span className="icon"><i className="fa fa-user"></i></span>
          </a>
          <a className="nav-item is-tab">
            <span className="icon"><i className="fa fa-sign-out"></i></span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default HeaderTest;
