import React from 'react';
import PropTypes from 'prop-types';
import './ViewClient.css';

const ViewClient = () => (
  <div className="ViewClient">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" href="#">Overview</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#">Contract</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#">Project</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
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

ViewClient.propTypes = {};

ViewClient.defaultProps = {};

export default ViewClient;
