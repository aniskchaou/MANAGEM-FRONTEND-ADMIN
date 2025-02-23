import PropTypes from 'prop-types';
import './EditSystemSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditSystemSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [systemSettings, setSystemSettings] = useState({
    appName: '',
    showLogo: '',
    email: '',
    address: '',
    entrepriseName: '',
  });

  useEffect(() => {
    getSystemSettings();
  }, []);

  const getSystemSettings = async () => {
    try {
      const { data } = await settingsHTTPService.getSystemSettings();
      if (data.length > 0) {
        const settings = data[0];
        setSystemSettings(settings);

        // Populate form with existing settings
        Object.keys(settings).forEach((key) => setValue(key, settings[key]));
      }
    } catch (error) {
      console.error('Error fetching system settings:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await settingsHTTPService.editSystemSettings(systemSettings.id, data);
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
    } catch (error) {
      console.error('Error updating settings:', error);
      showMessage('Error', 'Failed to update settings', 'danger');
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Application Name */}
        <div className="form-group row">
          <label htmlFor="appName" className="col-4 col-form-label">
            Application Name
          </label>
          <div className="col-8">
            <input
              {...register('appName', { required: 'Application name is required' })}
              id="appName"
              name="appName"
              type="text"
              className="form-control"
            />
            {errors.appName && <p className="text-danger">{errors.appName.message}</p>}
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

        {/* Email */}
        <div className="form-group row">
          <label htmlFor="email" className="col-4 col-form-label">
            Email
          </label>
          <div className="col-8">
            <input
              {...register('email', { required: 'Email is required' })}
              id="email"
              name="email"
              type="email"
              className="form-control"
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
        </div>

        {/* Address */}
        <div className="form-group row">
          <label htmlFor="address" className="col-4 col-form-label">
            Address
          </label>
          <div className="col-8">
            <input
              {...register('address', { required: 'Address is required' })}
              id="address"
              name="address"
              type="text"
              className="form-control"
            />
            {errors.address && <p className="text-danger">{errors.address.message}</p>}
          </div>
        </div>

        {/* Entreprise Name */}
        <div className="form-group row">
          <label htmlFor="entrepriseName" className="col-4 col-form-label">
            Enterprise Name
          </label>
          <div className="col-8">
            <input
              {...register('entrepriseName', { required: 'Enterprise name is required' })}
              id="entrepriseName"
              name="entrepriseName"
              type="text"
              className="form-control"
            />
            {errors.entrepriseName && <p className="text-danger">{errors.entrepriseName.message}</p>}
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

export default EditSystemSettings;
