import React, { useEffect, useState } from 'react';
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


const deleteClient = () => {
  return window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?")
}
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


  useEffect(() => {
    LoadJS()
    retrieveClients()
  }, []);


  const getAll = () => {
    HTTPService.getAll()
      .then(response => {
        setClients(response.data);
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



  const retrieveClients = () => {
    clientHTTPService.getAllClient().then(data => {
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
    var r = window.confirm("Etes-vous sûr que vous voulez supprimer ?");
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

  return (

    <div className="card">

      <div className="card-header">
        <strong className="card-title">Clients</strong>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="stat-widget-five">
                  <div className="stat-icon dib flat-color-1">
                    <i className="pe-7s-cash"></i>
                  </div>
                  <div className="stat-content">
                    <div className="text-left dib">
                      <div className="stat-text">
                        <span className="count">5</span>
                      </div>
                      <div className="stat-heading">Projets</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="stat-widget-five">
                  <div className="stat-icon dib flat-color-2">
                    <i className="pe-7s-cart"></i>
                  </div>
                  <div className="stat-content">
                    <div className="text-left dib">
                      <div className="stat-text">
                        <span className="count">3</span>
                      </div>
                      <div className="stat-heading">Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="stat-widget-five">
                  <div className="stat-icon dib flat-color-3">
                    <i className="pe-7s-browser"></i>
                  </div>
                  <div className="stat-content">
                    <div className="text-left dib">
                      <div className="stat-text">
                        <span className="count">2</span>
                      </div>
                      <div className="stat-heading">Taches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="stat-widget-five">
                  <div className="stat-icon dib flat-color-4">
                    <i className="pe-7s-users"></i>
                  </div>
                  <div className="stat-content">
                    <div className="text-left dib">
                      <div className="stat-text">
                        <span className="count">2</span>
                      </div>
                      <div className="stat-heading">Messages</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" data-toggle="modal" data-target="#viewClient" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addClient"><i class="far fa-plus-square"></i>  Ajouter</button>

        <table id="example1" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {clients.map(item =>
              <tr>
                <td>{item.company}</td>
                <td>{item.last_name}</td>
                <td>{item.first_name}</td>
                <td>{item.email}</td>
                <td >{item.phone}</td>
                <td>
                  <button onClick={e => update(e, item)} type="button" data-toggle="modal" data-target="#edit" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                  <button onClick={e => remove(e, clients.indexOf(item))} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Entreprise</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>

        <div class="modal fade" id="addClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddClient />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditClient client={updatedItem} />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="viewClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ViewClient />
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

Client.propTypes = {};

Client.defaultProps = {};

export default Client;
