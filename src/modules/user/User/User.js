import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './User.css';
import AddUser from './../AddUser/AddUser';
import EditUser from './../EditUser/EditUser';
import ViewUser from './../ViewUser/ViewUser';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import userMessage from '../../../main/messages/userMessage';
import UserTestService from '../../../main/mocks/UserTestService';
import HTTPService from '../../../main/services/HTTPService';



const deleteUser = () => {
  return window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
}

const User = () => {

  const [users, setUsers] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();


  useEffect(() => {
    LoadJS()
    retrieveUsers()
  }, []);


  const getAll = () => {
    HTTPService.getAll()
      .then(response => {
        setUsers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeOne = (data) => {
    HTTPService.remove(data)
      .then(response => {

      })
      .catch(e => {

      });
  }



  const retrieveUsers = () => {
    var users = UserTestService.getAll();
    setUsers(users);
  };

  const resfresh = () => {
    retrieveUsers()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm("Etes-vous sûr que vous voulez supprimer ?");
    if (r) {
      showMessage('Confirmation', userMessage.delete, 'success')
      UserTestService.remove(data)
      //removeOne(data)
      resfresh()
    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }

  return (
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(item =>
              <tr>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.groups}</td>
                <td>
                  <button onClick={e => update(e, item)} type="button" data-toggle="modal" data-target="#editUser" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                  <button onClick={e => remove(e, users.indexOf(item))} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addUser"><i class="far fa-plus-square"></i>  Ajouter</button>


        <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddUser />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>



        <div class="modal fade" id="editUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditUser />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="viewUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ViewUser />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

User.propTypes = {};

User.defaultProps = {};

export default User;
