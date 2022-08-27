import React from 'react';
import PropTypes from 'prop-types';
import './ConfigurationModules.css';

const ConfigurationModules = () => (
  <div class="container">





    <div class="row gutters-sm">
      <div class="col-md-4 d-none d-md-block">
        <div class="card">
          <div class="card-body">
            <nav class="nav flex-column nav-pills nav-gap-y-1">
              <a href="#project" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded active">
                Project
              </a>
              <a href="#tasks" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Tasks
              </a>
              <a href="#mytasks" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                My tasks
              </a>
              <a href="#users" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Users
              </a>
              <a href="#client" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Client
              </a>

            </nav>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">

          <div class="card-body tab-content">
            <div class="tab-pane active" id="project">
              <h6>Project Settings</h6><hr />
              <form>
                <div class="form-group">
                  <label class="d-block mb-0">Default theme color</label>
                  <div class="small text-muted mb-3">Blue</div>

                  <label class="d-block mb-0">App Title</label>
                  <div class="small text-muted mb-3">Managem</div>

                  <label class="d-block mb-0">Signin page background</label>
                  <div class="small text-muted mb-3">Yes</div>

                  <label class="d-block mb-0">Show logo in signin page</label>
                  <div class="small text-muted mb-3">Yes</div>

                  <label class="d-block mb-0">Entreprise Name</label>
                  <div class="small text-muted mb-3">Delta Dev Software</div>

                  <label class="d-block mb-0">Address</label>
                  <div class="small text-muted mb-3">60c Avenue de Colmar 68100</div>

                  <label class="d-block mb-0">Email</label>
                  <div class="small text-muted mb-3">contact@deletadevsoftware.fr</div>


                  <button class="btn btn-info" type="button">Edit</button>
                  <button class="btn btn-warning" type="button">Restore to default</button>
                </div>
              </form>
            </div>
            <div class="tab-pane" id="tasks">
              <h6>Tasks Settings</h6><hr />
              <label class="d-block mb-0">Language</label>
              <div class="small text-muted mb-3">English</div>
              <label class="d-block mb-0">Time zone</label>
              <div class="small text-muted mb-3">GMT+2</div>
              <label class="d-block mb-0">Date format</label>
              <div class="small text-muted mb-3">dd-mm-yyyy</div>
              <label class="d-block mb-0">Currency</label>
              <div class="small text-muted mb-3">USD</div>
              <label class="d-block mb-0">Currency symbol</label>
              <div class="small text-muted mb-3">$</div>
              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>
            </div>
            <div class="tab-pane" id="mytasks">
              <h6>My tasks Settings</h6><hr />
              <label class="d-block mb-0">info@demo.com  </label>
              <div class="small text-muted mb-3">Email sent from address  </div>
              <label class="d-block mb-0">Managem</label>
              <div class="small text-muted mb-3">Email sent from name</div>
              <label class="d-block mb-0">smtp.mail.com</label>
              <div class="small text-muted mb-3">SMTP server</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>


            </div>
            <div class="tab-pane" id="users">
              <h6>Users Settings</h6><hr />
              <label class="d-block mb-0">sdfsfrgsdf</label>
              <div class="small text-muted mb-3">Projects</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>

            </div>
            <div class="tab-pane" id="client">
              <h6>Client Settings</h6><hr />
              <label class="d-block mb-0">Yes</label>
              <div class="small text-muted mb-3">Enable Left Menu</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);

ConfigurationModules.propTypes = {};

ConfigurationModules.defaultProps = {};

export default ConfigurationModules;
