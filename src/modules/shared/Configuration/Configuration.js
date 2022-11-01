import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Configuration.css';
import { useHistory } from 'react-router-dom';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import { data } from '../DashBoard/DashBoard';
import useForceUpdate from 'use-force-update';
import EditSystemSettings from '../EditSystemSettings/EditSystemSettings'
import EditLocalisationSettings from '../EditLocalisationSettings/EditLocalisationSettings';
import EditHeaderSettings from '../EditHeaderSettings/EditHeaderSettings';
import EditNotificationsSettings from '../EditNotificationsSettings/EditNotificationsSettings'
import EditDashboardSettings from '../EditDashboardSettings/EditDashboardSettings';
import EditEmailSettings from '../EditEmailSettings/EditEmailSettings'
import EditFooterSettings from '../EditFooterSettings/EditFooterSettings';
const Configuration = () => {
  const [systemSettings, setSystemSettings] = useState({})
  const [dashboardSettings, setDashboardSettings] = useState({})
  const [headerSettings, setHeaderSettings] = useState({})
  const [footerSettings, setFooterSettings] = useState({})
  const [localisationSettings, setLocalisationSettings] = useState({})
  const [emailSettings, setEmailSettings] = useState({})
  const [emailTemplateSettings, setemailTemplateSettings] = useState({})
  const [notificationSettings, setNotificationSettings] = useState({})
  const history = useHistory()
  const forceUpdate = useForceUpdate();


  useEffect(() => {

    getSystemSettings()
    getEmailSettings()
    getEmailTemplateSettings()
    getLocalisationSettings()
    getFooterSettings()
    getHeaderSettings()
    getDashboardSettings()
    getNotificationSettings()
  }, []);

  const getNotificationSettings = () => {
    settingsHTTPService.getNotificationSettings().then(data => {
      console.log(data.data[0])
      setNotificationSettings(data.data[0])
      forceUpdate()
    })
  }


  const getEmailTemplateSettings = () => {
    settingsHTTPService.getSystemSettings().then(data => {
      setSystemSettings(data.data[0])
      forceUpdate()
    })
  }

  const getEmailSettings = () => {
    settingsHTTPService.getEmailSettings().then(data => {
      setEmailSettings(data.data[0])
      forceUpdate()
    })
  }

  const getLocalisationSettings = () => {
    settingsHTTPService.getLocalisationSettings().then(data => {
      console.log("localisation")
      console.log(data.data[0])
      setLocalisationSettings(data.data[0])
      forceUpdate()
    })
  }
  const getFooterSettings = () => {
    settingsHTTPService.getFooterSettings().then(data => {
      setFooterSettings(data.data[0])
      console.log(data.data[0])
      forceUpdate()
    })
  }

  const getHeaderSettings = () => {
    settingsHTTPService.getHeaderSettings().then(data => {
      console.log(data.data[0])
      setHeaderSettings(data.data[0])
      forceUpdate()
    })
  }

  const getDashboardSettings = () => {
    settingsHTTPService.getDashboardSettings().then(data => {
      setDashboardSettings(data.data[0])
      console.log(data.data[0])
      forceUpdate()
    })
  }

  const getSystemSettings = () => {
    settingsHTTPService.getSystemSettings().then(data => {
      setSystemSettings(data.data[0])
      forceUpdate()
    })
  }


  const refreshComponent = () => {
    getSystemSettings()
    getEmailSettings()
    getEmailTemplateSettings()
    getLocalisationSettings()
    getFooterSettings()
    getHeaderSettings()
    getDashboardSettings()
    getNotificationSettings()
    forceUpdate()
  }

  const convertToYesNoValue = (value) => {
    if (value == "1") {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  const restoreSystemSettings = () => {
    settingsHTTPService.restoreSystemSettings(systemSettings.id).then(data => {
      getSystemSettings()
    })
  }

  const restoreDashboardSettings = () => {
    settingsHTTPService.restoreDashboardettings(dashboardSettings.id).then(data => {
      getDashboardSettings()
    })
  }

  const restoreHeaderSettings = () => {
    settingsHTTPService.restoreHeaderettings(headerSettings.id).then(data => {
      getHeaderSettings()
    })
  }

  const restoreFooterSettings = () => {
    settingsHTTPService.restoreFooterSettings(footerSettings.id).then(data => {
      getFooterSettings()
    })
  }


  return (
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

                <a href="#footer" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                  Footer
                </a>
                <a href="#notifications" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                  Notifications
                </a>
                <a href="#headerbar" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                  Header
                </a>
                <a href="#dashboard" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                  Dashboard
                </a>
                <a href="#about" data-toggle="tab" class="nav-item nav-link has-icon nav-link-faded">
                  Version
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
                    <label class="d-block mb-0">App Title</label>
                    <div class="small text-muted mb-3">{systemSettings.appName}</div>

                    <label class="d-block mb-0">Show logo</label>
                    <div class="small text-muted mb-3">{convertToYesNoValue(systemSettings.showLogo)}</div>

                    <label class="d-block mb-0">Entreprise Name</label>
                    <div class="small text-muted mb-3">{systemSettings.appName}</div>

                    <label class="d-block mb-0">Address</label>
                    <div class="small text-muted mb-3">{systemSettings.address}</div>

                    <label class="d-block mb-0">Email</label>
                    <div class="small text-muted mb-3">{systemSettings.email}</div>


                    <button class="btn btn-info" type="button" data-toggle="modal" data-target="#editSystemSettings">Edit</button>
                    <button onClick={restoreSystemSettings} class="btn btn-warning" type="button">Restore to default</button>
                  </div>
                </form>
                <div class="modal fade" id="editSystemSettings" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <EditSystemSettings />
                      </div>
                      <div class="modal-footer">
                        <button onClick={refreshComponent} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="localisation">
                <h6>Localisation Settings</h6><hr />

                <label class="d-block mb-0">Language</label>
                <div class="small text-muted mb-3">{localisationSettings.language}</div>
                <label class="d-block mb-0">Date format</label>
                <div class="small text-muted mb-3">{localisationSettings.dateFormat}</div>
                <label class="d-block mb-0">Currency</label>
                <div class="small text-muted mb-3">{localisationSettings.currency}</div>
                <label class="d-block mb-0">Currency symbol</label>
                <div class="small text-muted mb-3">{localisationSettings.currencySymbol}</div>
                <button class="btn btn-info" type="button" data-toggle="modal" data-target="#editLocalisationSettings">Edit</button>
                <button class="btn btn-warning" type="button">Restore to default</button>




                <div class="modal fade" id="editLocalisationSettings" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <EditLocalisationSettings />
                      </div>
                      <div class="modal-footer">
                        <button onClick={refreshComponent} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>



              </div>


              <div class="tab-pane" id="email">
                <h6>Email Settings</h6><hr />
                <label class="d-block mb-0">Email sent from address </label>
                <div class="small text-muted mb-3">{emailSettings.emailSentAddress}</div>
                <label class="d-block mb-0">SMTP server</label>
                <div class="small text-muted mb-3">{emailSettings.smtp}</div>

                <button class="btn btn-info" type="button" data-toggle="modal" data-target="#editEmailSettings">Edit</button>
                <button class="btn btn-warning" type="button">Restore to default</button>

                <div class="modal fade" id="editEmailSettings" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <EditEmailSettings />
                      </div>
                      <div class="modal-footer">
                        <button onClick={refreshComponent} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>

              </div>


              <div class="tab-pane" id="footer">
                <h6>Footer Settings</h6><hr />
                <label class="d-block mb-0">Show Footer</label>
                <div class="small text-muted mb-3">{convertToYesNoValue(footerSettings.enableFooter)}</div>

                <button class="btn btn-info" type="button" data-toggle="modal" data-target="#editFooterSettings">Edit</button>
                <button onClick={restoreFooterSettings} class="btn btn-warning" type="button">Restore to default</button>




                <div class="modal fade" id="editFooterSettings" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <EditFooterSettings />
                      </div>
                      <div class="modal-footer">
                        <button onClick={refreshComponent} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tab-pane" id="notifications">
                <h6>Notifications Settings</h6><hr />
                <label class="d-block mb-0">Show Notifications</label>
                <div class="small text-muted mb-3">{convertToYesNoValue(notificationSettings?.showNotification)}</div>

                <button class="btn btn-info" type="button" data-toggle="modal" data-target="#editNotificationsSettings">Edit</button>
                <button class="btn btn-warning" type="button">Restore to default</button>




                <div class="modal fade" id="editNotificationsSettings" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <EditNotificationsSettings />
                      </div>
                      <div class="modal-footer">
                        <button onClick={refreshComponent} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div class="tab-pane" id="about">
                <h6>About Settings</h6><hr />
                <label class="d-block mb-0">Version</label>
                <div class="small text-muted mb-3">1.0</div>


              </div>


              <div class="tab-pane" id="headerbar">
                <h6>Header Settings</h6><hr />
                <label class="d-block mb-0">Show search bar </label>
                <div class="small text-muted mb-3">{convertToYesNoValue(headerSettings.enbaleSearchBar)}</div>
                <label class="d-block mb-0">Show logo </label>
                <div class="small text-muted mb-3">{convertToYesNoValue(headerSettings.showLogo)}</div>

                <button class="btn btn-info" type="button" data-toggle="modal" data-target="#editHeaderettings">Edit</button>
                <button onClick={restoreHeaderSettings} class="btn btn-warning" type="button">Restore to default</button>


                <div class="modal fade" id="editHeaderettings" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <EditHeaderSettings />
                      </div>
                      <div class="modal-footer">
                        <button onClick={refreshComponent} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>

              </div>


              <div class="tab-pane" id="dashboard">
                <h6>Dahboard Settings</h6><hr />
                <label class="d-block mb-0">Show Summary</label>
                <div class="small text-muted mb-3">{convertToYesNoValue(dashboardSettings.showSummary)}</div>
                <label class="d-block mb-0">Show Calendar</label>
                <div class="small text-muted mb-3">{convertToYesNoValue(dashboardSettings.showCalendar)}</div>
                <label class="d-block mb-0">Show Charts</label>
                <div class="small text-muted mb-3">{convertToYesNoValue(dashboardSettings.showExpenseIncomeCharts)}</div>

                <button class="btn btn-info" type="button" data-toggle="modal" data-target="#editDahboardSettings">Edit</button>
                <button onClick={restoreDashboardSettings} class="btn btn-warning" type="button">Restore to default</button>

                <div class="modal fade" id="editDahboardSettings" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <EditDashboardSettings />
                      </div>
                      <div class="modal-footer">
                        <button type="button" onClick={refreshComponent} class="btn btn-secondary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Configuration.propTypes = {};

Configuration.defaultProps = {};

export default Configuration;
