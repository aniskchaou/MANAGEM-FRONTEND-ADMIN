import React from 'react';
import PropTypes from 'prop-types';
import './Content.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Configuration from '../Configuration/Configuration';
import Dashbord from '../DashBoard/DashBoard';
import User from '../User/User';
import Projects from '../Projects/Projects';
import Tasks from '../Tasks/Tasks';
import Task from '../Task/Task';
import Note from '../Note/Note';
import Message from '../Message/Message';
import Client from '../Client/Client';
const Content = () => (
  <div className="col-md-12">
  
      <div>
        <Route exact path="/" component={Dashbord} />
        <Route exact path="/dashboard" component={Dashbord} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/task" component={Task} />
        <Route exact path="/note" component={Note} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/client" component={Client} />
        <Route exact path="/user" component={User} />
        <Route exact path="/configuration" component={Configuration} />


      </div>
    

  </div>
);

Content.propTypes = {};

Content.defaultProps = {};

export default Content;
