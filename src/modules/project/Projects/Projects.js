import React, { CSSProperties, useRef, useState } from 'react';
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
import projectHTTPService from '../../../main/services/projectHTTPService';
import Path from '../../../main/shared/Path/Path';
import { NavLink } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
const deleteProject = () => {
  return window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
}


const Projects = () => {


  let [color, setColor] = useState("#ffffff");
  const [projects, setProjects] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const closeButtonAdd = useRef(null);
  const buttonAdd = useRef(null);
  const buttonEdit = useRef(null);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    LoadJS()
    setLoading(false)
    retrieveProjects()
  }, []);


  const getAll = () => {
    projectHTTPService.getAllProject()
      .then(response => {
        setProjects(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const addNew = () => {

    closeButtonAdd.current.click()
    resfresh()
    setTimeout(function () {
      buttonAdd.current.click()
    }, 1000);

  }

  const removeOne = (data) => {
    HTTPService.remove(data)
      .then(response => {

      })
      .catch(e => {

      });
  }



  const retrieveProjects = () => {
    //var projects = ProjectTestService.getAll();
    setLoading(true)
    projectHTTPService.getAllProject().then(data => {
      console.log(data.data)
      setProjects(data.data);
      setLoading(false)
    })

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
      projectHTTPService.removeProject(data).then(data => {
        resfresh()
      })
      //removeOne(data)

    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }

  const copy = (e, data) => {
    projectHTTPService.copyProject(data.id).then(data => {
      console.log(data.data)
      //buttonEdit.current.click()
      //update(data.data)
      resfresh()
    })
  }


  return (

    <div className="card">

      <div className="card-header">
        <strong className="card-title">Projets</strong>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="stat-widget-five">
                  <div className="stat-icon dib flat-color-1">
                    <i className="pe-7s-cash"></i>
                  </div>
                  <div className="stat-content">
                    <div className="text-left dib">
                      <div className="stat-text">
                        <span className="count">5</span>
                      </div>
                      <div className="stat-heading">Projets</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="stat-widget-five">
                  <div className="stat-icon dib flat-color-2">
                    <i className="pe-7s-cart"></i>
                  </div>
                  <div className="stat-content">
                    <div className="text-left dib">
                      <div className="stat-text">
                        <span className="count">3</span>
                      </div>
                      <div className="stat-heading">Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="stat-widget-five">
                  <div className="stat-icon dib flat-color-3">
                    <i className="pe-7s-browser"></i>
                  </div>
                  <div className="stat-content">
                    <div className="text-left dib">
                      <div className="stat-text">
                        <span className="count">2</span>
                      </div>
                      <div className="stat-heading">Taches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="stat-widget-five">
                  <div className="stat-icon dib flat-color-4">
                    <i className="pe-7s-users"></i>
                  </div>
                  <div className="stat-content">
                    <div className="text-left dib">
                      <div className="stat-text">
                        <span className="count">2</span>
                      </div>
                      <div className="stat-heading">Messages</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button ref={buttonAdd} type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addProject"><i class="far fa-plus-square"></i>  Ajouter</button>
        <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target="#bulkProject"><i class="fa fa-trash"></i>  Bulk Action</button>
        <NavLink type="button" className="btn btn-secondary btn-sm" to="/modules-configuration"><i class="fa fa-info-circle"></i>  Help</NavLink>
        <NavLink type="button" className="btn btn-success btn-sm" to="/modules-configuration"><i className="menu-icon fa fa-cog"></i>  Settings </NavLink>
        <div class="btn-group">
          <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-male"></i>  Switch to
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Kanban</a>
            <a class="dropdown-item" href="#">Calendar</a>
            <a class="dropdown-item" href="#">Gantt</a>
          </div>
        </div>
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
                <td><span class="badge badge-success">{item.client}</span></td>
                <td>
                  <select><option>
                    {item.status}</option></select>
                </td>
                <td>
                  <button type="button" data-toggle="modal" data-target="#viewProject" class="btn btn-warning btn-sm"><i class="fas fa-eye"></i></button>
                  <button onClick={e => copy(e, item)} type="button" class="btn btn-warning btn-sm"><i class="fas fa-copy"></i></button>
                  <button ref={buttonEdit} onClick={e => update(e, item)} type="button" data-toggle="modal" data-target="#edit" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                  <button onClick={e => remove(e, item.id)} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
              </tr>
            )}
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


        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditProject project={updatedItem} />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="viewProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-custom" role="document">
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
                <button type="button" ref={closeButtonAdd} class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                <button type="button" onClick={addNew} className="btn btn-success btn-sm"><i class="far fa-plus-square"></i>  Ajouter</button>
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
