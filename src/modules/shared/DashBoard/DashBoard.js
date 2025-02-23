import React, { useEffect, useState } from 'react';

import User from '../../../main/config/user';

import { Pie } from 'react-chartjs-2';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { LoadJS } from '../../../libraries/datatables/datatables';
import projectHTTPService from '../../../main/services/projectHTTPService';
import { Line } from 'react-chartjs-2';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService';
import taskHHTPService from '../../../main/services/taskHHTPService';
import ProjectInProgress from '../../../modules/project/ProjectInProgress/ProjectInProgress';
import TaskInProgress from '../../../modules/task/TaskInProgress/TaskInProgress';
import DashboardSummary from '../../../modules/shared/DashboardSummary/DashboardSummary';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';
import { useNavigate } from 'react-router-dom';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
//import faker from 'faker';

//ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data2 = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 3, 4, 5, 11, 3, 2],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }

  ],
};
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
const DashBoard = () => {
  const [project, setProject] = useState(data);
  const [myTasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false);


  const [todo, setTodo] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [done, setDone] = useState(0);
  const [blocked, setBlocked] = useState(0);
  const [dashboardSettings, setDashboardSettings] = useState([]);

  const [todotask, setTodotask] = useState(0);
  const [inprogresstask, setInprogresstask] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [inreview, setInreview] = useState(0);
  let history = useNavigate()


  useEffect(() => {
    if (localStorage.getItem('connected') == undefined) {
      history.push("/login")
    }
    loadChartData()
    getDashboardSettings()
    //LoadJS()


  }, []);
  const getDashboardSettings = () => {
    settingsHTTPService.getDashboardSettings().then(data => {
      setDashboardSettings(data.data[0])
      console.log(dashboardSettings)

    })
  }

  const loadChartData = () => {
    setLoading(true)
    projectHTTPService.findprojectByStatus().then(data => {
      console.log(data.data)
      setProject(data.data)
      setLoading(false)
    })
    // var tasks = MyTaskTestService.getAll();
    taskHHTPService.getAllMyTask(User.USER_DETAIL.username).then(data => {
      console.log(data.data)
      setTasks(data.data)
    })
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

  }

  return (

    <div className="col-md-12">
      {dashboardSettings.showSummary == 1 &&
        <DashboardSummary />
      }
      <div className="col-lg-12">
        <div className="card">
          {dashboardSettings.showExpenseIncomeCharts == 1 &&
            <div className="row">
              <div className="col-lg-6">

                <div className="card-body">

                  <h4 className="box-title">Projects </h4>
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
                </div>
              </div>
              <div className="col-lg-6">

                <div className="card-body">

                  <h4 className="box-title">Tasks </h4>
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
                </div>
              </div>
            </div>
          }

        </div>
      </div>
      <div className="orders">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body">
                <h4 className="box-title"> Tasks </h4>
              </div>
              <div className="card-body--">
                <div className="table-stats order-table ov-h">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th className="serial">#</th>
                        <th className="avatar">Task</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Priority</th>
                        <th>Assigned</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myTasks.map(item =>
                        <tr key={item.id}>
                          <td className="serial">{item.id}</td>
                          <td className="avatar">
                            {item.title}
                          </td>
                          <td> {item.startdate}</td>
                          <td>  <span className="name">{item.deadline}</span> </td>
                          <td> <span className="product">{item.priority}</span> </td>
                          <td><span className="count">{item.assigned}</span></td>
                          <td>
                            <span className="badge badge-complete">{item.status}</span>
                          </td>
                        </tr>


                      )}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="row">
              <ProjectInProgress />

              <TaskInProgress />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};



export default DashBoard;
