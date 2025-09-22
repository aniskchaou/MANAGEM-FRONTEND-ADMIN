import React from 'react';
import './ConfigurationModules.css';
import { FaProjectDiagram, FaTasks, FaUser, FaUsers, FaBuilding } from 'react-icons/fa';

const ConfigurationModules = () => (
  <div className="config-container">
    <div className="config-header">
      <h2>Configuration Modules</h2>
      <p className="config-desc">Manage and customize your application settings for each module.</p>
    </div>
    <div className="row gutters-sm">
      <div className="col-md-4 d-none d-md-block">
        <div className="card config-nav-card">
          <div className="card-body">
            <nav className="nav flex-column nav-pills nav-gap-y-1">
              <a href="#project" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded active">
                <FaProjectDiagram style={{ marginRight: 8 }} /> Project
              </a>
              <a href="#tasks" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                <FaTasks style={{ marginRight: 8 }} /> Tasks
              </a>
              <a href="#mytasks" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                <FaUser style={{ marginRight: 8 }} /> My tasks
              </a>
              <a href="#users" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                <FaUsers style={{ marginRight: 8 }} /> Users
              </a>
              <a href="#client" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                <FaBuilding style={{ marginRight: 8 }} /> Client
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card config-content-card">
          <div className="card-body tab-content">
            <div className="tab-pane active" id="project">
              <h5 className="config-section-title">Project Settings</h5><hr />
              <form>
                <div className="form-group">
                  <label className="d-block mb-0">Default theme color</label>
                  <div className="small text-muted mb-3">Blue</div>
                  <label className="d-block mb-0">App Title</label>
                  <div className="small text-muted mb-3">Managem</div>
                  <label className="d-block mb-0">Signin page background</label>
                  <div className="small text-muted mb-3">Yes</div>
                  <label className="d-block mb-0">Show logo in signin page</label>
                  <div className="small text-muted mb-3">Yes</div>
                  <label className="d-block mb-0">Entreprise Name</label>
                  <div className="small text-muted mb-3">Delta Dev Software</div>
                  <label className="d-block mb-0">Address</label>
                  <div className="small text-muted mb-3">60c Avenue de Colmar 68100</div>
                  <label className="d-block mb-0">Email</label>
                  <div className="small text-muted mb-3">contact@deletadevsoftware.fr</div>
                  <div className="config-btn-group">
                    <button className="btn btn-info config-btn" type="button">Edit</button>
                    <button className="btn btn-warning config-btn" type="button">Restore to default</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="tab-pane" id="tasks">
              <h5 className="config-section-title">Tasks Settings</h5><hr />
              <label className="d-block mb-0">Language</label>
              <div className="small text-muted mb-3">English</div>
              <label className="d-block mb-0">Time zone</label>
              <div className="small text-muted mb-3">GMT+2</div>
              <label className="d-block mb-0">Date format</label>
              <div className="small text-muted mb-3">dd-mm-yyyy</div>
              <label className="d-block mb-0">Currency</label>
              <div className="small text-muted mb-3">USD</div>
              <label className="d-block mb-0">Currency symbol</label>
              <div className="small text-muted mb-3">$</div>
              <div className="config-btn-group">
                <button className="btn btn-info config-btn" type="button">Edit</button>
                <button className="btn btn-warning config-btn" type="button">Restore to default</button>
              </div>
            </div>
            <div className="tab-pane" id="mytasks">
              <h5 className="config-section-title">My Tasks Settings</h5><hr />
              <label className="d-block mb-0">info@demo.com</label>
              <div className="small text-muted mb-3">Email sent from address</div>
              <label className="d-block mb-0">Managem</label>
              <div className="small text-muted mb-3">Email sent from name</div>
              <label className="d-block mb-0">smtp.mail.com</label>
              <div className="small text-muted mb-3">SMTP server</div>
              <div className="config-btn-group">
                <button className="btn btn-info config-btn" type="button">Edit</button>
                <button className="btn btn-warning config-btn" type="button">Restore to default</button>
              </div>
            </div>
            <div className="tab-pane" id="users">
              <h5 className="config-section-title">Users Settings</h5><hr />
              <label className="d-block mb-0">sdfsfrgsdf</label>
              <div className="small text-muted mb-3">Projects</div>
              <div className="config-btn-group">
                <button className="btn btn-info config-btn" type="button">Edit</button>
                <button className="btn btn-warning config-btn" type="button">Restore to default</button>
              </div>
            </div>
            <div className="tab-pane" id="client">
              <h5 className="config-section-title">Client Settings</h5><hr />
              <label className="d-block mb-0">Yes</label>
              <div className="small text-muted mb-3">Enable Left Menu</div>
              <div className="config-btn-group">
                <button className="btn btn-info config-btn" type="button">Edit</button>
                <button className="btn btn-warning config-btn" type="button">Restore to default</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);



export default ConfigurationModules;
