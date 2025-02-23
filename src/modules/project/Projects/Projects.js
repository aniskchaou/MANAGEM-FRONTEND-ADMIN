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
import HTTPService from '../../../main/services/userHTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';
import Path from '../../../main/shared/Path/Path';
import { NavLink } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { Typography, Button, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ProjectSummary from '../../../modules/project/ProjectSummary/ProjectSummary';
import CurrentUser from '../../../main/config/user';
const deleteProject = () => {
  return window.confirm(CurrentUser.DELTE_MSG)
}


const Projects = () => {


  let [color, setColor] = useState("#ffffff");
  const [projects, setProjects] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();

  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);

  const closeModalEdit = (data) => {
    resfresh()
    closeButtonEdit.current.click()
  }

  const closeModalAdd = (data) => {
    console.log('close')
    closeButtonAdd.current.click()
  }
  useEffect(() => {
    LoadJS()
    setLoading(false)
    retrieveProjects()
  }, []);
  const [loading, setLoading] = useState(false);




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
    var r = window.confirm(CurrentUser.DELTE_MSG);
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

  }

  const copy = (e, data) => {
    projectHTTPService.copyProject(data.id).then(data => {
      console.log(data.data)
      //buttonEdit.current.click()
      //update(data.data)
      resfresh()
    })
  }
  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'title', headerName: 'Title', width: 200, cellClassName: 'title-color' },
    { field: 'starting_date', headerName: 'Start', width: 200, cellClassName: 'start-date-color' },
    { field: 'ending_date', headerName: 'End', width: 200, cellClassName: 'end-date-color' },
    { field: 'users', headerName: 'Users', width: 200 },
    { field: 'status', headerName: 'Status', width: 200, cellClassName: 'status-color' },
    { field: 'client', headerName: 'Client', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
  ];


  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = projects.find(item => item.id == e[0])
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
        <h4><i class="menu-icon fa fa-folder"></i> Projects</h4>
      </div>
      <div className="card-body">
        <ProjectSummary />
        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addProject"><i class="far fa-plus-square"></i>  Create</button>
        <button onClick={e => copy(e, updatedItem)} type="button" class="btn btn-warning btn-sm"><i class="fas fa-copy"></i> Copy</button>
        <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" class="btn btn-info btn-sm"><i class="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Remove</button>

        <button onClick={resfresh} type="button" class="btn btn-secondary btn-sm"><i class="fas fa-repeat"></i> Reload</button>
        <div class="btn-group">
          <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-male"></i>  Switch to
          </button>
          <div class="dropdown-menu">
            <NavLink class="dropdown-item" to="/projects">List view</NavLink>
            <NavLink class="dropdown-item" to="/project-kanban">Kanban view</NavLink>
            <NavLink class="dropdown-item" to="/calendar">Calendar view</NavLink>
            <NavLink class="dropdown-item" to="/timeline" >Gantt view</NavLink>
          </div>
        </div>
        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={projects}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}





        <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">New</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
               <AddProject closeModal={closeModalAdd} />
              </div>
              <div class="modal-footer">
                <button ref={closeButtonAdd} onClick={resfresh} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

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
               <EditProject project={updatedItem} closeModal={closeModalEdit} />
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



export default Projects;
