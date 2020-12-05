import React from 'react';
import PropTypes from 'prop-types';
import './Client.css';

const Client = () => (
  <div className="card">
    <div className="card-header">
      <strong className="card-title">Clients</strong>
    </div>
    <div className="card-body">

      <table id="example1" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Entreprise</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>microsoft</td>
            <td>dani</td>
            <td>daniel</td>
            <td>dani@gmail.com</td>
            <td>3242342342</td>
          </tr></tbody>
      </table>
    </div>
  </div>
);

Client.propTypes = {};

Client.defaultProps = {};

export default Client;
