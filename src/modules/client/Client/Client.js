import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Client.css';
import AddClient from './../AddClient/AddClient';
import EditClient from './../EditClient/EditClient';
import ViewClient from './../ViewClient/ViewClient';
import { LoadJS } from '../../../libraries/datatables/datatables';

const deleteClient=()=>{
  return  window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
}

const Client = () => {
  useEffect(() => {
    // Runs ONCE after initial rendering
    LoadJS()
    console.log('hello')
  }, []);

  return (
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Exact Realty</td>
            <td>Zerbino </td>
            <td>Aubé</td>
            <td>ZerbinoAube@armyspy.com</td>
            <td>01.42.64.12.81</td>
            <td><button type="button" data-toggle="modal" data-target="#viewClient" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editClient"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteClient}><i class="fas fa-trash-alt"></i></button></td>

          </tr>
          <tr>
            <td>KG Menswear</td>
            <td>Dielle  </td>
            <td>Labbé</td>
            <td>DielleLabbe@jourrapide.com</td>
            <td>04.00.42.83.27</td>
            <td><button type="button" data-toggle="modal" data-target="#viewClient" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editClient"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteClient}><i class="fas fa-trash-alt"></i></button></td>

          </tr>
          <tr>
            <td>Road Runner </td>
            <td>Yvette  </td>
            <td>Bouchard</td>
            <td>YvetteBouchard@jourrapide.com</td>
            <td>04.97.12.30.14</td>
            <td><button type="button" data-toggle="modal" data-target="#viewClient" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editClient"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteClient}><i class="fas fa-trash-alt"></i></button></td>

          </tr>
          </tbody>
          <tfoot>
          <tr>
            <th>Entreprise</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
      <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addClient">Ajouter</button>
      
      <div class="modal fade" id="addClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <AddClient/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="editClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <EditClient/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="viewClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <ViewClient/>
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

Client.propTypes = {};

Client.defaultProps = {};

export default Client;
