import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const Message = () => (
  <div className="card">
    <div className="card-header">
      <strong className="card-title">Mes Messages</strong>
    </div>
    <div className="card-body">

      <table id="example1" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>aze</td>
            <td>InternetExplorer 4.0</td>

          </tr></tbody>
      </table>
    </div>
  </div>
);

Message.propTypes = {};

Message.defaultProps = {};

export default Message;
