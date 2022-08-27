import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddTeam.css';
import teamHTTPService from '../../main/services/teamHTTPService';
import showMessage from '../../libraries/messages/messages';
import noteMessage from '../../main/messages/noteMessage';
import { useForm } from 'react-hook-form';

const AddTeam = () => {
  const initialState = {

    name: "",
    minimum: "",
    maximum: "",

  };

  const { register, handleSubmit, errors } = useForm()
  const [team, setTeam] = useState(initialState);

  const onSubmit = (data) => {
    //saveNote(data)
    // NoteTestService.create(data)
    teamHTTPService.createTeam(data).then(data => {
      setTeam(initialState)
      showMessage('Confirmation', noteMessage.add, 'success')
    })

  }



  const handleInputChange = event => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  };


  return (
    <div className="AddTeam">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">

          <div class="form-group col-md-12">
            <label>name<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.name}
              type="text" name="name" class="form-control" />

            <label>minum<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.minimum}
              type="text" name="minimum" class="form-control" />

            <label>maximum<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.maximum}
              type="text" name="maximum" class="form-control" />




          </div>

        </div>
        <button type="submit" id="save-form" className="btn btn-success">
          <i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button></form>
    </div>
  )
};

AddTeam.propTypes = {};

AddTeam.defaultProps = {};

export default AddTeam;
