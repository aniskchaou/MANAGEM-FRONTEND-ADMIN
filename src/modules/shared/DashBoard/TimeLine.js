import React, { useEffect, useRef } from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';

import Task from '../../mytask/Task/Task';
import TimeLine from "react-gantt-timeline";
import { NavLink } from 'react-router-dom';


const ProjectTimeLine = () => {
  // var links = []
  //var data = []
  const buttonAdd = useRef(null);


  let d1 = new Date();
  let d2 = new Date();
  d2.setDate(d2.getDate() + 5);
  let d3 = new Date();
  d3.setDate(d3.getDate() + 8);
  let d4 = new Date();
  d4.setDate(d4.getDate() + 20);
  const data = [
    {
      id: 1,
      start: d1,
      end: d2,
      name: "Projet 1"
    },
    {
      id: 2,
      start: d3,
      end: d4,
      name: "Projet  2",
      color: "orange"
    },
    {
      id: 2,
      start: d2,
      end: d3,
      name: "Projet  3",
      color: "blue"
    },
    {
      id: 2,
      start: d1,
      end: d4,
      name: "Projet  4",
      color: "green"
    }
  ];
  const links = [{ id: 1, start: 1, end: 2 }];




  return (
    <div>

      <div className="horizontal-scrollable">
        <div className="card">
          <div className="card-header">
            <strong className="card-title">Chronologie des projets</strong>
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
            <TimeLine data={data} links={links} />
          </div>
        </div>
      </div>
    </div>
  )
};

ProjectTimeLine.propTypes = {};

ProjectTimeLine.defaultProps = {};

export default ProjectTimeLine;
