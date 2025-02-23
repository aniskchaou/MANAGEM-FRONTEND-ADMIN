import PropTypes from 'prop-types';
import './EditLocalisationSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditLocalisationSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [localisationSettings, setLocalisationSettings] = useState({
    language: '',
    currency: '',
    currencySymbol: '',
    dateFormat: '',
  });

  useEffect(() => {
    getLocalisationSettings();
  }, []);

  const getLocalisationSettings = async () => {
    try {
      const { data } = await settingsHTTPService.getLocalisationSettings();
      if (data.length > 0) {
        const settings = data[0];
        setLocalisationSettings(settings);

        // Populate form with existing settings
        Object.keys(settings).forEach((key) => setValue(key, settings[key]));
      }
    } catch (error) {
      console.error('Error fetching localisation settings:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await settingsHTTPService.editLocalisationSettings(localisationSettings.id, data);
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
    } catch (error) {
      console.error('Error updating localisation settings:', error);
      showMessage('Error', 'Failed to update localisation settings', 'danger');
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Language */}
        <div className="form-group row">
          <label htmlFor="language" className="col-4 col-form-label">
            Language
          </label>
          <div className="col-8">
            <select
              {...register('language', { required: 'Please select a language' })}
              id="language"
              name="language"
              className="custom-select"
            >
              <option value="English">English</option>
            </select>
            {errors.language && <p className="text-danger">{errors.language.message}</p>}
          </div>
        </div>

        {/* Currency */}
        <div className="form-group row">
          <label htmlFor="currency" className="col-4 col-form-label">
            Currency
          </label>
          <div className="col-8">
            <select
              {...register('currency', { required: 'Please select a currency' })}
              id="currency"
              name="currency"
              className="custom-select"
            >
              <option value="USD">USD</option>
            </select>
            {errors.currency && <p className="text-danger">{errors.currency.message}</p>}
          </div>
        </div>

        {/* Currency Symbol */}
        <div className="form-group row">
          <label htmlFor="currencySymbol" className="col-4 col-form-label">
            Currency Symbol
          </label>
          <div className="col-8">
            <select
              {...register('currencySymbol', { required: 'Please select a currency symbol' })}
              id="currencySymbol"
              name="currencySymbol"
              className="custom-select"
            >
              <option value="$">$</option>
            </select>
            {errors.currencySymbol && <p className="text-danger">{errors.currencySymbol.message}</p>}
          </div>
        </div>

        {/* Date Format */}
        <div className="form-group row">
          <label htmlFor="dateFormat" className="col-4 col-form-label">
            Date Format
          </label>
          <div className="col-8">
            <select
              {...register('dateFormat', { required: 'Please select a date format' })}
              id="dateFormat"
              name="dateFormat"
              className="custom-select"
            >
              <option value="dd/mm/yyyy">dd/mm/yyyy</option>
              <option value="dd-mm-yyyy">dd-mm-yyyy</option>
            </select>
            {errors.dateFormat && <p className="text-danger">{errors.dateFormat.message}</p>}
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

export default EditLocalisationSettings;
