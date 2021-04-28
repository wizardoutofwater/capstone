import { Component } from "react";
import Avatar from './Avatar';
import "./SideNav.css";


class SideNav extends Component {
  render() {
    return (
      <aside className="side-nav column is-3  is-fullheight section is-hidden-mobile">
       <Avatar />
        <p className="menu-label is-hidden-touch">Navigation</p>
        <ul className="menu-list">
          <li>
            <a href="#" className="">
              <span className="icon">
                <i className="far fa-plus-square"></i>
              </span>{" "}
              New Snippet
            </a>
          </li>
          <li>
            <a href="#" className="">
              <span className="icon">
                <i className="fas fa-code"></i>
              </span>{" "}
              Library
            </a>
          </li>
          <li>
            <a href="#" className="">
              <span className="icon">
                <i className="fas fa-archive"></i>
              </span>{" "}
              Collections
            </a>

            <ul className="mt-0">
              <li>
                <a href="#">
                  <span className="icon is-small">
                    <i className="far fa-folder"></i>
                  </span>{" "}
                  CSS Tricks
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon is-small">
                    <i className="far fa-folder"></i>
                  </span>{" "}
                  React Components
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon is-small">
                    <i className="far fa-folder"></i>
                  </span>{" "}
                  JS Array Methods{" "}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="">
              <span className="icon">
                <i className="fas fa-search"></i>
              </span>{" "}
              Search
            </a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default SideNav;
