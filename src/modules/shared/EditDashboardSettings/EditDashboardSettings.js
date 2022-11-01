import PropTypes from 'prop-types';
import './EditDashboardSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';


const EditDashboardSettings = () => {
  const { register, handleSubmit, errors } = useForm()
  const [dashboardSettings, setDashboardSettings] = useState();

  useEffect(() => {
    getDashboardSettings()
  }, [])


  const handleInputChange = event => {
    const { name, value } = event.target;
    setDashboardSettings({ ...dashboardSettings, [name]: value });
  };

  const getDashboardSettings = () => {
    settingsHTTPService.getDashboardSettings().then(data => {
      console.log(data.data[0])
      setDashboardSettings(data.data[0])

    })
  }

  const onSubmit = (data) => {
    settingsHTTPService.editDashboardSettings(dashboardSettings.id, data).then(data => {
      console.log(data)
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success')
    })
  }


  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show Summary</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={dashboardSettings?.showSummary} ref={register({ required: true })}
              id="select2" name="showSummary" class="custom-select">

              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show Calendar</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={dashboardSettings?.showCalendar} ref={register({ required: true })}
              id="select2" name="showCalendar" class="custom-select">

              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show Charts</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={dashboardSettings?.showExpenseIncomeCharts} ref={register({ required: true })}
              id="select2" name="showExpenseIncomeCharts" class="custom-select">

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
};

EditDashboardSettings.propTypes = {};

EditDashboardSettings.defaultProps = {};

export default EditDashboardSettings;