import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TaskAnalytics.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import taskHHTPService from '../../../main/services/taskHHTPService';

//import typeSubsHTTPService from '../../../main/services/typeSubsHTTPService';

ChartJS.register(ArcElement, Tooltip, Legend);
const TaskAnalytics = () => {
  const [categories, setCategories] = useState([]);
  const [todo, setTodo] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [inreview, setInreview] = useState(0);


  useEffect(() => {

    taskHHTPService.getTodo().then(data => {
      setTodo(data.data.todo)
    })
    taskHHTPService.getInprogress().then(data => {
      setInprogress(data.data.inprogress)
    })
    taskHHTPService.getCompleted().then(data => {
      setCompleted(data.data.completed)
    })
    taskHHTPService.getinreview().then(data => {
      setInreview(data.data.inreview)
    })

  });
  return (
    <div className="card">

      <div className="card-header">
        <strong className="card-title"><i class="fas fa-chart-pie"></i>Task Analytics</strong>
      </div>

      <div class="col-lg-6 col-xl-6">
        <Pie data={{
          labels: ['To do', 'In Progress', 'Completed', 'In Review'],
          datasets: [
            {
              label: '# of Votes',
              data: [todo, inprogress, completed, inreview],
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
                'rgba(111, 111, 86, 0.2)'
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



export default TaskAnalytics;
