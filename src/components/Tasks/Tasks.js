import React from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';

const Tasks = () => (
  <div className="card">
    <div className="card-header">
      <strong className="card-title">Mes taches</strong>
    </div>
    <div className="card-body">

      <table id="example1" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Titre de projet</th>
            <th>Titre de tache</th>
            <th>Description</th>
            <th>Date écheance</th>
            <th>Priorité</th>
            <th>Utilisateurs</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>aze</td>
            <td>InternetExplorer 4.0</td>
            <td>12/12/2009</td>
            <td>13/12/2019</td>
            <td>zrerzr</td>
            <td>qzrert</td>
            <td>Disponible</td>
          </tr></tbody>
      </table>
    </div>
  </div>
);

Tasks.propTypes = {};

Tasks.defaultProps = {};

export default Tasks;
