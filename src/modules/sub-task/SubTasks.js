import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './SubTasks.css';
import useForceUpdate from 'use-force-update';
import { Tooltip, Chip, Box, IconButton, TextField, InputAdornment } from '@mui/material';
import AddSubtask from './AddSubTask';
import EditSubtask from './EditSubTask';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CurrentUser from '../../main/config/user';
import BASE_URL from '../../main/urls/urls';

export const Subtasks = () => {
  const [subtasksList, setSubtasks] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);

  const [updatedItemId, setUpdatedItemId] = useState(0);
  // Remove unused updatedItemIds
  const [search, setSearch] = useState('');

  const retrieveSubtasks = () => {
    setLoading(true);
    axios.get(`${BASE_URL}/subtasks`)
      .then(response => {
        setSubtasks(response.data);
      })
      .finally(() => setLoading(false));
  };

  const resfresh = () => {
    retrieveSubtasks();
    forceUpdate();
  };

  const closeModalEdit = () => {
    resfresh();
    closeButtonEdit.current.click();
  };

  const closeModalAdd = () => {
    resfresh();
    closeButtonAdd.current.click();
  };

  useEffect(() => {
    retrieveSubtasks();
  }, []);

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data);
    resfresh();
  };

  const remove = (e, id) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELETE_MSG)) {
      axios.delete(`${BASE_URL}/subtasks/${id}`).then(() => resfresh());
    }
  };

  const handleRowSelection = (e) => {
    if (e.length === 1) {
      setUpdatedItemId(e[0]);
      const selected = subtasksList.find(item => item.id === e[0]);
      setUpdatedItem(selected);
    }
    // Removed setUpdatedItemIds for cleanup
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Subtask Name', width: 200 },
    { field: 'task', headerName: 'Parent Task', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString()
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString()
    }
  ];

  // Summary stats
  const totalSubtasks = subtasksList.length;
  const completedSubtasks = subtasksList.filter(s => s.status === 'Completed').length;
  const inProgressSubtasks = subtasksList.filter(s => s.status === 'In Progress').length;
  const highPrioritySubtasks = subtasksList.filter(s => s.priority === 'High').length;

  // Filtered subtasks
  const filteredSubtasks = subtasksList.filter(
    subtask =>
      subtask.name?.toLowerCase().includes(search.toLowerCase()) ||
      subtask.status?.toLowerCase().includes(search.toLowerCase()) ||
      subtask.task?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-tasks" style={{ marginRight: 10 }}></i> Subtasks</h4>
          <Tooltip title="This page shows all subtasks. Use the search bar to filter. Click the + button to add a new subtask." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-info-circle"></i></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, status, or parent task..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 180 }}
            aria-label="Search subtasks"
          />
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 18, marginBottom: 12, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total: {totalSubtasks}</span>
          <span><i className="fas fa-check-circle" style={{ marginRight: 6, color: '#43a047' }}></i> Completed: {completedSubtasks}</span>
          <span><i className="fas fa-bolt" style={{ marginRight: 6, color: '#1976d2' }}></i> In Progress: {inProgressSubtasks}</span>
          <span><i className="fas fa-exclamation-triangle" style={{ marginRight: 6, color: '#e53935' }}></i> High Priority: {highPrioritySubtasks}</span>
        </div>
        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addSubtask"><i className="far fa-plus-square"></i>  Create</button>
        <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#editSubtask" className="btn btn-info btn-sm ml-2"><i className="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm ml-2"><i className="fas fa-trash-alt"></i> Remove</button>
        <button onClick={resfresh} type="button" className="btn btn-secondary btn-sm ml-2"><i className="fas fa-repeat"></i> Reload</button>

        {loading ? <LinearProgress /> : (
          <div style={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={filteredSubtasks}
              getRowId={(row) => row.id}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[6]}
              checkboxSelection
              onSelectionModelChange={handleRowSelection}
              components={{ Toolbar: GridToolbar }}
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#e3f2fd',
                },
                '& .MuiDataGrid-overlay': {
                  background: '#fff',
                  color: '#888',
                  fontSize: 18,
                  fontWeight: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 200,
                },
              }}
              localeText={{
                noRowsLabel: search
                  ? 'No subtasks match your search.'
                  : 'No subtasks found. Create a new subtask to get started!',
              }}
            />
          </div>
        )}

        <Tooltip title="Add Subtask" arrow>
          <button
            style={{
              position: 'fixed',
              bottom: 38,
              right: 38,
              background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 56,
              height: 56,
              boxShadow: '0 4px 16px #1976d299',
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1000
            }}
            aria-label="Add Subtask"
            data-toggle="modal"
            data-target="#addSubtask"
          >
            <i className="fas fa-plus"></i>
          </button>
        </Tooltip>

        {/* Add Subtask Modal */}
        <div className="modal fade" id="addSubtask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">New</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddSubtask closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button ref={closeButtonAdd} onClick={resfresh} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Subtask Modal */}
        <div className="modal fade" id="editSubtask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <EditSubtask subtask={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} ref={closeButtonEdit} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subtasks;
