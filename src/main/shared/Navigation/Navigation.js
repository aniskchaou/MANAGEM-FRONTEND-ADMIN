import React from 'react';
import Header from '../Header/Header';
import { NavLink } from "react-router-dom"
import User from '../../../modules/user/User/User';
import CurrentUser from '../../config/user';
import './Navigation.css'
import taskHHTPService from '../../services/taskHHTPService';
import userHTTPService from '../../services/userHTTPService';
import { useEffect } from 'react';
import { useState } from 'react';
const Navigation = ({ connected }) => {
  const [tasks, setTasks] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {

    getTasks()
    getUsers()
    // LoadJS()


  }, []);

  const getTasks = () => {
    taskHHTPService.getCount().then(data => {
      setTasks(data.data.all)
    })
  }

  const getUsers = () => {
    userHTTPService.getCount().then(data => {
      setUsers(data.data.all)
    })
  }


  return (


    <aside id="left-panel" className="left-panel" style={{ display: (connected ? 'block' : 'none') }}>
      <nav className="navbar navbar-expand-sm navbar-default">

        <div id="main-menu" className="main-menu collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLink activeClassName="activeLink" to="/dashboard"><i className="menu-icon fa fa-laptop"></i>Dashboard </NavLink>
            </li>
            <li className="menu-item-has-children dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-folder"></i>Projects</a>
              <ul className="sub-menu children dropdown-menu">
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

            <li className="menu-item-has-children dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-list"></i>Tasks</a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <NavLink activeClassName="activeLink" to="/tasks">List</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="activeLink" to="/task-kanban">Kanban</NavLink>
                </li>

              </ul>
            </li>



            <li>
              <NavLink activeClassName="activeLink" to="/task"><i className="menu-icon fa fa-dharmachakra"></i>My Tasks <span className="badge badge-primary">{tasks}</span></NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/note"><i className="menu-icon fa fa-clipboard-list"></i>Notes </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/contract"><i className="menu-icon fas fa-file-contract"></i> Contracts </NavLink>
            </li>

            <li>
              <NavLink activeClassName="activeLink" to="/user"><i className="menu-icon fas fa-restroom"></i>Collaborators <span className="badge badge-warning">{users}</span></NavLink>
            </li>


            <li>
              <NavLink activeClassName="activeLink" to="/team"><i className="menu-icon fas fa-users-cog"></i>Teams</NavLink>
            </li>

            <li>
              <NavLink activeClassName="activeLink" to="/client"><i className="menu-icon fa fa-handshake-o"></i>Clients </NavLink>
            </li>






            <li className="menu-item-has-children dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-area-chart"></i>Charts</a>
              <ul className="sub-menu children dropdown-menu sub-navigatio">
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





export default Navigation;
