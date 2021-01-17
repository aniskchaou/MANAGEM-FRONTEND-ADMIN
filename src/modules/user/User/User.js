import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './User.css';
import AddUser from './../AddUser/AddUser';
import EditUser from './../EditUser/EditUser';
import ViewUser from './../ViewUser/ViewUser';
import { LoadJS } from '../../../libraries/datatables/datatables';


const deleteUser=()=>{
    return  window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
 }

const User =() =>{
  
  useEffect(() => {
    // Runs ONCE after initial rendering
    LoadJS()
    console.log('hello')
  }, []);
  
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
                    <tr>
                        <td>Laurent </td>
                        <td>Fecteau</td>
                        <td>LaurentFecteau@teleworm.us</td>
                        <td>04.76.36.38.36</td>
                        <td>Normale</td>
                        <td><button type="button" data-toggle="modal" data-target="#viewUser" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editUser"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteUser}><i class="fas fa-trash-alt"></i></button></td>

                    </tr>

                    <tr>
                        <td>Raoul  </td>
                        <td>Lévesque</td>
                        <td>RaoulLevesque@rhyta.com</td>
                        <td>02.43.95.52.74</td>
                        <td>Admin</td>
                        <td><button type="button" data-toggle="modal" data-target="#viewUser" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editUser"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteUser}><i class="fas fa-trash-alt"></i></button></td>

                    </tr>

                    <tr>
                        <td>Melville  </td>
                        <td>Poissonnier</td>
                        <td>MelvillePoissonnier@teleworm.us</td>
                        <td>03.57.85.34.60</td>
                        <td>Normale</td>
                        <td><button type="button" data-toggle="modal" data-target="#viewUser" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editUser"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteUser}><i class="fas fa-trash-alt"></i></button></td>

                    </tr>
                    
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
            <button  type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addUser">Ajouter</button>
           

            <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
             <AddUser/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
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
             <EditUser/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
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
              <ViewUser/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
)};

User.propTypes = {};

User.defaultProps = {};

export default User;
