import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectCalendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import { NavLink } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';
const ProjectCalendar = () => {

  const buttonAdd = useRef(null);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {

    retrieveProjects()
  }, []);

  const retrieveProjects = () => {
    const eve = [];
    //var projects = ProjectTestService.getAll();
    //setLoading(true)
    let colors = ['orange', 'blue', 'green', 'yellow', 'red']
    projectHTTPService.getAllProject().then(res => {
      for (const item of res.data) {
        let index = Math.floor(Math.random() * (colors.length - 0 + 1) + 0)
        eve.push({ title: item.title, start: item.starting_date, end: item.ending_date, color: colors[index] })
      }
      setEvents(eve)
    })


  };


  return (
    <div className="card">

      <div className="card-header">
        <h4><i class="menu-icon fa fa-folder"></i> Projects</h4>
      </div>
      <div className="card-body">

        <div class="btn-group">
          <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-male"></i>  Switch to
          </button>
          <div class="dropdown-menu">
            <NavLink class="dropdown-item" to="/projects">List view</NavLink>
            <NavLink class="dropdown-item" to="/project-kanban">Kanban view</NavLink>
            <NavLink class="dropdown-item" to="/calendar">Calendar view</NavLink>
            <NavLink class="dropdown-item" to="/timeline" >Gantt view</NavLink>
          </div>
        </div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
        />
      </div>
    </div>
  );
};

ProjectCalendar.propTypes = {};

ProjectCalendar.defaultProps = {};

export default ProjectCalendar;
