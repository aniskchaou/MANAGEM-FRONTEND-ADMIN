import React, { useEffect, useRef, useState } from 'react';
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
import HTTPService from '../../../main/services/userHTTPService';
import taskHHTPService from '../../../main/services/taskHHTPService';
import { NavLink } from 'react-router-dom';
import { Typography, Button, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TaskSummary from '../../../modules/task/TaskSummary/TaskSummary';
import CurrentUser from '../../../main/config/user';





const deleteTasks = () => {
  return window.confirm(CurrentUser.DELTE_MSG)
}

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);


  const closeModalEdit = (data) => {
    resfresh()
    closeButtonEdit.current.click()
  }

  const closeModalAdd = (data) => {
    resfresh()
    closeButtonAdd.current.click()
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
    taskHHTPService.getAllTask().then(data => {
      setTasks(data.data)
      console.log(data.data)
    });
    ;
  };

  const resfresh = () => {
    retrieveTasks()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {

      //TaskTestService.remove(data)
      taskHHTPService.removeTask(data).then(data => {
        showMessage('Confirmation', taskMessage.delete, 'success')
        retrieveTasks()
      })
      //removeOne(data)
      resfresh()
    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }

  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'project', headerName: 'Project', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'startdate', headerName: 'Start Date', width: 200, cellClassName: 'deadline-color' },
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
        <h4><i class="menu-icon fa fa-list"></i> Tasks</h4>
      </div>
      <div className="card-body">
        <TaskSummary />
        <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Remove</button>
        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addTasks"><i class="far fa-plus-square"></i>  Create</button>


        <div class="btn-group">
          <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-male"></i>  Switch to
          </button>
          <div class="dropdown-menu">
            <NavLink class="dropdown-item" to="/tasks">List view</NavLink>
            <NavLink class="dropdown-item" to="/task-kanban">Kanban view</NavLink>
          </div>
        </div>

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





        <div class="modal fade" id="addTasks" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">New</h5>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddTask closeModal={closeModalAdd} />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} ref={closeButtonAdd} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditTask task={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} ref={closeButtonEdit} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
};

Tasks.propTypes = {};

Tasks.defaultProps = {};

export default Tasks;
