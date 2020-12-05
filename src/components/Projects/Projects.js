import React from 'react';
import PropTypes from 'prop-types';
import './Projects.css';

const Projects = () => (
  <div className="card">
  <div className="card-header">
    <strong className="card-title">Mes Projets</strong>
  </div>
  <div className="card-body">
    
    <table id="example1" className="table table-striped table-bordered">
    <thead>
                  <tr>
                    <th>Titre de projet</th>
                    <th>Description</th>
                    <th>Date de début</th>
                    <th>Date de fin </th>
                    <th>Utilisateurs</th>
                    <th>Clients</th>
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

Projects.propTypes = {};

Projects.defaultProps = {};

export default Projects;
