import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TaskInProgress.css';
import taskHHTPService from '../../../main/services/taskHHTPService';

const TaskInProgress = () => {

  const [tasksss, settasksss] = useState([]);


  useEffect(() => {

    taskHHTPService.getTopTask().then(data => {
      settasksss(data.data)
    })


  }, []);

  return (
    <div class="col-lg-6 col-xl-12">
      <div class="card bg-flat-color-3  ">
        <div class="card-body">
          <h4 class="box-title">Open Tasks </h4>
        </div>
        <div class="card-body">
          <ul class="list-group">
            {tasksss.map(item =>
              <li key={item.id} class="list-group-item">{item.title}</li>

            )}
          </ul>
        </div>
      </div>
    </div>
  )

};

TaskInProgress.propTypes = {};

TaskInProgress.defaultProps = {};

export default TaskInProgress;
