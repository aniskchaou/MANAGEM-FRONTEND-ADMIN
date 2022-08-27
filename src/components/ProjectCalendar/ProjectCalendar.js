import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './ProjectCalendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import { NavLink } from 'react-router-dom';
const ProjectCalendar = () => {
  const events = [{ title: "today's event", date: new Date() }];
  const buttonAdd = useRef(null);
  return (
    <div className="card">

      <div className="card-header">
        <strong className="card-title">Calendar</strong>
      </div>
      <div className="card-body">
        <button ref={buttonAdd} type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addProject"><i class="far fa-plus-square"></i>  Ajouter</button>
        <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target="#bulkProject"><i class="fa fa-trash"></i>  Bulk Action</button>
        <NavLink type="button" className="btn btn-secondary btn-sm" to="/modules-configuration"><i class="fa fa-info-circle"></i>  Help</NavLink>
        <NavLink type="button" className="btn btn-success btn-sm" to="/modules-configuration"><i className="menu-icon fa fa-cog"></i>  Settings </NavLink>
        <div class="btn-group">
          <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-male"></i>  Switch to
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Kanban</a>
            <a class="dropdown-item" href="#">Calendar</a>
            <a class="dropdown-item" href="#">Gantt</a>
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
