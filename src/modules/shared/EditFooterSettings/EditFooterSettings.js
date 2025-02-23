import PropTypes from 'prop-types';
import './EditFooterSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditFooterSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [footerSettings, setFooterSettings] = useState({
    enableFooter: '',
    enableCopyRightText: '',
  });

  useEffect(() => {
    getFooterSettings();
  }, []);

  const getFooterSettings = async () => {
    try {
      const { data } = await settingsHTTPService.getFooterSettings();
      if (data.length > 0) {
        const settings = data[0];
        setFooterSettings(settings);

        // Populate form fields with API data
        Object.keys(settings).forEach((key) => setValue(key, settings[key]));
      }
    } catch (error) {
      console.error('Error fetching footer settings:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await settingsHTTPService.editFooterSettings(footerSettings.id, data);
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
      getFooterSettings(); // Refresh UI after update
    } catch (error) {
      console.error('Error updating footer settings:', error);
      showMessage('Error', 'Failed to update footer settings', 'danger');
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Show Footer */}
        <div className="form-group row">
          <label htmlFor="enableFooter" className="col-4 col-form-label">
            Show Footer
          </label>
          <div className="col-8">
            <select
              {...register('enableFooter', { required: 'Please select an option' })}
              id="enableFooter"
              name="enableFooter"
              className="custom-select"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.enableFooter && <p className="text-danger">{errors.enableFooter.message}</p>}
          </div>
        </div>

        {/* Show Copyright */}
        <div className="form-group row">
          <label htmlFor="enableCopyRightText" className="col-4 col-form-label">
            Show Copyright
          </label>
          <div className="col-8">
            <select
              {...register('enableCopyRightText', { required: 'Please select an option' })}
              id="enableCopyRightText"
              name="enableCopyRightText"
              className="custom-select"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.enableCopyRightText && <p className="text-danger">{errors.enableCopyRightText.message}</p>}
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

export default EditFooterSettings;
