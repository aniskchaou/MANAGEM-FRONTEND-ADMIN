import PropTypes from 'prop-types';
import './EditNotificationsSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditNotificationsSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [notificationsSettings, setNotificationsSettings] = useState({
    showNotification: '',
  });

  useEffect(() => {
    getNotificationsSettings();
  }, []);

  const getNotificationsSettings = async () => {
    try {
      const { data } = await settingsHTTPService.getNotificationSettings();
      if (data.length > 0) {
        const settings = data[0];
        setNotificationsSettings(settings);

        // Populate form with existing settings
        Object.keys(settings).forEach((key) => setValue(key, settings[key]));
      }
    } catch (error) {
      console.error('Error fetching notification settings:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await settingsHTTPService.editNotificationsSettings(notificationsSettings.id, data);
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      showMessage('Error', 'Failed to update notification settings', 'danger');
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Show Notifications */}
        <div className="form-group row">
          <label htmlFor="showNotification" className="col-4 col-form-label">
            Show Notifications
          </label>
          <div className="col-8">
            <select
              {...register('showNotification', { required: 'Please select an option' })}
              id="showNotification"
              name="showNotification"
              className="custom-select"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.showNotification && (
              <p className="text-danger">{errors.showNotification.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-group row">
          <div className="offset-4 col-8">
            <button type="submit" className="btn btn-primary">
              <i className="far fa-save"></i> Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNotificationsSettings;
