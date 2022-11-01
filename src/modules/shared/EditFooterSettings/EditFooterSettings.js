import PropTypes from 'prop-types';
import './EditFooterSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

const EditFooterSettings = () => {

  const { register, handleSubmit, errors } = useForm()
  const [footerSettings, setFooterSettings] = useState();

  useEffect(() => {
    getFooterSettings()
  }, [])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFooterSettings({ ...footerSettings, [name]: value });
  };

  const getFooterSettings = () => {
    settingsHTTPService.getFooterSettings().then(data => {
      setFooterSettings(data.data[0])

    })
  }

  const onSubmit = (data) => {
    settingsHTTPService.editFooterSettings(footerSettings.id, data).then(data => {
      console.log(data)
      showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success')
    })
  }
  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show footer</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={footerSettings?.enableFooter} ref={register({ required: true })}
              id="select2" name="enableFooter" class="custom-select">

              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Show copy right</label>
          <div class="col-8">
            <select onChange={handleInputChange} value={footerSettings?.enableCopyRightTest} ref={register({ required: true })}
              id="select2" name="enableCopyRightTest" class="custom-select">

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

EditFooterSettings.propTypes = {};

EditFooterSettings.defaultProps = {};

export default EditFooterSettings;