import { Component } from "react";
import Avatar from './Avatar';
import "./SideNav.css";

class SideNavTest extends Component {
  render() {
    return (
      <aside className="side-nav column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
       <Avatar />
        <p className="menu-label is-hidden-touch">Navigation</p>
        <ul className="menu-list">
          <li>
            <a href="#" className="">
              <span className="icon">
                <i className="fa fa-home"></i>
              </span>{" "}
              New Snippet
            </a>
          </li>
          <li>
            <a href="#" className="">
              <span className="icon">
                <i className="fa fa-home"></i>
              </span>{" "}
              Library
            </a>
          </li>
          <li>
            <a href="#" className="is-active">
              <span className="icon">
                <i className="fa fa-table"></i>
              </span>{" "}
              Collections
            </a>

            <ul className="mt-0">
              <li>
                <a href="#">
                  <span className="icon is-small">
                    <i className="fa fa-link"></i>
                  </span>{" "}
                  CSS Tricks
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon is-small">
                    <i className="fa fa-link"></i>
                  </span>{" "}
                  React Components
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon is-small">
                    <i className="fa fa-link"></i>
                  </span>{" "}
                  JS Array Methods{" "}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="">
              <span className="icon">
                <i className="fa fa-info"></i>
              </span>{" "}
              Search
            </a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default SideNavTest;
