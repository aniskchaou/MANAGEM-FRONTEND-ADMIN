import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';

import Task from '../../mytask/Task/Task';
import TimeLine from "react-gantt-timeline";
import { NavLink } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';


const ProjectTimeLine = () => {
  // var links = []
  //var data = []
  const buttonAdd = useRef(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getAllProjects()
  }, []);

  const getAllProjects = () => {
    let projectList = []
    projectHTTPService.getAllProject()
      .then(response => {
        let colors = ['orange', 'blue', 'green', 'yellow', 'red']

        for (const item of response.data) {
          let index = Math.floor(Math.random() * (colors.length - 0 + 1) + 0)
          let projectObject = {
            id: item.id,
            start: new Date(item.starting_date),
            end: new Date(item.ending_date),
            name: item.title,
            color: colors[index]
          }
          projectList.push(projectObject)
        }
        setProjects(projectList)
      })
      .catch(e => {
        console.log(e);
      });
  };

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
            <TimeLine data={projects} links={links} />
          </div>
        </div>
      </div>
    </div>
  )
};

ProjectTimeLine.propTypes = {};

ProjectTimeLine.defaultProps = {};

export default ProjectTimeLine;
