import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Workflows.css';
import useForceUpdate from 'use-force-update';

import AddWorkflow from './AddWorkflow';
import EditWorkflow from './EditWorkflow';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CurrentUser from '../../main/config/user';
import BASE_URL from '../../main/urls/urls';

export const Workflows = () => {
  const [workflowList, setWorkflows] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);

  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);

  const retrieveWorkflows = () => {
    setLoading(true);
    axios.get(`${BASE_URL}/workflows`)
      .then(response => {
        setWorkflows(response.data);
      })
      .finally(() => setLoading(false));
  };

  const resfresh = () => {
    retrieveWorkflows();
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
    retrieveWorkflows();
  }, []);

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data);
    resfresh();
  };

  const remove = (e, id) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELETE_MSG)) {
      axios.delete(`${BASE_URL}/workflows/${id}`).then(() => resfresh());
    }
  };

  const handleRowSelection = (e) => {
    if (e.length === 1) {
      setUpdatedItemId(e[0]);
      const selected = workflowList.find(item => item.id === e[0]);
      setUpdatedItem(selected);
    }
    setUpdatedItemIds(e);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'step', headerName: 'Step', width: 100 },
    { field: 'budgetId', headerName: 'Budget ID', width: 100 },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'date', headerName: 'Date', width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString()
    },
    { field: 'approvedBy', headerName: 'Approved By', width: 150 },
    {
      field: 'createdAt', headerName: 'Created At', width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString()
    },
    {
      field: 'updatedAt', headerName: 'Updated At', width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString()
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h4><i className="menu-icon fas fa-sitemap"></i> Workflows</h4>
      </div>

      <div className="card-body">
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addWorkflow">
          <i className="far fa-plus-square"></i> Create
        </button>
        <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#editWorkflow" className="btn btn-warning btn-sm">
          <i className="fas fa-edit"></i> Edit
        </button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm">
          <i className="fas fa-trash-alt"></i> Remove
        </button>

        {loading ? <LinearProgress /> : (
          <div style={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={workflowList}
              getRowId={(row) => row.id}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[6]}
              checkboxSelection
              onSelectionModelChange={handleRowSelection}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        )}

        {/* Add Modal */}
        <div className="modal fade" id="addWorkflow" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Workflow</h5>
                <button onClick={resfresh} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <AddWorkflow closeModal={closeModalAdd} /> */}
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <div className="modal fade" id="editWorkflow" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Workflow</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <EditWorkflow workflow={updatedItem} closeModal={closeModalEdit} /> */}
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

export default Workflows;
