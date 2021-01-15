import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';
import ViewTask from './../ViewTask/ViewTask';
import AddTask from './../AddTask/AddTask';
import EditTask from './../EditTask/EditTask';
import { LoadJS } from './../init';
const deleteTasks=()=>{
  return  window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
}

const Tasks = () => {
  useEffect(() => {
    // Runs ONCE after initial rendering
    LoadJS()
    console.log('hello')
  }, []);
  return(
  <div className="card">
    <div className="card-header">
      <strong className="card-title">Taches</strong>
    </div>
    <div className="card-body">

      <table id="example1" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Titre de projet</th>
            <th>Titre de tache</th>
            <th>Date écheance</th>
            <th>Priorité</th>
            <th>Utilisateurs</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td>Construire une maison </td>
            <td>La préparation du terrain</td>
            <td>12/12/2009</td>
            <td class="badge badge-success">Urgent</td>
            <td><span class="badge badge-primary">Melville Poissonnier</span><span class="badge badge-primary">Benoît Grandbois</span></td>
            <td>Active</td>
            <td><button type="button" data-toggle="modal" data-target="#viewTasks" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editTasks"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteTasks}><i class="fas fa-trash-alt"></i></button></td>

          </tr>

          
          <tr>
            <td>Construire une maison </td>
            <td>L’assainissement</td>
            <td>01/11/2009</td>
            <td class="badge badge-success">Urgent</td>
            <td><span class="badge badge-primary">Melville Poissonnier</span><span class="badge badge-primary">Benoît Grandbois</span></td>
            <td>Active</td>
            <td><button type="button" data-toggle="modal" data-target="#viewTasks" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editTasks"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteTasks}><i class="fas fa-trash-alt"></i></button></td>

          </tr>

          
          <tr>
            <td>Construire une maison </td>
            <td>Les menuiseries et l’isolation</td>
            <td>12/10/2009</td>
            <td class="badge badge-secondary">Normale</td>
            <td><span class="badge badge-primary">Melville Poissonnier</span><span class="badge badge-primary">Benoît Grandbois</span> </td>
            <td>Active</td>
            <td><button type="button" data-toggle="modal" data-target="#viewTasks" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
              <button type="button" data-toggle="modal" data-target="#editTasks"class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger btn-sm" onClick={deleteTasks}><i class="fas fa-trash-alt"></i></button></td>

          </tr>
          
          
          
          </tbody>
          <tfoot>
          <tr>
            <th>Titre de projet</th>
            <th>Titre de tache</th>
            <th>Date écheance</th>
            <th>Priorité</th>
            <th>Utilisateurs</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
      <button  type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addTasks">Ajouter</button>
      
      <div class="modal fade" id="viewTasks" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
             <ViewTask/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="addTasks" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
             <AddTask/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="editTasks" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <EditTask/>
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

Tasks.propTypes = {};

Tasks.defaultProps = {};

export default Tasks;
