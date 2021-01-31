import React, { useEffect } from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';

import Task from '../../mytask/Task/Task';
import TimeLine from "react-gantt-timeline";


const ProjectTimeLine = () => {
  // var links = []
  //var data = []



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
