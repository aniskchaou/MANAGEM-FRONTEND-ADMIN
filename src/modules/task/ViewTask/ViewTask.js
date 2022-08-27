import React from 'react';
import PropTypes from 'prop-types';
import './ViewTask.css';

const ViewTask = () => (
  <div className="ViewTask">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" href="#">Overview</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#">Activity</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#">Comments</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Actions</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Mark as Review</a>
          <a class="dropdown-item" href="#">Mark as to to do</a>
          <a class="dropdown-item" href="#">Mark as Blocked</a>
          <a class="dropdown-item" href="#">Mark as Done</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Copy</a>
          <a class="dropdown-item" href="#">Edit</a>
          <a class="dropdown-item" href="#">Delete</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
);

ViewTask.propTypes = {};

ViewTask.defaultProps = {};

export default ViewTask;
