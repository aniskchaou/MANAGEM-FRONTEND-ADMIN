import React from 'react';
import { Routes, Route } from "react-router-dom";
import './Content.css';
import DashBoard from '../../../modules/shared/DashBoard/DashBoard';
import Message from '../../../modules/message/Message/Message';
import Note from '../../../modules/note/Note/Note';
import Task from '../../../modules/mytask/Task/Task';
import Projects from '../../../modules/project/Projects/Projects';
import Tasks from '../../../modules/task/Tasks/Tasks';
import User from '../../../modules/user/User/User';
import Configuration from '../../../modules/shared/Configuration/Configuration';
import Client from '../../../modules/client/Client/Client';
import Profile from '../../../modules/shared/Profile/Profile';
//import ProjectTimeLine from '../../../modules/shared/DashBoard/TimeLine';
import Login from '../Login/Login';

//import Path from '../Path/Path';
// import ConfigurationModules from '../../../modules/shared/ConfigurationModules/ConfigurationModules';
 import ProjectReport from '../../../modules/project/ProjectReport/ProjectReport';
import ProjectAnalytics from '../../../modules/project/ProjectAnalytics/ProjectAnalytics';
 import TaskReport from '../../../modules/task/TaskReport/TaskReport';
 import TaskAnalytics from '../../../modules/task/TaskAnalytics/TaskAnalytics';
// import ProjectCalendar from '../../../modules/project/ProjectCalendar/ProjectCalendar';
// import ProjectKanban from '../../../modules/project/ProjectKanban/ProjectKanban';
 import Teams from '../../../modules/team/Teams/Teams';
// import Contracts from '../../../modules/contract/Contracts/Contracts';
// import TaskKanban from '../../../modules/task/task-kanban/task-kanban';
// import SearchProject from '../../../modules/shared/SearchProject/SearchProject';
import Register from '../Register/Register';


import Epics from '../../../modules/epic/Epics';
import Roadmap from '../../../modules/roadmap/Roadmaps';
import Milestones from '../../../modules/milestone/MileStones';  
import Phases from '../../../modules/phase/Phases';
import Sprints from '../../../modules/sprint/Sprints';
import Workload from '../../../modules/workload/Workloads';
import TimeTracking from '../../../modules/time-tracking/Timetracking';
import Risks from '../../../modules/risk/Risks';
import ChangeRequests from '../../../modules/change-request/ChangeRequests';
import ImpactAssessments from '../../../modules/impact-assessment/ImpactAssessements';
import ApprovalWorkflows from '../../../modules/approval-workflow/ApprovalWorkflow';
import Invoices from '../../../modules/invoice/Invoices';
//import Payments from '../../../modules/payment/Payment';
import Budgets from '../../../modules/budget/Budgets';
import Achievements from '../../../modules/achievement/Achievements';

import Subtasks from '../../../modules/sub-task/SubTasks';
import Contracts from '../../../modules/contract/Contracts/Contracts';
import Backlog from '../../../modules/backlog/Backlog';
import Expenses from '../../../modules/expense/Expenses';
import RewardTypes from '../../../modules/reward/RewardTypes';
import EmployeeRewards from '../../../modules/reward/EmployeeReward';
import Leaderboard from '../../../modules/leaderboard/Leaderboards';
//import Participants from '../../../modules/participant/Participant';
import Meetings from '../../../modules/meeting/Meetings';
import ToDos from '../../../modules/todo/ToDo';
//import Alerts from '../../../modules/alert/Alert';
import Portfolio from '../../../modules/portfolio/Portfolios';
import Programs from '../../../modules/program/Programs';  
//import MyTasks from '../../../modules/mytask/MyTask';
import SubTasks from '../../../modules/sub-task/SubTasks';
import ProjectTimeLine from '../../../modules/project/Projects/ProjectTimeLine';
import ProjectKanban from '../../../modules/project/Projects/ProjectKanban';
import ProjectCalendar from '../../../modules/project/Projects/ProjectCalendar';
import TaskKanban from '../../../modules/task/Tasks/TaskKanban';;


const Content = ({ connected }) => (
  <div className="col-md-12" style={{ display: connected ? 'block' : 'none' }}>
    <Routes>
  {/* Dashboard & Auth */}
  <Route path="/" element={<DashBoard />} />
  <Route path="/dashboard" element={<DashBoard />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />

  {/* Projects & Planning */}
  <Route path="/projects" element={<Projects />} />
  <Route path="/calendar" element={<ProjectCalendar />} />
  <Route path="/timeline" element={<ProjectTimeLine />} />
  <Route path="/project-kanban" element={<ProjectKanban />} />
  <Route path="/portfolio" element={<Portfolio />} />
  <Route path="/programs" element={<Programs />} />
  <Route path="/backlogs" element={<Backlog />} />
  <Route path="/epics" element={<Epics />} />
  
   <Route path="/roadmap" element={<Roadmap />} /> 
  <Route path="/milestones" element={<Milestones />} />
  {/* <Route path="/phases" element={<Phases />} /> */}


  <Route path="/sub-tasks" element={<Subtasks />} />
  {/* Tasks & Sprints  */}
  <Route path="/tasks" element={<Tasks />} />
  <Route path="/task" element={<Task />} />
  {/* <Route path="/my-tasks" element={<MyTasks />} /> */}
  <Route path="/sub-tasks" element={<SubTasks />} />
  <Route path="/task-kanban" element={<TaskKanban />} />
  <Route path="/sprints" element={<Sprints />} />
  <Route path="/workload" element={<Workload />} />
  <Route path="/time-tracking" element={<TimeTracking />} />
  

 
  <Route path="/risks" element={<Risks />} />
  <Route path="/change-requests" element={<ChangeRequests />} />
  <Route path="/impact-assessments" element={<ImpactAssessments />} />
  <Route path="/approval-workflows" element={<ApprovalWorkflows />} />
 


  {/* Finance  */}
  <Route path="/invoices" element={<Invoices />} />
  {/* <Route path="/payments" element={<Payments />} /> */}
  <Route path="/budget" element={<Budgets />} />
  <Route path="/expenses" element={<Expenses />} />


 
  <Route path="/achievements" element={<Achievements />} />

  {/* Rewards  */}
  <Route path="/reward-types" element={<RewardTypes />} />
  <Route path="/employee-rewards" element={<EmployeeRewards />} />
  <Route path="/leaderboard" element={<Leaderboard />} />

  {/* Teams & Collaboration  */}
  <Route path="/teams" element={<Teams />} />
  {/* <Route path="/participants" element={<Participants />} /> */}
  <Route path="/meetings" element={<Meetings />} />
  <Route path="/messages" element={<Message />} />
  <Route path="/notes" element={<Note />} />
   <Route path="/todos" element={<ToDos />} />

   
  {/* <Route path="/client" element={<Client />} /> */}
  <Route path="/contract" element={<Contracts />} />

  {/* Users */}
  <Route path="/user" element={<User />} />

  {/* Alerts 
  <Route path="/alerts" element={<Alerts />} />

  {/* Analytics & Reports */}
   <Route path="/project-report" element={<ProjectReport />} />
  <Route path="/project-analytics" element={<ProjectAnalytics />} />
  <Route path="/task-report" element={<TaskReport />} />
  <Route path="/task-analytics" element={<TaskAnalytics />} />


  <Route path="/configuration" element={<Configuration />} />
  
  {/* Search 
  <Route path="/result/:input" element={<SearchProject />} />*/}
</Routes>

  </div>
);

export default Content;
