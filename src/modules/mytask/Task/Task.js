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
 import { Tooltip } from 'react-tooltip';
import { useForm } from 'react-hook-form';
import projectHTTPService from '../../../main/services/projectHTTPService';
import { Typography, Button, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MyTaskSummary from '../../../modules/task/MyTaskSummary/MyTaskSummary';
import taskHHTPService from '../../../main/services/taskHHTPService';
import User from '../../../main/config/user';
import CurrentUser from '../../../main/config/user';
const deleteTask = () => {
  return window.confirm(CurrentUser.DELTE_MSG)
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
  const [loading, setLoading] = useState(false);
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
    taskHHTPService.getAllMyTask(User.USER_DETAIL.username)
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
    var r = window.confirm(CurrentUser.DELTE_MSG);
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
    /*  const formData = new FormData();
 
     // Update the formData object 
     formData.append(
       "file",
       project.file,
       'file'
     );
 
     projectHTTPService.uploadFile(formData).then(res => {
       console.log(res)
     })
 
          < form method = "POST" class="" onSubmit = { handleSubmit(onSubmit) } enctype = "multipart/form-data" >
    
            <input ref={register({ required: true })} name="file" type="file" onChange={handleInputChange} />
            <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
              Sauvegarder</button>
          </form > */


    //< input type = "checkbox" checked = { checked } onChange = { handleChange } />
  }

  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'project_id', headerName: 'Project', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'deadline', headerName: 'Due Date', width: 200, cellClassName: 'deadline-color' },
    { field: 'priority', headerName: 'Priority', width: 200, cellClassName: 'priority-color' },
    { field: 'assigned', headerName: 'Assigned', width: 200 }
  ];


  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = tasks.find(item => item.id == e[0])
      setUpdatedItem(selectedItem)
      console.log(updatedItem);
    }
    setUpdatedItemIds(e)

  }
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const removeAll = (e) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {

      /*   certificateHTTPService.removeAllCertificates().then(data => {
          getAllPatient()
        }) */
    }
  }
  return (
    <div className="card">



      <div className="card-header">
        <strong className="card-title">My Tasks</strong>
      </div>
      <div className="card-body">
        <MyTaskSummary />

        <Tooltip />

        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={tasks}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}

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



export default Task;
