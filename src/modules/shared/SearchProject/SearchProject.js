import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchProject.module.css';
import projectHTTPService from '../../../main/services/projectHTTPService';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';

const SearchProject = (props) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    searchProject(props.match.params.input)
  }, []);
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

  const searchProject = (title) => {
    setLoading(true)
    projectHTTPService.searchProject(title).then(data => {
      console.log(data.data)
      setProjects(data.data);
      setLoading(false)
    })
  }
  return (
    <div className="card">

      <div className="card-header">
        <h4><i class="menu-icon fa fa-search"></i> Search Results</h4>
      </div>
      <div className="card-body">
        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={projects}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection

            components={{ Toolbar: GridToolbar }}
          /></div>}


      </div>
    </div >
  )
};



export default SearchProject;
