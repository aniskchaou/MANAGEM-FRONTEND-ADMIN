import React from 'react';
import Header from '../Header/Header';
import { NavLink } from "react-router-dom"
import User from '../../../modules/user/User/User';
import CurrentUser from '../../config/user';
import './Navigation.css'
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (


      <aside id="left-panel" className="left-panel" style={{ display: (CurrentUser.CONNECTED_USER ? 'block' : 'none') }}>
        <nav className="navbar navbar-expand-sm navbar-default">

          <div id="main-menu" className="main-menu collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink activeClassName="activeLink" to="/dashboard"><i className="menu-icon fa fa-laptop"></i>Dashboard </NavLink>
              </li>
              <li class="menu-item-has-children dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-folder"></i>Projects</a>
                <ul class="sub-menu children dropdown-menu">
                  <li>
                    <NavLink activeClassName="activeLink" to="/projects">List</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="activeLink" to="/calendar">Calendar </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="activeLink" to="/timeline">Gantt </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="activeLink" to="/project-kanban">Kanban </NavLink>
                  </li>
                </ul>
              </li>

              <li class="menu-item-has-children dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-list"></i>Tasks</a>
                <ul class="sub-menu children dropdown-menu">
                  <li>
                    <NavLink activeClassName="activeLink" to="/tasks">List</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="activeLink" to="/tasks">Kanban</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="activeLink" to="/tasks">Gantt</NavLink>
                  </li>
                </ul>
              </li>



              <li>
                <NavLink activeClassName="activeLink" to="/task"><i className="menu-icon fa fa-dharmachakra"></i>My Tasks <span class="badge badge-primary">2</span></NavLink>
              </li>
              <li>
                <NavLink activeClassName="activeLink" to="/note"><i className="menu-icon fa fa-clipboard-list"></i>Notes </NavLink>
              </li>
              <li>
                <NavLink activeClassName="activeLink" to="/contract"><i className="menu-icon fa fa-clipboard-list"></i>Contracts </NavLink>
              </li>

              <li>
                <NavLink activeClassName="activeLink" to="/user"><i className="menu-icon fa fa-users"></i>Collaborators </NavLink>
              </li>


              <li>
                <NavLink activeClassName="activeLink" to="/team"><i className="menu-icon fa fa-users"></i>Teams<span class="badge badge-warning">1</span></NavLink>
              </li>

              <li>
                <NavLink activeClassName="activeLink" to="/client"><i className="menu-icon fa fa-handshake-o"></i>Clients </NavLink>
              </li>






              <li class="menu-item-has-children dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-area-chart"></i>Charts</a>
                <ul class="sub-menu children dropdown-menu sub-navigatio">
                  <li>
                    <NavLink activeClassName="activeLink" to="/project-analytics">Project analytics </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="activeLink" to="/task-analytics">Task analytics </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink activeClassName="activeLink" to="/configuration"><i className="menu-icon fa fa-cog"></i>Settings </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>);

  }
}



Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
