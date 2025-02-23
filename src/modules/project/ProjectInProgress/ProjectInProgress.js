import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectInProgress.css';
import projectHTTPService from '../../../main/services/projectHTTPService';

const ProjectInProgress = () => {

  const [projectsss, setProjectsss] = useState([]);


  useEffect(() => {

    projectHTTPService.getTopProject().then(data => {
      setProjectsss(data.data)
    })


  }, []);
  return (
    <div class="col-lg-6 col-xl-12">
      <div class="card br-0">
        <div class="card-body">
          <h4 class="box-title">Open Projects </h4>
        </div>
        <div class="card-body">
          <ul class="list-group">
            {projectsss.map(item =>
              <li key={item.id} class="list-group-item">{item.title}</li>

            )}
          </ul>
        </div>
      </div>
    </div>
  )
};



export default ProjectInProgress;
