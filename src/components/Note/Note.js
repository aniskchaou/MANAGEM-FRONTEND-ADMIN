import React from 'react';
import PropTypes from 'prop-types';
import './Note.css';

const Note = () => (
  <div className="card">
  <div className="card-header">
    <strong className="card-title">Mes Notes</strong>
  </div>
  <div className="card-body">
    
    <table id="example1" className="table table-striped table-bordered">
    <thead>
                  <tr>
                    <th>Notes</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>azzeazeazeazeazzzzzzzzzzzze</td>
                  </tr></tbody>
    </table>
  </div>
</div>
);

Note.propTypes = {};

Note.defaultProps = {};

export default Note;
