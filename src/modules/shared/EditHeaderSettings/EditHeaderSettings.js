import PropTypes from 'prop-types';
import './EditHeaderSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditHeaderSettings = () => {

  const { register, handleSubmit, errors } = useForm()
  const [headerSettings, setHeaderSettings] = useState();

  useEffect(() => {
    getHeaderSettings()
  }, [])
  const handleInputChange = event => {
    const { name, value } = event.target;
    setHeaderSettings({ ...headerSettings, [name]: value });
  };

  const getHeaderSettings = () => {
    settingsHTTPService.getHeaderSettings().then(data => {
      setHeaderSettings(data.data[0])

    })
  }

  const onSubmit = (data) => {
    settingsHTTPService.editHeaderSettings(headerSettings.id, data).then(data => {
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success')
      getHeaderSettings()
    })
  }


  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show search Bar</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={headerSettings?.enbaleSearchBar} ref={register({ required: true })}
              id="select2" name="enbaleSearchBar" class="custom-select">

              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show logo</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={headerSettings?.showLogo} ref={register({ required: true })}
              id="select2" name="showLogo" class="custom-select">

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

EditHeaderSettings.propTypes = {};

EditHeaderSettings.defaultProps = {};

export default EditHeaderSettings;