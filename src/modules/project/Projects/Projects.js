import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Projects.css';
import AddProject from '../AddProject/AddProject';
import EditMyTask from '../../mytask/EditMyTask/EditMyTask';
import EditProject from './../EditProject/EditProject';
import ViewProject from './../ViewProject/ViewProject';
import { useEffect } from 'react';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import projectMessage from '../../../main/messages/projectMessage';
import ProjectTestService from '../../../main/mocks/ProjectTestService';
import HTTPService from '../../../main/services/HTTPService';

const deleteProject = () => {
  return window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
}


const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();


  useEffect(() => {
    LoadJS()
    retrieveProjects()
  }, []);


  const getAll = () => {
    HTTPService.getAll()
      .then(response => {
        setProjects(response.data);
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



  const retrieveProjects = () => {
    var projects = ProjectTestService.getAll();
    setProjects(projects);
  };

  const resfresh = () => {
    retrieveProjects()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm("Etes-vous sûr que vous voulez supprimer ?");
    if (r) {
      showMessage('Confirmation', projectMessage.delete, 'success')
      ProjectTestService.remove(data)
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
        <strong className="card-title">Projets</strong>
      </div>
      <div className="card-body">

        <table id="example1" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Titre de projet</th>
              <th>Date de début</th>
              <th>Date de fin </th>
              <th>Utilisateurs</th>
              <th>Clients</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {projects.map(item =>
              <tr>
                <td>{item.title}</td>
                <td>{item.starting_date}</td>
                <td>{item.ending_date}</td>
                <td>{item.users}</td>
                <td>{item.client}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={e => update(e, item)} type="button" data-toggle="modal" data-target="#editJob" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                  <button onClick={e => remove(e, projects.indexOf(item))} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>


              </tr>


            )}











            <tr>
              <td>Contruire une Maison</td>

              <td>12/12/2009</td>
              <td>13/12/2010</td>
              <td><span class="badge badge-primary">Manville Goudreau</span>
                <span class="badge badge-primary">Lucille Bergeron</span>
              </td>
              <td><span class="badge badge-success">Laure Saucier</span></td>
              <td><span class="badge badge-warning">en cours</span></td>
              <td><button type="button" data-toggle="modal" data-target="#viewProject" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
                <button type="button" data-toggle="modal" data-target="#editProject" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger btn-sm" onClick={deleteProject}><i class="fas fa-trash-alt"></i></button></td>

            </tr>
            <tr>
              <td>Contruire une Maison</td>

              <td>4/3/2009</td>
              <td>1/1/2019</td>
              <td><span class="badge badge-primary">Manville Goudreau</span>
                <span class="badge badge-primary">Eglantine Langlais</span>
              </td>
              <td><span class="badge badge-success">Ruby Faubert</span></td>
              <td><span class="badge badge-secondary">demarré</span></td>
              <td><button type="button" data-toggle="modal" data-target="#viewProject" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
                <button type="button" data-toggle="modal" data-target="#editProject" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger btn-sm" onClick={deleteProject}><i class="fas fa-trash-alt"></i></button></td>

            </tr>

          </tbody>
          <tfoot>
            <tr>
              <th>Titre de projet</th>
              <th>Date de début</th>
              <th>Date de fin </th>
              <th>Utilisateurs</th>
              <th>Clients</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addProject"><i class="far fa-plus-square"></i>  Ajouter</button>




        <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Nouveau</h5>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddProject />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="editProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditProject />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="viewProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ViewProject />
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

Projects.propTypes = {};

Projects.defaultProps = {};

export default Projects;
