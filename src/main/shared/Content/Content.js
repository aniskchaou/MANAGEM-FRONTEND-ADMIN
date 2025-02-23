import React from 'react';
import { Routes, Route } from "react-router-dom";
import './Content.css';
import DashBoard from '../../../modules/shared/DashBoard/DashBoard';
import Message from '../../../modules/message/Message/Message';
import Note from '../../../modules/note/Note/Note';
import Task from '../../../modules/mytask/Task/Task';
import Projects from '../../../modules/project/Projects/Projects';
import Tasks from '../../../modules/task/Tasks/Tasks';
import User from '../../../modules/user/User/User';
import Configuration from '../../../modules/shared/Configuration/Configuration';
import Client from '../../../modules/client/Client/Client';
import Profile from '../../../modules/shared/Profile/Profile';
import ProjectTimeLine from '../../../modules/shared/DashBoard/TimeLine';
import Login from '../Login/Login';
import Path from '../Path/Path';
import ConfigurationModules from '../../../modules/shared/ConfigurationModules/ConfigurationModules';
import ProjectReport from '../../../modules/project/ProjectReport/ProjectReport';
import ProjectAnalytics from '../../../modules/project/ProjectAnalytics/ProjectAnalytics';
import TaskReport from '../../../modules/task/TaskReport/TaskReport';
import TaskAnalytics from '../../../modules/task/TaskAnalytics/TaskAnalytics';
import ProjectCalendar from '../../../modules/project/ProjectCalendar/ProjectCalendar';
import ProjectKanban from '../../../modules/project/ProjectKanban/ProjectKanban';
import Teams from '../../../modules/team/Teams/Teams';
import Contracts from '../../../modules/contract/Contracts/Contracts';
import TaskKanban from '../../../modules/task/task-kanban/task-kanban';
import SearchProject from '../../../modules/shared/SearchProject/SearchProject';
import Register from '../Register/Register';

const Content = ({ connected }) => (
  <div className="col-md-12" style={{ display: connected ? 'block' : 'none' }}>
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/timeline" element={<ProjectTimeLine />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/task" element={<Task />} />
      <Route path="/note" element={<Note />} />
      <Route path="/message" element={<Message />} />
      <Route path="/client" element={<Client />} />
      <Route path="/user" element={<User />} />
      <Route path="/configuration" element={<Configuration />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/modules-configuration" element={<ConfigurationModules />} />
      <Route path="/project-report" element={<ProjectReport />} />
      <Route path="/project-analytics" element={<ProjectAnalytics />} />
      <Route path="/task-report" element={<TaskReport />} />
      <Route path="/task-analytics" element={<TaskAnalytics />} />
      <Route path="/calendar" element={<ProjectCalendar />} />
      <Route path="/project-kanban" element={<ProjectKanban />} />
      <Route path="/contract" element={<Contracts />} />
      <Route path="/team" element={<Teams />} />
      <Route path="/task-kanban" element={<TaskKanban />} />
      <Route path="/register" element={<Register />} />
      <Route path="/result/:input" element={<SearchProject />} />
    </Routes>
  </div>
);

export default Content;
