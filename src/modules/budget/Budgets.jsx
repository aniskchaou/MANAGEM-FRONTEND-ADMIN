import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Budgets.css';
import useForceUpdate from 'use-force-update';

import AddBudget from './AddBudget';
import EditBudget from './EditBudget';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CurrentUser from '../../main/config/user';
import BASE_URL from '../../main/urls/urls';

export const Budgets = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [budgetsLists, setBudgets] = useState([
    {
      budgetId: 1,
      projectId: 'P001',
      projectName: 'Alpha CRM',
      totalBudget: 50000,
      allocatedBudget: 35000,
      remainingBudget: 15000,
      status: 'On Track',
      lineItems: [
        { category: 'Labor', planned: 25000, actual: 20000, notes: 'Updated team size' },
        { category: 'Software', planned: 5000, actual: 6000, notes: 'Additional licenses' },
        { category: 'Materials', planned: 10000, actual: 9500, notes: '' },
        { category: 'Contingency', planned: 10000, actual: 0, notes: 'Reserved' },
      ]
    },
    {
      budgetId: 2,
      projectId: 'P002',
      projectName: 'Beta App',
      totalBudget: 30000,
      allocatedBudget: 32500,
      remainingBudget: -2500,
      status: 'Over Budget',
      lineItems: [
        { category: 'Labor', planned: 15000, actual: 17000, notes: 'Extra hours' },
        { category: 'Software', planned: 5000, actual: 6000, notes: 'Upgrade' },
        { category: 'Materials', planned: 7000, actual: 8500, notes: 'Unexpected costs' },
        { category: 'Contingency', planned: 3000, actual: 1000, notes: 'Used for bug fixes' },
      ]
    },
    {
      budgetId: 3,
      projectId: 'P003',
      projectName: 'Gamma Site',
      totalBudget: 45000,
      allocatedBudget: 20000,
      remainingBudget: 25000,
      status: 'On Track',
      lineItems: [
        { category: 'Labor', planned: 20000, actual: 12000, notes: 'Reduced scope' },
        { category: 'Software', planned: 5000, actual: 4000, notes: '' },
        { category: 'Materials', planned: 15000, actual: 4000, notes: 'Saved on materials' },
        { category: 'Contingency', planned: 5000, actual: 0, notes: 'Reserved' },
      ]
    }
  ]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);

  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);

  const retrieveBudgets = () => {
    setLoading(true);
    axios.get(`${BASE_URL}/budgets`)
      .then(response => {
        setBudgets(response.data);
      })
      .finally(() => setLoading(false));
  };

  const resfresh = () => {
    retrieveBudgets();
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
    retrieveBudgets();
  }, []);

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data);
    resfresh();
  };

  const remove = (e, id) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELETE_MSG)) {

      axios.delete(`${BASE_URL}/budgets/${id}`).then(() => resfresh());
    }
  };

  const handleRowSelection = (e) => {
    if (e.length === 1) {
      setUpdatedItemId(e[0]);
      const selected = budgetsLists.find(item => item.budgetId === e[0]);
      setUpdatedItem(selected);
    }
    setUpdatedItemIds(e);
  };

  const columns = [
    { field: 'projectName', headerName: 'Project', width: 150 },
    { field: 'totalBudget', headerName: 'Planned Budget', width: 130, valueFormatter: ({ value }) => `$${value.toLocaleString()}` },
    { field: 'allocatedBudget', headerName: 'Actual Spending', width: 130, valueFormatter: ({ value }) => `$${value.toLocaleString()}` },
    { field: 'remainingBudget', headerName: 'Remaining', width: 130, valueFormatter: ({ value }) => `$${value.toLocaleString()}` },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => (
      <span style={{
        color: params.value === 'On Track' ? '#43a047' : '#d32f2f',
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 8,
        background: params.value === 'On Track' ? '#e8f5e9' : '#ffebee',
        fontSize: 15
      }}>{params.value}</span>
    ) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button className="btn btn-sm btn-info" style={{ borderRadius: 8 }} onClick={() => { setSelectedBudget(params.row); setDetailsOpen(true); }}>View</button>
      )
    }
  ];

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-money-check-alt" style={{ marginRight: 10 }}></i> Budgets</h4>
          <button size="small" style={{ color: '#fff', marginLeft: 8, background: 'none', border: 'none' }} aria-label="Help" title="This page shows all budgets. Use the search bar to filter. Click the + button to add a new budget."><i className="fas fa-info-circle"></i></button>
        </div>
        <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="text"
            value={''}
            onChange={() => {}}
            placeholder="Search by project or status..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 180 }}
            aria-label="Search budgets"
          />
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addBudget" style={{ minWidth: 90 }}><i className="far fa-plus-square"></i> Create</button>
          <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#editBudget" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-edit"></i> Edit</button>
          <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-trash-alt"></i> Remove</button>
        </div>

        {loading ? <LinearProgress /> : (
          <div style={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={budgetsLists}
              getRowId={(row) => row.budgetId}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[6]}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        )}
        {/* Budget Details Modal */}
        {selectedBudget && (
          <div className={`modal fade${detailsOpen ? ' show' : ''}`} style={{ display: detailsOpen ? 'block' : 'none', background: '#0008', zIndex: 2000 }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content" style={{ borderRadius: 16 }}>
                <div className="modal-header" style={{ background: '#e3f2fd', borderRadius: '16px 16px 0 0' }}>
                  <h5 className="modal-title">{selectedBudget.projectName} <span style={{ color: '#888', fontSize: 15, marginLeft: 12 }}>{selectedBudget.status}</span></h5>
                  <button type="button" className="close" onClick={() => setDetailsOpen(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div style={{ marginBottom: 18 }}>
                    <b>Total Budget:</b> ${selectedBudget.totalBudget.toLocaleString()} &nbsp; <b>Actual Spending:</b> ${selectedBudget.allocatedBudget.toLocaleString()} &nbsp; <b>Remaining:</b> ${selectedBudget.remainingBudget.toLocaleString()}
                  </div>
                  <table className="table table-bordered" style={{ borderRadius: 8, background: '#fff' }}>
                    <thead style={{ background: '#e3f2fd' }}>
                      <tr>
                        <th>Category</th>
                        <th>Planned</th>
                        <th>Actual</th>
                        <th>Variance</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedBudget.lineItems || []).map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.category}</td>
                          <td>${item.planned?.toLocaleString?.() ?? item.planned}</td>
                          <td>${item.actual?.toLocaleString?.() ?? item.actual}</td>
                          <td style={{ color: item.actual <= item.planned ? '#43a047' : '#d32f2f', fontWeight: 600 }}>${(item.planned - item.actual)?.toLocaleString?.() ?? (item.planned - item.actual)}</td>
                          <td>{item.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: 18 }}>
                    <b>Status:</b> <span style={{ color: selectedBudget.status === 'On Track' ? '#43a047' : '#d32f2f' }}>{selectedBudget.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
          aria-label="Add Budget"
          data-toggle="modal"
          data-target="#addBudget"
        >
          <i className="fas fa-plus"></i>
        </button>

        {/* Add Budget Modal */}
        <div className="modal fade" id="addBudget" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Budget</h5>
                <button onClick={resfresh} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/*<AddBudget closeModal={closeModalAdd} />*/}
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="editBudget" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Budget</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/*<EditBudget budget={updatedItem} closeModal={closeModalEdit} />*/}
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

export default Budgets;