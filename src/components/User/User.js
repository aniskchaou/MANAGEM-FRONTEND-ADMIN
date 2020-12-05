import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = () => (
    <div className="card">
        <div className="card-header">
            <strong className="card-title">Utilisateurs</strong>
        </div>
        <div className="card-body">

            <table id="example1" className="table table-striped table-bordered">
                <thead>

                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>aze</td>
                        <td>InternetExplorer 4.0</td>
                        <td>12/12/2009</td>
                        <td>13/12/2019</td>
                        <td>normale</td>
                    </tr></tbody>
            </table>
        </div>
    </div>
);

User.propTypes = {};

User.defaultProps = {};

export default User;
