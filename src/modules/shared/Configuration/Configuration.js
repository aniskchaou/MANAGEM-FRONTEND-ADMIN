import React from 'react';
import PropTypes from 'prop-types';
import './Configuration.css';

const Configuration = () => (

  <div class="container">





    <div class="row gutters-sm">
      <div class="col-md-4 d-none d-md-block">
        <div class="card">
          <div class="card-body">
            <nav class="nav flex-column nav-pills nav-gap-y-1">
              <a href="#system" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded active">
                System
              </a>
              <a href="#localisation" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Localisation
              </a>
              <a href="#email" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Email
              </a>
              <a href="#emailtemplate" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Email template
              </a>
              <a href="#leftmenu" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Left Menu
              </a>
              <a href="#footer" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Footer
              </a>
              <a href="#notifications" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Notifications
              </a>
              <a href="#about" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                About
              </a>
              <a href="#headerbar" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Header
              </a>
              <a href="#dashboard" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Dashboard
              </a>
              <a href="#activitylog" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                Activity Log
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">

          <div class="card-body tab-content">
            <div class="tab-pane active" id="system">
              <h6>System Settings</h6><hr />
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
            <div class="tab-pane" id="localisation">
              <h6>Localisation Settings</h6><hr />
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
            <div class="tab-pane" id="email">
              <h6>Email Settings</h6><hr />
              <label class="d-block mb-0">info@demo.com  </label>
              <div class="small text-muted mb-3">Email sent from address  </div>
              <label class="d-block mb-0">Managem</label>
              <div class="small text-muted mb-3">Email sent from name</div>
              <label class="d-block mb-0">smtp.mail.com</label>
              <div class="small text-muted mb-3">SMTP server</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>


            </div>
            <div class="tab-pane" id="emailtemplate">
              <h6>Email Template Settings</h6><hr />
              <label class="d-block mb-0">sdfsfrgsdf</label>
              <div class="small text-muted mb-3">Projects</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>

            </div>
            <div class="tab-pane" id="leftmenu">
              <h6>Left menu Settings</h6><hr />
              <label class="d-block mb-0">Yes</label>
              <div class="small text-muted mb-3">Enable Left Menu</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>

            </div>

            <div class="tab-pane" id="footer">
              <h6>Footer Settings</h6><hr />
              <label class="d-block mb-0">Yes</label>
              <div class="small text-muted mb-3">Enable Footer</div>
              <label class="d-block mb-0">Yes</label>
              <div class="small text-muted mb-3">Enable Footer Menu</div>

              <label class="d-block mb-0">Yes</label>
              <div class="small text-muted mb-3">Enable Copy right Text </div>


              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>
            </div>
            <div class="tab-pane" id="notifications">
              <h6>Notifications Settings</h6><hr />
              <label class="d-block mb-0">Yes</label>
              <div class="small text-muted mb-3">Enable Notifications</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>
            </div>
            <div class="tab-pane" id="about">
              <h6>About Settings</h6><hr />
              <label class="d-block mb-0">1.0</label>
              <div class="small text-muted mb-3">Version</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>

            </div>


            <div class="tab-pane" id="headerbar">
              <h6>Header Settings</h6><hr />
              <label class="d-block mb-0">Show header bar</label>
              <div class="small text-muted mb-3">Yes</div>
              <label class="d-block mb-0">Show search bar </label>
              <div class="small text-muted mb-3">Yes</div>
              <label class="d-block mb-0">Show logo</label>
              <div class="small text-muted mb-3">Yes</div>
              <label class="d-block mb-0">Show Notification button</label>
              <div class="small text-muted mb-3">Yes</div>
              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>

            </div>

            <div class="tab-pane" id="activitylog">
              <h6>Activity Log</h6><hr />
              <label class="d-block mb-0">1.0</label>
              <div class="small text-muted mb-3">Version</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>

            </div>

            <div class="tab-pane" id="dashboard">
              <h6>Activity Log</h6><hr />
              <label class="d-block mb-0">1.0</label>
              <div class="small text-muted mb-3">Version</div>

              <button class="btn btn-info" type="button">Edit</button>
              <button class="btn btn-warning" type="button">Restore to default</button>

            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
);

Configuration.propTypes = {};

Configuration.defaultProps = {};

export default Configuration;
