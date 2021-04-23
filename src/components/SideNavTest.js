import {Component} from 'react';

class SideNavTest extends Component {
    render() {
      return (
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <p className="menu-label is-hidden-touch">Navigation</p>
        <ul className="menu-list">
          <li>
            <a href="#" className="">
              <span className="icon"><i className="fa fa-home"></i></span> Home
            </a>
          </li>
          <li>
            <a href="#" className="is-active">
              <span className="icon"><i className="fa fa-table"></i></span> Links
            </a>

            <ul>
              <li>
                <a href="#">
                  <span className="icon is-small"><i className="fa fa-link"></i></span> Link1
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon is-small"><i className="fa fa-link"></i></span> Link2
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="">
              <span className="icon"><i className="fa fa-info"></i></span> About
            </a>
          </li>
        </ul>
      </aside>

      );
    }
  }
  
  export default SideNavTest;