import {Component} from 'react';
import './SideNav.css';

class SideNav extends Component {
    render() {
      return (
          <aside className=" SideNav column is-2">
          <nav className="menu">
            <p className="menu-label">
              General
            </p>
            <ul className="menu-list">
              <li><a className="is-active" href="#"><span className="icon is-small"><i className="fa fa-tachometer"></i></span> Dashboard</a></li>
            </ul>
            <p className="menu-label">
              Administration
            </p>
            <ul className="menu-list">
              <li><a href="/bulma-admin-dashboard-template/forms.html"><span className="icon is-small"><i className="fa fa-pencil-square-o"></i></span> Forms</a></li>
              <li><a href="/bulma-admin-dashboard-template/ui-elements.html"><span className="icon is-small"><i className="fa fa-desktop"></i></span> UI Elements</a></li>
              <li><a href="/bulma-admin-dashboard-template/tables.html"><span className="icon is-small"><i className="fa fa-table"></i></span> Tables</a></li>            
              <li><a href="/bulma-admin-dashboard-template/presentations.html"><span className="icon is-small"><i className="fa fa-bar-chart"></i></span> Presentations</a></li>
  
              <li>
                <a className=""><i className="fa fa-cog"></i> Settings</a>
                <ul>
                  <li><a>Members</a></li>
                  <li><a>Plugins</a></li>
                  <li><a>Add a member</a></li>
                </ul>
              </li>
            </ul>
            <p className="menu-label">
              Live On
            </p>
            <ul className="menu-list">
              <li><a><span className="icon is-small"><i className="fa fa-bug"></i></span> Additional Pages</a></li>
              <li><a><span className="icon is-small"><i className="fa fa-windows"></i></span> Extras</a></li>
              <li><a><span className="icon is-small"><i className="fa fa-laptop"></i></span> Landing Page</a></li>
            </ul>
          </nav>
        </aside>
      );
    }
  }
  
  export default SideNav;