import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import AddMyTask from '../AddMyTask/AddMyTask';
import EditMyTask from '../EditMyTask/EditMyTask';
import ViewMyTask from '../ViewMyTask/ViewMyTask';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import taskMessage from '../../../main/messages/taskMessage';
import MyTaskTestService from '../../../main/mocks/MyTaskTestService';
import HTTPService from '../../../main/services/HTTPService';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService';
import ReactTooltip from 'react-tooltip';
import { useForm } from 'react-hook-form';
import projectHTTPService from '../../../main/services/projectHTTPService';

const deleteTask = () => {
  return window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
}

const Task = () => {

  const initialState = {
    file: null
  }
  const [tasks, setTasks] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [show, setShow] = useState(true);
  const [project, setProject] = useState(initialState);
  const { register, handleSubmit, errors } = useForm()
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {

    if (checked) {
      setShow(false)

    } else {
      setShow(true)
    }
    setChecked(event.currentTarget.checked);
  }


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
    var tasks = MyTaskTestService.getAll();
    mytaskHTTPService.getAllMyTask()
      .then(response => {
        setTasks(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
      MyTaskTestService.remove(data)
      //removeOne(data)
      resfresh()
    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }

  const handleInputChange = event => {

    setProject({ 'file': event.target.files[0] });
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      "file",
      project.file,
      'file'
    );

    projectHTTPService.uploadFile(formData).then(res => {
      console.log(res)
    })

    /*      < form method = "POST" class="" onSubmit = { handleSubmit(onSubmit) } enctype = "multipart/form-data" >
   
           <input ref={register({ required: true })} name="file" type="file" onChange={handleInputChange} />
           <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
             Sauvegarder</button>
         </form > */


    //< input type = "checkbox" checked = { checked } onChange = { handleChange } />
  }
  return (
    <div className="card">



      <div className="card-header">
        <strong className="card-title">Mes taches</strong>
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
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addTask"><i class="far fa-plus-square"></i>  Ajouter</button>



        <ReactTooltip />


        <table id="example1" className="table table-striped table-bordered">
          <thead>
            <tr>
              {show == true && <th>à faire</th>}
              <th>Date écheance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(item =>
              <tr>
                {show == true && <td>{item.todo}</td>}
                <td>{item.due_date}</td>

                <td>
                  <button onClick={e => update(e, item)} type="button" data-toggle="modal" data-target="#editJob" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                  <button onClick={e => remove(e, tasks.indexOf(item))} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>


              </tr>


            )}
            <tr>
              {show == true && <td>daily meeting</td>}
              <td>12/11/2020</td>
              <td><button data-tip="hello world" type="button" data-toggle="modal" data-target="#viewTask" class="btn btn-primary btn-sm"><i class="fas fa-address-book"></i></button>
                <button data-tip="hello world" type="button" data-toggle="modal" data-target="#editTask" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                <button data-tip="hello world" type="button" class="btn btn-danger btn-sm" onClick={deleteTask}><i class="fas fa-trash-alt"></i></button></td>

            </tr>
          </tbody>
          <tfoot>
            <tr>
              {show == true && <th>à faire</th>}
              <th>Date écheance</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>

        <div class="modal fade" id="addTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddMyTask />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>



        <div class="modal fade" id="editTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditMyTask />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>



        <div class="modal fade" id="viewTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ViewMyTask />
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

Task.propTypes = {};

Task.defaultProps = {};

export default Task;
