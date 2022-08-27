import React, { useEffect, useState } from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import './DashBoard.css';
import Task from '../../mytask/Task/Task';
import TimeLine from "react-gantt-timeline";


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
  useEffect(() => {
    //LoadJS()
    setLoading(true)
    projectHTTPService.findprojectByStatus().then(data => {
      console.log(data.data)
      setProject(data.data)
      setLoading(false)
    })
    mytaskHTTPService.getAllMyTask().then(data => {
      setTasks(data.data)
    })
  }, []);


  return (

    <div className="col-md-12">

      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-1">
                  <i className="pe-7s-cash"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">5</span>
                    </div>
                    <div className="stat-heading">Projets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-2">
                  <i className="pe-7s-cart"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">3</span>
                    </div>
                    <div className="stat-heading">Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-3">
                  <i className="pe-7s-browser"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">2</span>
                    </div>
                    <div className="stat-heading">Taches</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-4">
                  <i className="pe-7s-users"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">2</span>
                    </div>
                    <div className="stat-heading">Messages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="box-title">Projects </h4>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="card-body">
                {!loading && <Pie data={project} />}
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card-body">
                {<Line options={options} data={data} />}
              </div>
            </div>
          </div>
          <div class="card-body"></div>
        </div>
      </div>
      <div class="orders">
        <div class="row">
          <div class="col-xl-8">
            <div class="card">
              <div class="card-body">
                <h4 class="box-title">My Tasks </h4>
              </div>
              <div class="card-body--">
                <div class="table-stats order-table ov-h">
                  <table class="table ">
                    <thead>
                      <tr>
                        <th class="serial">#</th>
                        <th class="avatar">Avatar</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myTasks.map(item =>
                        <tr>
                          <td class="serial">1.</td>
                          <td class="avatar">
                            <div class="round-img">
                              <a href="#"><img class="rounded-circle" src="images/avatar/1.jpg" alt="" /></a>
                            </div>
                          </td>
                          <td> #5469 </td>
                          <td>  <span class="name">{item.todo}</span> </td>
                          <td> <span class="product">iMax</span> </td>
                          <td><span class="count">231</span></td>
                          <td>
                            <span class="badge badge-complete">Complete</span>
                          </td>
                        </tr>


                      )}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4">
            <div class="row">
              <div class="col-lg-6 col-xl-12">
                <div class="card br-0">
                  <div class="card-body">
                    <h4 class="box-title">Open Projects </h4>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li class="list-group-item">Morbi leo risus</li>
                      <li class="list-group-item">Porta ac consectetur ac</li>
                      <li class="list-group-item">Vestibulum at eros</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-xl-12">
                <div class="card bg-flat-color-3  ">
                  <div class="card-body">
                    <h4 class="box-title">Open Tasks </h4>
                  </div>
                  <div class="card-body">
                    <ul class="list-group">
                      <li class="list-group-item">Morbi leo risus</li>
                      <li class="list-group-item">Porta ac consectetur ac</li>
                      <li class="list-group-item">Vestibulum at eros</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};

DashBoard.propTypes = {};

DashBoard.defaultProps = {};

export default DashBoard;
