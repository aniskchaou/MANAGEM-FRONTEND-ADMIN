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


<aside
  id="left-panel"
  className="left-panel"
  style={{
    display: connected ? "block" : "none",
    background: "linear-gradient(180deg, #1565c0 0%, #43a047 100%)",
    borderRadius: 16,
    boxShadow: "0 4px 16px #e0e4ea55",
    border: "none",
    minHeight: "100vh",
    padding: "18px 0",
  }}
>
  <nav
    className="navbar navbar-expand-sm navbar-default"
    style={{ background: "transparent", boxShadow: "none" }}
  >
    <div id="main-menu" className="main-menu collapse navbar-collapse">
      <ul className="nav navbar-nav" style={{ fontSize: 16, fontWeight: 500 }}>
        {/* MAIN */}
        <li className="menu-item" style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <NavLink
            activeClassName="activeLink"
            to="/dashboard"
            style={({ isActive }) => ({
              color: isActive ? "#43a047" : "#fff",
              background: isActive ? "#e3f2fd" : "none",
              borderRadius: 8,
              padding: "8px 0px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer"
            })}
          >
            <i className="fas fa-tachometer-alt" style={{ marginRight: 8 }}></i> Dashboard
          </NavLink>
        </li>

        {/* PROJECT MANAGEMENT */}
        <li className="menu-item-has-children dropdown" style={{ marginBottom: 18 }}>
          <button type="button" className="dropdown-toggle" data-toggle="dropdown" style={{ color: "#fff", background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}><i className="fas fa-tasks" style={{ marginRight: 8 }}></i> Project Management</button>
          <ul className="sub-menu children dropdown-menu" style={{ background: "#fafdff", borderRadius: 10, boxShadow: "0 2px 8px #1976d233", marginTop: 6 }}>
            <li><NavLink to="/projects"><i className="fas fa-project-diagram" style={{ marginRight: 6 }}></i>Projects</NavLink></li>
            <li><NavLink to="/epics"><i className="fas fa-bolt" style={{ marginRight: 6 }}></i>Epics</NavLink></li>
            <li><NavLink to="/milestones"><i className="fas fa-flag-checkered" style={{ marginRight: 6 }}></i>Milestones</NavLink></li>
            <li><NavLink to="/roadmap"><i className="fas fa-road" style={{ marginRight: 6 }}></i>Roadmap</NavLink></li>
            <li><NavLink to="/backlogs"><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i>Backlogs</NavLink></li>
            <li><NavLink to="/sprints"><i className="fas fa-running" style={{ marginRight: 6 }}></i>Sprints</NavLink></li>
          </ul>
        </li>

        {/* TASK MANAGEMENT */}
        <li className="menu-item-has-children dropdown" style={{ marginBottom: 18 }}>
          <button type="button" className="dropdown-toggle" data-toggle="dropdown" style={{ color: "#fff", background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}><i className="fas fa-clipboard-list" style={{ marginRight: 8 }}></i> Task Management</button>
          <ul className="sub-menu children dropdown-menu" style={{ background: "#fafdff", borderRadius: 10, boxShadow: "0 2px 8px #1976d233", marginTop: 6 }}>
            <li><NavLink to="/tasks"><i className="fas fa-tasks" style={{ marginRight: 6 }}></i>All Tasks</NavLink></li>
            <li><NavLink to="/my-tasks"><i className="fas fa-user-check" style={{ marginRight: 6 }}></i>My Tasks</NavLink></li>
            <li><NavLink to="/sub-tasks"><i className="fas fa-stream" style={{ marginRight: 6 }}></i>SubTasks</NavLink></li>
            <li><NavLink to="/workload"><i className="fas fa-chart-bar" style={{ marginRight: 6 }}></i>Workload</NavLink></li>
            <li><NavLink to="/time-tracking"><i className="fas fa-clock" style={{ marginRight: 6 }}></i>Time Tracking</NavLink></li>
          </ul>
        </li>

        {/* TEAMS & COLLABORATION */}
        <li className="menu-item-has-children dropdown" style={{ marginBottom: 18 }}>
          <button type="button" className="dropdown-toggle" data-toggle="dropdown" style={{ color: "#fff", background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}><i className="fas fa-users" style={{ marginRight: 8 }}></i> Teams & Collaboration <span className="badge" style={{ background: "#1976d2", color: "#fff", borderRadius: 8, fontSize: 13, marginLeft: 8 }}>{users}</span></button>
          <ul className="sub-menu children dropdown-menu" style={{ background: "#fafdff", borderRadius: 10, boxShadow: "0 2px 8px #1976d233", marginTop: 6 }}>
            <li><NavLink to="/teams"><i className="fas fa-users" style={{ marginRight: 6 }}></i>Teams</NavLink></li>
            <li><NavLink to="/meetings"><i className="fas fa-handshake" style={{ marginRight: 6 }}></i>Meetings</NavLink></li>
            <li><NavLink to="/notes"><i className="fas fa-sticky-note" style={{ marginRight: 6 }}></i>Notes</NavLink></li>
            <li><NavLink to="/todos"><i className="fas fa-check-square" style={{ marginRight: 6 }}></i>ToDos</NavLink></li>
          </ul>
        </li>

        {/* FINANCE */}
        <li className="menu-item-has-children dropdown" style={{ marginBottom: 18 }}>
          <button type="button" className="dropdown-toggle" data-toggle="dropdown" style={{ color: "#fff", background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}><i className="fas fa-coins" style={{ marginRight: 8 }}></i> Finance</button>
          <ul className="sub-menu children dropdown-menu" style={{ background: "#fafdff", borderRadius: 10, boxShadow: "0 2px 8px #1976d233", marginTop: 6 }}>
            <li><NavLink to="/invoices"><i className="fas fa-file-invoice-dollar" style={{ marginRight: 6 }}></i>Invoices</NavLink></li>
            <li><NavLink to="/budget"><i className="fas fa-balance-scale" style={{ marginRight: 6 }}></i>Budgets</NavLink></li>
            <li><NavLink to="/expenses"><i className="fas fa-money-bill-wave" style={{ marginRight: 6 }}></i>Expenses</NavLink></li>
          </ul>
        </li>

        {/* RISK MANAGEMENT */}
        <li className="menu-item-has-children dropdown" style={{ marginBottom: 18 }}>
          <button type="button" className="dropdown-toggle" data-toggle="dropdown" style={{ color: "#fff", background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}><i className="fas fa-exclamation-triangle" style={{ marginRight: 8 }}></i> Risk & Change</button>
          <ul className="sub-menu children dropdown-menu" style={{ background: "#fafdff", borderRadius: 10, boxShadow: "0 2px 8px #1976d233", marginTop: 6 }}>
            <li><NavLink to="/risks"><i className="fas fa-bug" style={{ marginRight: 6 }}></i>Risks</NavLink></li>
            <li><NavLink to="/impact-assessments"><i className="fas fa-balance-scale" style={{ marginRight: 6 }}></i>Impact Assessments</NavLink></li>
          </ul>
        </li>

        {/* REWARDS */}
        <li className="menu-item-has-children dropdown" style={{ marginBottom: 18 }}>
          <button type="button" className="dropdown-toggle" data-toggle="dropdown" style={{ color: "#fff", background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}><i className="fas fa-gift" style={{ marginRight: 8 }}></i> Rewards</button>
          <ul className="sub-menu children dropdown-menu" style={{ background: "#fafdff", borderRadius: 10, boxShadow: "0 2px 8px #1976d233", marginTop: 6 }}>
            <li><NavLink to="/achievements"><i className="fas fa-medal" style={{ marginRight: 6 }}></i>Achievements</NavLink></li>
            <li><NavLink to="/reward-types"><i className="fas fa-gem" style={{ marginRight: 6 }}></i>Reward Types</NavLink></li>
            <li><NavLink to="/employee-rewards"><i className="fas fa-gift" style={{ marginRight: 6 }}></i>Employee Rewards</NavLink></li>
            <li><NavLink to="/leaderboard"><i className="fas fa-trophy" style={{ marginRight: 6 }}></i>Leaderboard</NavLink></li>
          </ul>
        </li>

        {/* DOCUMENTATION */}
        <li className="menu-item" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <NavLink
            to="/documentation"
            style={({ isActive }) => ({
              color: isActive ? "#43a047" : "#fff",
              background: isActive ? "#e3f2fd" : "none",
              borderRadius: 8,
              padding: "8px 0px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer"
            })}
          >
            <i className="fas fa-book" style={{ marginRight: 8 }}></i> Documentation
          </NavLink>
        </li>

        {/* SETTINGS */}
        <li className="menu-item" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <NavLink
            to="/configuration"
            style={({ isActive }) => ({
              color: isActive ? "#43a047" : "#fff",
              background: isActive ? "#e3f2fd" : "none",
              borderRadius: 8,
              padding: "8px 0px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer"
            })}
          >
            <i className="fas fa-cog" style={{ marginRight: 8 }}></i> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
</aside>


);


}





export default Navigation;
