import React, { useEffect, useState } from 'react';


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
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { LoadJS } from '../../../libraries/datatables/datatables';
import { Line } from 'react-chartjs-2';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService';
import ProjectInProgress from '../../../modules/project/ProjectInProgress/ProjectInProgress';
import TaskInProgress from '../../../modules/task/TaskInProgress/TaskInProgress';
import DashboardSummary from '../../../modules/shared/DashboardSummary/DashboardSummary';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//import faker from 'faker';

//ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
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
  const [myTasks, setTasks] = useState([]);
  const [todo, setTodo] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [done, setDone] = useState(0);
  const [blocked, setBlocked] = useState(0);
  const [dashboardSettings, setDashboardSettings] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [inreview, setInreview] = useState(0);
  // let history = useNavigate() // Not needed in demo mode


  useEffect(() => {
    // Demo mode: skip login redirect and API calls
    // Set dummy dashboard settings
    setDashboardSettings({ showSummary: 1, showExpenseIncomeCharts: 1 });
    setTasks([
      { name: 'Design UI for Dashboard', status: 'To Do' },
      { name: 'Implement API Integration', status: 'In Progress' },
      { name: 'Write Unit Tests', status: 'Completed' },
      { name: 'Review Code', status: 'In Review' },
    ]);
    setTodo(5);
    setInprogress(7);
    setDone(12);
    setBlocked(2);
    setCompleted(8);
    setInreview(2);
  }, []);

  // Example chart data
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(33, 150, 243, 0.5)',
      },
    ],
  };
  const doughnutData = {
    labels: ['To do', 'In progress', 'Done', 'Blocked'],
    datasets: [
      {
        label: 'Projects',
        data: [todo, inprogress, done, blocked],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(111, 111, 86, 0.5)'
        ],
        borderWidth: 1,
      },
    ],
  };
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Created',
        data: [5, 9, 7, 8, 6, 4, 3],
        borderColor: '#43a047',
        backgroundColor: 'rgba(67, 160, 71, 0.2)',
        tension: 0.4,
      },
    ],
  };
  const radarData = {
    labels: ['Design', 'Development', 'Testing', 'Deployment', 'Review'],
    datasets: [
      {
        label: 'Team Skills',
        data: [2, 9, 7, 5, 6],
        backgroundColor: 'rgba(255, 193, 7, 0.3)',
        borderColor: '#ffc107',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="dashboard-container" style={{ padding: '32px 0', background: '#f5f6fa', minHeight: '100vh' }}>
      {/* Summary Section */}
      {/* Statistics Widgets Row */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e4ea33', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <i className="fas fa-users" style={{ color: '#1976d2', fontSize: 32, marginBottom: 8 }}></i>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Total Users</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1976d2' }}>{myTasks.length}</div>
        </div>
        <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e4ea33', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <i className="fa fa-folder-open" style={{ color: '#43a047', fontSize: 32, marginBottom: 8 }}></i>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Open Projects</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#43a047' }}>{todo + inprogress + done + blocked}</div>
        </div>
        <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e4ea33', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <i className="fa fa-tasks" style={{ color: '#d32f2f', fontSize: 32, marginBottom: 8 }}></i>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Open Tasks</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#d32f2f' }}>{completed + inreview + todo + inprogress}</div>
        </div>
        {/* Example: Overloaded Users (from Workloads.js) */}
        <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e4ea33', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <i className="fa fa-exclamation-triangle" style={{ color: '#ffa726', fontSize: 32, marginBottom: 8 }}></i>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Overloaded Users</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#ffa726' }}>[stat]</div>
        </div>
        {/* Budget Widget */}
        <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e4ea33', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <i className="fa fa-money-bill" style={{ color: '#009688', fontSize: 32, marginBottom: 8 }}></i>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Budget</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#009688' }}>120,000 MAD</div>
        </div>
        {/* Invoices Widget */}
        <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e4ea33', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <i className="fa fa-file-invoice" style={{ color: '#6d4c41', fontSize: 32, marginBottom: 8 }}></i>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Invoices</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#6d4c41' }}>8</div>
        </div>
        {/* Meetings Widget */}
        <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e4ea33', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <i className="fa fa-handshake" style={{ color: '#0288d1', fontSize: 32, marginBottom: 8 }}></i>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Meetings</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#0288d1' }}>3</div>
        </div>
        {/* Risks Widget */}
        <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e4ea33', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <i className="fa fa-bolt" style={{ color: '#e53935', fontSize: 32, marginBottom: 8 }}></i>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Risks</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#e53935' }}>2</div>
        </div>
      </div>
      {/* ...existing dashboard charts and table... */}
      {/* Charts Section: 2x2 Material UI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#1976d2', marginBottom: 18 }}><i className="fa fa-bar-chart" style={{ marginRight: 8 }}></i>Task Completion Overview</h4>
            <Bar data={barData} options={{ responsive: true }} />
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#d32f2f', marginBottom: 18 }}><i className="fa fa-pie-chart" style={{ marginRight: 8 }}></i>Project Status Distribution</h4>
            <Doughnut data={doughnutData} options={{ responsive: true }} />
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#43a047', marginBottom: 18 }}><i className="fa fa-line-chart" style={{ marginRight: 8 }}></i>Line Chart</h4>
            <Line data={lineData} options={{ responsive: true }} />
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#ffc107', marginBottom: 18 }}><i className="fa fa-bullseye" style={{ marginRight: 8 }}></i>Radar Chart</h4>
            <Radar data={radarData} options={{ responsive: true }} />
          </CardContent>
        </Card>
        {/* Stacked Bar Chart: Resource Allocation */}
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#009688', marginBottom: 18 }}><i className="fa fa-bar-chart" style={{ marginRight: 8 }}></i>Resource Allocation</h4>
            <Bar data={{
              labels: ['Dev', 'QA', 'PM', 'Design', 'Ops'],
              datasets: [
                { label: 'Allocated', data: [8, 4, 2, 3, 1], backgroundColor: '#009688' },
                { label: 'Available', data: [2, 1, 1, 2, 2], backgroundColor: '#b2dfdb' }
              ]
            }} options={{ responsive: true, plugins: { legend: { position: 'top' } }, scales: { x: { stacked: true }, y: { stacked: true } } }} />
          </CardContent>
        </Card>
        {/* Polar Area Chart: Risk Distribution */}
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#e53935', marginBottom: 18 }}><i className="fa fa-bolt" style={{ marginRight: 8 }}></i>Risk Distribution</h4>
            <Doughnut data={{
              labels: ['Resource', 'Budget', 'Delivery', 'Scope', 'Invoice'],
              datasets: [
                { label: 'Criticality', data: [5, 3, 4, 2, 1], backgroundColor: ['#e53935', '#ffa726', '#1976d2', '#43a047', '#6d4c41'] }
              ]
            }} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </CardContent>
        </Card>
        {/* Horizontal Bar Chart: Sprint Velocity and Line Chart */}
          <Card sx={{ borderRadius: 3, boxShadow: 2, flex: 1, minWidth: 0 }}>
            <CardContent>
              <h4 style={{ fontWeight: 700, fontSize: 18, color: '#43a047', marginBottom: 18 }}><i className="fa fa-area-chart" style={{ marginRight: 8 }}></i>Sprint Velocity</h4>
              <Bar data={{
                labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'],
                datasets: [
                  { label: 'Velocity', data: [20, 25, 18, 22], backgroundColor: '#43a047' }
                ]
              }} options={{ indexAxis: 'y', responsive: true, plugins: { legend: { position: 'top' } } }} />
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 3, boxShadow: 2, flex: 1, minWidth: 0 }}>
            <CardContent>
              <h4 style={{ fontWeight: 700, fontSize: 18, color: '#1976d2', marginBottom: 18 }}><i className="fa fa-line-chart" style={{ marginRight: 8 }}></i>Tasks Created</h4>
              <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </CardContent>
          </Card>

      </div>
      {/* 2x2 Grid for Open Projects, Open Tasks, Timeline Project, Calendar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
        {/* Open Projects Table - Material UI */}
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#1976d2', marginBottom: 18 }}><i className="fa fa-folder-open" style={{ marginRight: 8 }}></i>Open Projects</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f6fa' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#1976d2' }}>Project Name</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#1976d2' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 12px' }}>Project Alpha</td>
                  <td style={{ padding: '8px 12px' }}><span style={{ background: '#43a047', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>In Progress</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px' }}>Project Beta</td>
                  <td style={{ padding: '8px 12px' }}><span style={{ background: '#1976d2', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>To Do</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px' }}>Project Gamma</td>
                  <td style={{ padding: '8px 12px' }}><span style={{ background: '#ffa726', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>Blocked</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px' }}>Project Delta</td>
                  <td style={{ padding: '8px 12px' }}><span style={{ background: '#d32f2f', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>Done</span></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        {/* Open Tasks Table - Material UI */}
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#43a047', marginBottom: 18 }}><i className="fa fa-tasks" style={{ marginRight: 8 }}></i>Open Tasks</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f6fa' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#43a047' }}>Task</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#43a047' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 12px' }}>Design UI for Dashboard</td>
                  <td style={{ padding: '8px 12px' }}><span style={{ background: '#1976d2', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>To Do</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px' }}>Implement API Integration</td>
                  <td style={{ padding: '8px 12px' }}><span style={{ background: '#43a047', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>In Progress</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px' }}>Write Unit Tests</td>
                  <td style={{ padding: '8px 12px' }}><span style={{ background: '#d32f2f', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>Completed</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 12px' }}>Review Code</td>
                  <td style={{ padding: '8px 12px' }}><span style={{ background: '#ffc107', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>In Review</span></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        {/* Timeline Project Section - Material UI */}
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#1976d2', marginBottom: 18 }}><i className="fa fa-clock-o" style={{ marginRight: 8 }}></i>Timeline Project</h4>
            <div style={{ position: 'relative', marginLeft: 24, marginTop: 16 }}>
              {/* Timeline vertical line */}
              <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 2, background: '#1976d2', borderRadius: 2 }}></div>
              {/* Timeline events */}
              {[{date:'Aug 1',label:'Project Kickoff'},{date:'Aug 5',label:'Design Phase Complete'},{date:'Aug 10',label:'Development Started'},{date:'Aug 20',label:'Testing Begins'},{date:'Aug 30',label:'Release'}].map((event, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 24, position: 'relative' }}>
                  <div style={{ width: 20, height: 20, background: '#1976d2', borderRadius: '50%', marginRight: 16, position: 'absolute', left: 0, top: 0, border: '3px solid #fff', boxShadow: '0 2px 8px #1976d233' }}></div>
                  <div style={{ marginLeft: 36 }}>
                    <span style={{ fontWeight: 700, color: '#1976d2', marginRight: 12 }}>{event.date}</span>
                    <span style={{ color: '#333' }}>{event.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Calendar Section - Material UI */}
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <h4 style={{ fontWeight: 700, fontSize: 18, color: '#43a047', marginBottom: 18 }}><i className="fa fa-calendar" style={{ marginRight: 8 }}></i>Calendar</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead>
                <tr>
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                    <th key={day} style={{ textAlign: 'center', padding: '6px', color: '#43a047', fontWeight: 700 }}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Example August 2025 calendar, starting Friday */}
                <tr>
                  <td></td><td></td><td></td><td></td><td style={{ textAlign: 'center', color: '#43a047', fontWeight: 700 }}>1</td><td style={{ textAlign: 'center' }}>2</td><td style={{ textAlign: 'center' }}>3</td>
                </tr>
                <tr>
                  {[4,5,6,7,8,9,10].map(d => (
                    <td key={d} style={{ textAlign: 'center', color: d===5 ? '#fff' : '#43a047', background: d===5 ? '#43a047' : '', borderRadius: d===5 ? 12 : 0, fontWeight: d===5 ? 700 : 400 }}>{d}</td>
                  ))}
                </tr>
                <tr>
                  {[11,12,13,14,15,16,17].map(d => (
                    <td key={d} style={{ textAlign: 'center' }}>{d}</td>
                  ))}
                </tr>
                <tr>
                  {[18,19,20,21,22,23,24].map(d => (
                    <td key={d} style={{ textAlign: 'center', color: d===20 ? '#fff' : '', background: d===20 ? '#43a047' : '', borderRadius: d===20 ? 12 : 0, fontWeight: d===20 ? 700 : 400 }}>{d}</td>
                  ))}
                </tr>
                <tr>
                  {[25,26,27,28,29,30,31].map(d => (
                    <td key={d} style={{ textAlign: 'center', color: d===30 ? '#fff' : '', background: d===30 ? '#43a047' : '', borderRadius: d===30 ? 12 : 0, fontWeight: d===30 ? 700 : 400 }}>{d}</td>
                  ))}
                </tr>
              </tbody>
            </table>
            {/* Calendar events legend */}
            <div style={{ marginTop: 16 }}>
              <span style={{ display: 'inline-block', background: '#43a047', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13, marginRight: 8 }}>5: Team Meeting</span>
              <span style={{ display: 'inline-block', background: '#43a047', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13, marginRight: 8 }}>20: QA Review</span>
              <span style={{ display: 'inline-block', background: '#43a047', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13, marginRight: 8 }}>30: Release</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};



export default DashBoard;
