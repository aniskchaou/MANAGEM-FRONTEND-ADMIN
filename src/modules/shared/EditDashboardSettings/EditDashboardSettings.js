import PropTypes from 'prop-types';
import './EditDashboardSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditDashboardSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [dashboardSettings, setDashboardSettings] = useState({
    showSummary: '',
    showCalendar: '',
    showExpenseIncomeCharts: '',
  });

  useEffect(() => {
    getDashboardSettings();
  }, []);

  const getDashboardSettings = async () => {
    try {
      const { data } = await settingsHTTPService.getDashboardSettings();
      if (data.length > 0) {
        const settings = data[0];
        setDashboardSettings(settings);

        // Populate form fields dynamically
        Object.keys(settings).forEach((key) => setValue(key, settings[key]));
      }
    } catch (error) {
      console.error('Error fetching dashboard settings:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await settingsHTTPService.editDashboardSettings(dashboardSettings.id, data);
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
      getDashboardSettings(); // Refresh UI after save
    } catch (error) {
      console.error('Error updating dashboard settings:', error);
      showMessage('Error', 'Failed to update dashboard settings', 'danger');
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Show Summary */}
        <div className="form-group row">
          <label htmlFor="showSummary" className="col-4 col-form-label">
            Show Summary
          </label>
          <div className="col-8">
            <select
              {...register('showSummary', { required: 'This field is required' })}
              id="showSummary"
              name="showSummary"
              className="custom-select"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.showSummary && <p className="text-danger">{errors.showSummary.message}</p>}
          </div>
        </div>

        {/* Show Calendar */}
        <div className="form-group row">
          <label htmlFor="showCalendar" className="col-4 col-form-label">
            Show Calendar
          </label>
          <div className="col-8">
            <select
              {...register('showCalendar', { required: 'This field is required' })}
              id="showCalendar"
              name="showCalendar"
              className="custom-select"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.showCalendar && <p className="text-danger">{errors.showCalendar.message}</p>}
          </div>
        </div>

        {/* Show Charts */}
        <div className="form-group row">
          <label htmlFor="showExpenseIncomeCharts" className="col-4 col-form-label">
            Show Charts
          </label>
          <div className="col-8">
            <select
              {...register('showExpenseIncomeCharts', { required: 'This field is required' })}
              id="showExpenseIncomeCharts"
              name="showExpenseIncomeCharts"
              className="custom-select"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.showExpenseIncomeCharts && (
              <p className="text-danger">{errors.showExpenseIncomeCharts.message}</p>
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

export default EditDashboardSettings;
