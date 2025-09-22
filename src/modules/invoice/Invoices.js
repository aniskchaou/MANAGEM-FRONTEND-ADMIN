import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { LinearProgress, Tooltip, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import AddInvoice from './AddInvoice';
// import EditInvoice from './EditInvoice';
// import CurrentUser from '../../main/config/user';
// import BASE_URL from '../../main/urls/urls';

const Invoices = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoicesList, setInvoices] = useState([
    {
      invoiceId: '001',
      client: 'Acme Corp',
      project: 'Alpha CRM',
      amount: 550,
      status: 'Paid',
      dueDate: 'Sep 20, 2025',
      createdAt: 'Sep 10, 2025',
      updatedAt: 'Sep 20, 2025',
      lineItems: [
        { description: 'Task Design', qty: 10, rate: 50, tax: 0.1, discount: 0, total: 550 }
      ],
      clientInfo: {
        name: 'Acme Corp',
        address: '123 Main St, City',
        contact: 'contact@acme.com',
        terms: 'Net 15'
      }
    },
    {
      invoiceId: '002',
      client: 'Beta Ltd',
      project: 'Beta App',
      amount: 1200,
      status: 'Draft',
      dueDate: 'Sep 25, 2025',
      createdAt: 'Sep 15, 2025',
      updatedAt: 'Sep 15, 2025',
      lineItems: [
        { description: 'Development', qty: 20, rate: 60, tax: 0.2, discount: 100, total: 1200 }
      ],
      clientInfo: {
        name: 'Beta Ltd',
        address: '456 Side St, City',
        contact: 'info@beta.com',
        terms: 'Net 30'
      }
    },
    {
      invoiceId: '003',
      client: 'Gamma Inc',
      project: 'Gamma Site',
      amount: 800,
      status: 'Overdue',
      dueDate: 'Sep 18, 2025',
      createdAt: 'Sep 05, 2025',
      updatedAt: 'Sep 18, 2025',
      lineItems: [
        { description: 'Consulting', qty: 8, rate: 100, tax: 0.15, discount: 0, total: 800 }
      ],
      clientInfo: {
        name: 'Gamma Inc',
        address: '789 High St, City',
        contact: 'hello@gamma.com',
        terms: 'Net 15'
      }
    }
  ]);
  const [updatedItem, setUpdatedItem] = useState({});
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);

  // Replace with your API endpoint
  const BASE_URL = '';


  // const retrieveInvoices = () => {
  //   setLoading(true);
  //   // axios.get(`${BASE_URL}/invoices`)
  //   //   .then(response => {
  //   //     setInvoices(response.data);
  //   //   })
  //   //   .finally(() => setLoading(false));
  //   setTimeout(() => {
  //     setInvoices([]); // Demo: empty list
  //     setLoading(false);
  //   }, 500);
  // };

  const resfresh = () => {
    //retrieveInvoices();
  };

  const closeModalEdit = () => {
    resfresh();
    closeButtonEdit.current?.click();
  };

  const closeModalAdd = () => {
    resfresh();
    closeButtonAdd.current?.click();
  };

  useEffect(() => {
  // retrieveInvoices();
  }, []);

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data);
    resfresh();
  };

  const remove = (e, id) => {
    e.preventDefault();
    // if (window.confirm(CurrentUser.DELETE_MSG)) {
    //   axios.delete(`${BASE_URL}/invoices/${id}`).then(() => resfresh());
    // }
  };

  const handleRowSelection = (e) => {
    if (e.length === 1) {
      setUpdatedItemId(e[0]);
      const selected = invoicesList.find(item => item.invoiceId === e[0]);
      setUpdatedItem(selected);
    }
    setUpdatedItemIds(e);
  };

  const columns = [
    { field: 'invoiceId', headerName: 'Invoice #', width: 90 },
    { field: 'client', headerName: 'Client', width: 140 },
    { field: 'project', headerName: 'Project', width: 140 },
    { field: 'status', headerName: 'Status', width: 110, renderCell: (params) => (
      <span style={{
        color: params.value === 'Paid' ? '#43a047' : params.value === 'Draft' ? '#888' : params.value === 'Overdue' ? '#d32f2f' : '#1976d2',
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 8,
        background: params.value === 'Paid' ? '#e8f5e9' : params.value === 'Draft' ? '#f5f5f5' : params.value === 'Overdue' ? '#ffebee' : '#e3f2fd',
        fontSize: 15
      }}>{params.value}</span>
    ) },
    { field: 'dueDate', headerName: 'Due', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button className="btn btn-sm btn-info" style={{ borderRadius: 8 }} onClick={() => { setSelectedInvoice(params.row); setDetailsOpen(true); }}>View</button>
      )
    }
  ];

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-file-invoice" style={{ marginRight: 10 }}></i> Invoices</h4>
          <Tooltip title="This page shows all invoices. Use the search bar to filter. Click the + button to add a new invoice." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-info-circle"></i></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Optionally add search/filter here */}
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addInvoice" style={{ minWidth: 90 }}><i className="far fa-plus-square"></i> Create</button>
          <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#editInvoice" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-edit"></i> Edit</button>
          <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-trash-alt"></i> Remove</button>
          <button onClick={resfresh} type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-repeat"></i> Reload</button>
        </div>

        {loading ? <LinearProgress /> : (
          <div style={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={invoicesList}
              getRowId={(row) => row.invoiceId}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[6]}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        )}
        {/* Invoice Details Modal */}
        {selectedInvoice && (
          <div className={`modal fade${detailsOpen ? ' show' : ''}`} style={{ display: detailsOpen ? 'block' : 'none', background: '#0008', zIndex: 2000 }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content" style={{ borderRadius: 16 }}>
                <div className="modal-header" style={{ background: '#e3f2fd', borderRadius: '16px 16px 0 0' }}>
                  <h5 className="modal-title">Invoice #{selectedInvoice.invoiceId} <span style={{ color: '#888', fontSize: 15, marginLeft: 12 }}>{selectedInvoice.status}</span></h5>
                  <button type="button" className="close" onClick={() => setDetailsOpen(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div style={{ marginBottom: 18 }}>
                    <b>Date Issued:</b> {selectedInvoice.createdAt} &nbsp; <b>Due Date:</b> {selectedInvoice.dueDate}
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <b>Client:</b> {selectedInvoice.clientInfo.name}<br />
                    <b>Address:</b> {selectedInvoice.clientInfo.address}<br />
                    <b>Contact:</b> {selectedInvoice.clientInfo.contact}<br />
                    <b>Payment Terms:</b> {selectedInvoice.clientInfo.terms}
                  </div>
                  <table className="table table-bordered" style={{ borderRadius: 8, background: '#fff' }}>
                    <thead style={{ background: '#e3f2fd' }}>
                      <tr>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Tax</th>
                        <th>Discount</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.lineItems.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.description}</td>
                          <td>{item.qty}</td>
                          <td>${item.rate}</td>
                          <td>{item.tax * 100}%</td>
                          <td>${item.discount}</td>
                          <td>${item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: 18, textAlign: 'right', fontSize: 16 }}>
                    <b>Subtotal:</b> ${selectedInvoice.lineItems.reduce((sum, i) => sum + i.qty * i.rate, 0)}<br />
                    <b>Tax:</b> ${selectedInvoice.lineItems.reduce((sum, i) => sum + i.qty * i.rate * i.tax, 0)}<br />
                    <b>Discount:</b> ${selectedInvoice.lineItems.reduce((sum, i) => sum + i.discount, 0)}<br />
                    <b>Total:</b> ${selectedInvoice.amount}
                  </div>
                  <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
                    <button className="btn btn-success">Mark Paid</button>
                    <button className="btn btn-primary">Send</button>
                    <button className="btn btn-outline-secondary">Download PDF</button>
                    <button className="btn btn-outline-info">Edit</button>
                  </div>
                </div>
              </div>
            </div>
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
          aria-label="Add Invoice"
          data-toggle="modal"
          data-target="#addInvoice"
        >
          <i className="fas fa-plus"></i>
        </button>

        {/* Add Modal */}
        <div className="modal fade" id="addInvoice" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Invoice</h5>
                <button onClick={resfresh} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <AddInvoice closeModal={closeModalAdd} /> */}
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <div className="modal fade" id="editInvoice" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Invoice</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <EditInvoice invoice={updatedItem} closeModal={closeModalEdit} /> */}
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

export default Invoices;
