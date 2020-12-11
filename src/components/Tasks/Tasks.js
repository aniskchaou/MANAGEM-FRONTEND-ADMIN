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
            <th>Actions</th>
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
            <td><button disabled type="button" className="btn btn-primary btn-sm">voir</button>
              <button disabled type="button" className="btn btn-warning btn-sm">editer</button>
              <button disabled type="button" className="btn btn-danger btn-sm">Supprimer</button></td>

          </tr></tbody>
      </table>
      <button  type="button" className="btn btn-success btn-sm">Ajouter</button>

    </div>
  </div>
);

Tasks.propTypes = {};

Tasks.defaultProps = {};

export default Tasks;
