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
const Content = () => (
  <div className="col-md-12">
  
      <div>
        <Route exact path="/" component={DashBoard} />
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


      </div>
    

  </div>
);

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
