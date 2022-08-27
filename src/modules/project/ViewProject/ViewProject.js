import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './ViewProject.css';
import { LoadJS } from '../../../libraries/datatables/datatables';

const ViewProject = () => {


  useEffect(() => {
    LoadJS()
  }, []);

  return (
    <div className="ViewProject">
      <nav class="nav nav-pills">
        <a class="nav-item nav-link active" href="#overview" data-toggle="tab">Overview</a>
        <a class="nav-item nav-link" href="#tasks" data-toggle="tab">Tasks List</a>
        <a class="nav-item nav-link" href="#tasks" data-toggle="tab">Tasks Kanban</a>
        <a class="nav-item nav-link" href="#tasks" data-toggle="tab">Tasks Gantt</a>
        <a class="nav-item nav-link" href="#mytasks" data-toggle="tab">My Tasks</a>
        <a class="nav-item nav-link" href="#team" data-toggle="tab">Team</a>
        <a class="nav-item nav-link" href="#note" data-toggle="tab">Note</a>
        <a class="nav-item nav-link" href="#note" data-toggle="tab">Files</a>
        <a class="nav-item nav-link" href="#note" data-toggle="tab">Comments</a>
        <a class="nav-item nav-link" href="#note" data-toggle="tab">Contracts</a>
        <a class="nav-item nav-link" href="#note" data-toggle="tab">Collaborators</a>
        <a class="nav-item nav-link" href="#note" data-toggle="tab">Activity</a>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Actions</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Mark as Finished</a>
            <a class="dropdown-item" href="#">Mark as Paused</a>
            <a class="dropdown-item" href="#">Mark as Blocked</a>
            <a class="dropdown-item" href="#">Mark as Canceled</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Copy</a>
            <a class="dropdown-item" href="#">Edit</a>
            <a class="dropdown-item" href="#">Delete</a>
          </div>
        </li>
      </nav>
      <hr />
      <div class="tab-content">
        <div class="tab-pane active" id="overview">
          <div class="stepper-wrapper">
            <div class="stepper-item completed">
              <div class="step-counter">1</div>
              <div class="step-name">First</div>
            </div>
            <div class="stepper-item completed">
              <div class="step-counter">2</div>
              <div class="step-name">Second</div>
            </div>
            <div class="stepper-item active">
              <div class="step-counter">3</div>
              <div class="step-name">Third</div>
            </div>
            <div class="stepper-item">
              <div class="step-counter">4</div>
              <div class="step-name">Forth</div>
            </div>
          </div>


        </div>
        <div class="tab-pane" id="tasks">tasks</div>
        <div class="tab-pane" id="mytasks">my tasks</div>
        <div class="tab-pane" id="team">team</div>
        <div class="tab-pane" id="note">note</div>
      </div>



    </div>)
};

ViewProject.propTypes = {};

ViewProject.defaultProps = {};

export default ViewProject;
