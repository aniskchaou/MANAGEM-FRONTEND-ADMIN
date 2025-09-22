import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Expenses.css';
import useForceUpdate from 'use-force-update';

import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CurrentUser from '../../main/config/user';
import BASE_URL from '../../main/urls/urls';

export const Expenses = () => {
  const [expensesList, setExpenses] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);

  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);

  const retrieveExpenses = () => {
    setLoading(true);
    axios.get(`${BASE_URL}/expenses`)
      .then(response => {
        setExpenses(response.data);
      })
      .finally(() => setLoading(false));
  };

  const resfresh = () => {
    retrieveExpenses();
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
    retrieveExpenses();
  }, []);

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data);
    resfresh();
  };

  const remove = (e, id) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELETE_MSG)) {
      axios.delete(`${BASE_URL}/expenses/${id}`).then(() => resfresh());
    }
  };

  const handleRowSelection = (e) => {
    if (e.length === 1) {
      setUpdatedItemId(e[0]);
      const selected = expensesList.find(item => item.expenseId === e[0]);
      setUpdatedItem(selected);
    }
    setUpdatedItemIds(e);
  };

  const columns = [
    { field: 'expenseId', headerName: 'ID', width: 70 },
    { field: 'budgetId', headerName: 'Budget ID', width: 100 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'approvedBy', headerName: 'Approved By', width: 130 },
    {
      field: 'date',
      headerName: 'Date',
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString()
    },
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

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-receipt" style={{ marginRight: 10 }}></i> Expenses</h4>
        </div>
        <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Optionally add search/filter here */}
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addExpense" style={{ minWidth: 90 }}><i className="far fa-plus-square"></i> Create</button>
          <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#editExpense" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-edit"></i> Edit</button>
          <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-trash-alt"></i> Remove</button>
          <button onClick={resfresh} type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-repeat"></i> Reload</button>
        </div>

        {loading ? <LinearProgress /> : (
          <div style={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={expensesList}
              getRowId={(row) => row.expenseId}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[6]}
              checkboxSelection
              onSelectionModelChange={handleRowSelection}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        )}

        {/* Floating Add Button */}
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
          aria-label="Add Expense"
          data-toggle="modal"
          data-target="#addExpense"
        >
          <i className="fas fa-plus"></i>
        </button>

        {/* Add Modal */}
        <div className="modal fade" id="addExpense" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Expense</h5>
                <button onClick={resfresh} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <AddExpense closeModal={closeModalAdd} /> */}
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <div className="modal fade" id="editExpense" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Expense</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <EditExpense expense={updatedItem} closeModal={closeModalEdit} /> */}
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

export default Expenses;
