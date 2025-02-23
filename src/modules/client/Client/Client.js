import React, { useEffect, useRef, useState } from 'react';
import './Client.css';
import AddClient from './../AddClient/AddClient';
import EditClient from './../EditClient/EditClient';
import ViewClient from './../ViewClient/ViewClient';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';
import ClientTestService from '../../../main/mocks/ClientTestService';
import HTTPService from '../../../main/services/HTTPService';
import clientHTTPService from '../../../main/services/clientHTTPService';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Typography, Button, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CurrentUser from '../../../main/config/user';


ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Client = () => {

  const [clients, setClients] = useState([]);
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
    retrieveClients()
  }, []);



  const retrieveClients = () => {
    setLoading(true)
    clientHTTPService.getAllClient().then(data => {
      setLoading(false)
      setClients(data.data)

    });
    ;
  };

  const resfresh = () => {
    retrieveClients()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {
      showMessage('Confirmation', clientMessage.delete, 'success')
      //ClientTestService.remove(data)
      //removeOne(data)
      clientHTTPService.removeClient(data).then(data => {
        resfresh()
      })

    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }


  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'last_name', headerName: 'Last name', width: 200 },
    { field: 'first_name', headerName: 'First name', width: 200 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Telephone', width: 200 },
  ];


  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = clients.find(item => item.id == e[0])
      setUpdatedItem(selectedItem)
      console.log(updatedItem);
    }
    setUpdatedItemIds(e)

  }
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showChart, setShowChart] = useState(false);

  return (

    <div className="card">

      <div className="card-header">
        <h4><i class="menu-icon fa fa-handshake-o"></i> Clients</h4>
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addClient"><i class="far fa-plus-square"></i>  Create</button>
        <button type="button" onClick={e => update(e, updatedItem)} data-toggle="modal" data-target="#edit" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i> edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Remove</button>
        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={clients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}


        <div class="modal fade" id="addClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLongTitle">New</h4>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddClient closeModal={closeModalAdd} />
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
                <h4 class="modal-title" id="exampleModalLongTitle">Edit</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditClient client={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} ref={closeButtonEdit} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
};



export default Client;
