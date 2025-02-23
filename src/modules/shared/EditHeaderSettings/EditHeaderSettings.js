import PropTypes from 'prop-types';
import './EditHeaderSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditHeaderSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [headerSettings, setHeaderSettings] = useState({
    enableSearchBar: '',
    showLogo: '',
  });

  useEffect(() => {
    getHeaderSettings();
  }, []);

  const getHeaderSettings = async () => {
    try {
      const { data } = await settingsHTTPService.getHeaderSettings();
      if (data.length > 0) {
        const settings = data[0];
        setHeaderSettings(settings);

        // Populate form fields with API data
        Object.keys(settings).forEach((key) => setValue(key, settings[key]));
      }
    } catch (error) {
      console.error('Error fetching header settings:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await settingsHTTPService.editHeaderSettings(headerSettings.id, data);
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
      getHeaderSettings(); // Refresh UI after update
    } catch (error) {
      console.error('Error updating header settings:', error);
      showMessage('Error', 'Failed to update header settings', 'danger');
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Show Search Bar */}
        <div className="form-group row">
          <label htmlFor="enableSearchBar" className="col-4 col-form-label">
            Show Search Bar
          </label>
          <div className="col-8">
            <select
              {...register('enableSearchBar', { required: 'Please select an option' })}
              id="enableSearchBar"
              name="enableSearchBar"
              className="custom-select"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.enableSearchBar && <p className="text-danger">{errors.enableSearchBar.message}</p>}
          </div>
        </div>

        {/* Show Logo */}
        <div className="form-group row">
          <label htmlFor="showLogo" className="col-4 col-form-label">
            Show Logo
          </label>
          <div className="col-8">
            <select
              {...register('showLogo', { required: 'Please select an option' })}
              id="showLogo"
              name="showLogo"
              className="custom-select"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.showLogo && <p className="text-danger">{errors.showLogo.message}</p>}
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

export default EditHeaderSettings;
