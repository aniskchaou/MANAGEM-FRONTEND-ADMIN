import PropTypes from 'prop-types';
import './EditEmailSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';

const EditEmailSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [emailSettings, setEmailSettings] = useState({
    smtp: '',
    emailSentAddress: '',
  });

  useEffect(() => {
    getEmailSettings();
  }, []);

  const getEmailSettings = async () => {
    try {
      const { data } = await settingsHTTPService.getEmailSettings();
      if (data.length > 0) {
        const settings = data[0];
        setEmailSettings(settings);

        // Populate form fields with API data
        Object.keys(settings).forEach((key) => setValue(key, settings[key]));
      }
    } catch (error) {
      console.error('Error fetching email settings:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await settingsHTTPService.editEmailSettings(emailSettings.id, data);
      showMessage('Confirmation', 'activityMessage.edit', 'success');
      getEmailSettings(); // Refresh UI after update
    } catch (error) {
      console.error('Error updating email settings:', error);
      showMessage('Error', 'Failed to update email settings', 'danger');
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* SMTP Input */}
        <div className="form-group row">
          <label htmlFor="smtp" className="col-4 col-form-label">
            SMTP
          </label>
          <div className="col-8">
            <input
              {...register('smtp', { required: 'SMTP is required' })}
              id="smtp"
              name="smtp"
              type="text"
              className="form-control"
            />
            {errors.smtp && <p className="text-danger">{errors.smtp.message}</p>}
          </div>
        </div>

        {/* Email Address Input */}
        <div className="form-group row">
          <label htmlFor="emailSentAddress" className="col-4 col-form-label">
            Email Address
          </label>
          <div className="col-8">
            <input
              {...register('emailSentAddress', {
                required: 'Email address is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format',
                },
              })}
              id="emailSentAddress"
              name="emailSentAddress"
              type="text"
              className="form-control"
            />
            {errors.emailSentAddress && (
              <p className="text-danger">{errors.emailSentAddress.message}</p>
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

export default EditEmailSettings;
