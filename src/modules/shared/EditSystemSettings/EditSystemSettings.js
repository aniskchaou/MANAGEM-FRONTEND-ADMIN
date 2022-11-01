import PropTypes from 'prop-types';
import './EditSystemSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditSystemSettings = () => {
  const { register, handleSubmit, errors } = useForm()
  const [systemSettings, setSystemSettings] = useState();

  useEffect(() => {
    getSystemSettings()
  }, [])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSystemSettings({ ...systemSettings, [name]: value });
  };

  const getSystemSettings = () => {
    settingsHTTPService.getSystemSettings().then(data => {
      setSystemSettings(data.data[0])
      console.log(data.data[0])
    })
  }

  const onSubmit = (data) => {

    settingsHTTPService.editSystemSettings(systemSettings.id, data).then(data => {

      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success')
    })
  }
  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Application Name</label>
          <div class="col-8">
            <input onChange={handleInputChange} value={systemSettings?.appName} ref={register({ required: true })}
              id="text" name="appName" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show Logo</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={systemSettings?.showLogo} ref={register({ required: true })}
              id="select2" name="showLogo" class="custom-select">

              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Email</label>
          <div class="col-8">
            <input onChange={handleInputChange} value={systemSettings?.email} ref={register({ required: true })}
              id="text" name="email" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Address</label>
          <div class="col-8">
            <input onChange={handleInputChange} value={systemSettings?.address} ref={register({ required: true })}
              id="text" name="address" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Entreprise Name</label>
          <div class="col-8">
            <input onChange={handleInputChange} value={systemSettings?.entrepriseName} ref={register({ required: true })}
              id="text" name="entrepriseName" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-group row">
          <div class="offset-4 col-8">
            <button name="submit" type="submit" class="btn btn-primary"><i class="far fa-save"></i>
              Save</button>
          </div>
        </div>


      </form>
    </div>
  )
}

EditSystemSettings.propTypes = {};

EditSystemSettings.defaultProps = {};

export default EditSystemSettings;