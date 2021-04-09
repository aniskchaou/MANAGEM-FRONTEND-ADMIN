import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';
import ViewTask from '../ViewTask/ViewTask';
import AddTask from '../AddTask/AddTask';
import EditTask from '../EditTask/EditTask';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import taskMessage from '../../../main/messages/taskMessage';
import TaskTestService from '../../../main/mocks/TaskTestService';
import HTTPService from '../../../main/services/HTTPService';






const deleteTasks = () => {
  return window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
}

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();


  useEffect(() => {
    LoadJS()
    retrieveTasks()
  }, []);


  const getAll = () => {
    HTTPService.getAll()
      .then(response => {
        setTasks(response.data);
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



  const retrieveTasks = () => {
    var tasks = TaskTestService.getAll();
    setTasks(tasks);
  };

  const resfresh = () => {
    retrieveTasks()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm("Etes-vous sûr que vous voulez supprimer ?");
    if (r) {
      showMessage('Confirmation', taskMessage.delete, 'success')
      TaskTestService.remove(data)
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
            {tasks.map(item =>
              <tr>
                <td>{item.project_id}</td>
                <td>{item.title}</td>
                <td>{item.due_date}</td>
                <td>{item.priority}</td>
                <td >{item.users}</td>
                <td><span class="badge badge-success">{item.status}</span></td>
                <td>
                  <button onClick={e => update(e, item)} type="button" data-toggle="modal" data-target="#editJob" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                  <button onClick={e => remove(e, tasks.indexOf(item))} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>


              </tr>
            )}
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
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addTasks"><i class="far fa-plus-square"></i>  Ajouter</button>

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
                <ViewTask />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="addTasks" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddTask />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

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
                <EditTask />
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

Tasks.propTypes = {};

Tasks.defaultProps = {};

export default Tasks;
