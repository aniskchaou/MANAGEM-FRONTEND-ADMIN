import React from 'react';
import PropTypes from 'prop-types';
import './Content.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import DashBoard from '../../../modules/shared/DashBoard/DashBoard';
import Message from '../../../modules/message/Message/Message';
import Note from '../../../modules/note/Note/Note';
import Task from '../../../modules/mytask/Task/Task';
import Projects from '../../../modules/project/Projects/Projects';
import Tasks from '../../../modules/task/Tasks/Tasks';
import User from '../../../modules/user/User/User';
import Configuration from '../../../modules/shared/Configuration/Configuration';
import Client from '../../../modules/client/Client/Client';
import EditProfile from '../../../modules/shared/EditProfile/EditProfile';
import ProjectTimeLine from '../../../modules/shared/DashBoard/TimeLine'
import CurrentUser from '../../config/user';
import Login from '../Login/Login';
import Path from '../Path/Path';
import ConfigurationModules from '../../../modules/shared/ConfigurationModules/ConfigurationModules';
import ProjectReport from '../../../components/ProjectReport/ProjectReport';
import ProjectAnalytics from '../../../components/ProjectAnalytics/ProjectAnalytics';
import TaskReport from '../../../components/TaskReport/TaskReport';
import TaskAnalytics from '../../../components/TaskAnalytics/TaskAnalytics';
import ProjectCalendar from '../../../components/ProjectCalendar/ProjectCalendar';
import ProjectKanban from '../../../components/ProjectKanban/ProjectKanban';
import Teams from '../../../components/Teams/Teams'
import Contracts from '../../../components/Contracts/Contracts'
const Content = () => (
  <div className="col-md-12" style={{ display: (CurrentUser.CONNECTED_USER ? 'block' : 'none') }}>
    <Path />
    <div>
      <Route exact path="/" component={DashBoard} />
      <Route exact path="/timeline" component={ProjectTimeLine} />
      <Route exact path="/dashboard" component={DashBoard} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/task" component={Task} />
      <Route exact path="/note" component={Note} />
      <Route exact path="/message" component={Message} />
      <Route exact path="/client" component={Client} />
      <Route exact path="/user" component={User} />
      <Route exact path="/configuration" component={Configuration} />
      <Route exact path="/profile" component={EditProfile} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/modules-configuration" component={ConfigurationModules} />
      <Route exact path="/project-report" component={ProjectReport} />
      <Route exact path="/project-analytics" component={ProjectAnalytics} />
      <Route exact path="/task-report" component={TaskReport} />
      <Route exact path="/task-analytics" component={TaskAnalytics} />
      <Route exact path="/calendar" component={ProjectCalendar} />
      <Route exact path="/project-kanban" component={ProjectKanban} />
      <Route exact path="/contract" component={Contracts} />
      <Route exact path="/team" component={Teams} />
    </div>


  </div>
);

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
