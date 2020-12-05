import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = () => (
  <div className="card">
    <div className="card-header">
      <strong className="card-title">Ma tache</strong>
    </div>
    <div className="card-body">

      <table id="example1" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>à faire</th>
            <th>Date écheance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>tache 1</td>
            <td>12/11/2020</td>
          </tr></tbody>
      </table>
    </div>
  </div>
);

Task.propTypes = {};

Task.defaultProps = {};

export default Task;
