import PropTypes from 'prop-types';
import './EditEmailSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';

const EditEmailSettings = () => {
  const { register, handleSubmit, errors } = useForm()
  const [emailSettings, setEmailSettings] = useState();

  useEffect(() => {
    getEmailSettings()
  }, [])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmailSettings({ ...emailSettings, [name]: value });
  };

  const getEmailSettings = () => {
    settingsHTTPService.getEmailSettings().then(data => {
      console.log(data.data[0])
      setEmailSettings(data.data[0])

    })
  }

  const onSubmit = (data) => {
    settingsHTTPService.editEmailSettings(emailSettings.id, data).then(data => {
      console.log(data)
      showMessage('Confirmation', 'activityMessage.edit', 'success')
    })
  }
  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">SMTP</label>
          <div class="col-8">

            <input onChange={handleInputChange} value={emailSettings?.smtp} ref={register({ required: true })}
              id="text" name="smtp" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-group row">
          <label for="select2" class="col-4 col-form-label">Email address</label>
          <div class="col-8">
            <input onChange={handleInputChange} value={emailSettings?.emailSentAddress} ref={register({ required: true })}
              id="text" name="emailSentAddress" type="text" class="form-control" />
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

EditEmailSettings.propTypes = {};

EditEmailSettings.defaultProps = {};

export default EditEmailSettings;