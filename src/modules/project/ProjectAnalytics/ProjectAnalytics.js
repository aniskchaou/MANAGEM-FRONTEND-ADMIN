import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectAnalytics.css';
import { LoadJS } from '../../../libraries/datatables/datatables';
import projectHTTPService from '../../../main/services/projectHTTPService';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

//import typeSubsHTTPService from '../../../main/services/typeSubsHTTPService';

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
  const [categories, setCategories] = useState([]);
  const [todo, setTodo] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [done, setDone] = useState(0);
  const [blocked, setBlocked] = useState(0);


  useEffect(() => {

    projectHTTPService.getTodo().then(data => {
      setTodo(data.data.todo)
    })
    projectHTTPService.getInprogress().then(data => {
      setInprogress(data.data.inprogress)
    })
    projectHTTPService.getDone().then(data => {
      setDone(data.data.done)
    })
    projectHTTPService.getBlocked().then(data => {
      setBlocked(data.data.blocked)
    })

  });
  return (
    <div className="card">

      <div className="card-header">
        <strong className="card-title"><i class="fas fa-chart-pie"></i>Project Analytics</strong>
      </div>

      <div class="col-lg-6 col-xl-6">
        <Pie data={{
          labels: ['To do', 'In progress', 'Done', 'Blocked'],
          datasets: [
            {
              label: '# of Votes',
              data: [todo, inprogress, done, blocked],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(111, 111, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(111, 111, 86, 1)'
              ],
              borderWidth: 1,
            },
          ],
        }} />
        <br />
      </div>


    </div>

  )
};

ProjectAnalytics.propTypes = {};

ProjectAnalytics.defaultProps = {};

export default ProjectAnalytics;
