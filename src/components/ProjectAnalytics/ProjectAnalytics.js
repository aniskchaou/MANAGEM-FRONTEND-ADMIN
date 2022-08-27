import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectAnalytics.css';
import { LoadJS } from '../../libraries/datatables/datatables';
import projectHTTPService from '../../main/services/projectHTTPService';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const ProjectAnalytics = () => {
  const [project, setProject] = useState(data);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    LoadJS()
    setLoading(true)
    projectHTTPService.findprojectByStatus().then(data => {
      console.log(data.data)
      setProject(data.data)
      setLoading(false)
    })
  }, []);
  return (
    <div className="card">

      <div className="card-header">
        <strong className="card-title">Clients</strong>
      </div>

      <div class="col-lg-6 col-xl-6">
        {!loading && <Pie data={project} />}
      </div>


    </div>

  )
};

ProjectAnalytics.propTypes = {};

ProjectAnalytics.defaultProps = {};

export default ProjectAnalytics;
