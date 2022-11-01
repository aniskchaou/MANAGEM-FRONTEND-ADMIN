
import PropTypes from 'prop-types';
import './EditNotificationsSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditNotificationsSettings = () => {


  const { register, handleSubmit, errors } = useForm()
  const [notificationsSettings, setNotificationsSettings] = useState();

  useEffect(() => {
    getNotificationsSettings()
  }, [])


  const handleInputChange = event => {
    const { name, value } = event.target;
    setNotificationsSettings({ ...notificationsSettings, [name]: value });
  };

  const getNotificationsSettings = () => {
    settingsHTTPService.getNotificationSettings().then(data => {
      console.log(data.data[0])
      setNotificationsSettings(data.data[0])

    })
  }

  const onSubmit = (data) => {
    settingsHTTPService.editNotificationsSettings(notificationsSettings.id, data).then(data => {
      console.log(data)
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success')
    })
  }
  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>


        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show Notifications</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={notificationsSettings?.showNotification} ref={register({ required: true })}
              id="select2" name="showNotification" class="custom-select">

              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
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

EditNotificationsSettings.propTypes = {};

EditNotificationsSettings.defaultProps = {};

export default EditNotificationsSettings;