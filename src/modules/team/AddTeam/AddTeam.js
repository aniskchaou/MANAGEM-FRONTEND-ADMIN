import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddTeam.css';
import teamHTTPService from '../../../main/services/teamHTTPService';
import { useForm } from 'react-hook-form';
import noteMessage from '../../../main/messages/noteMessage';
import showMessage from '../../../libraries/messages/messages';

const AddTeam = (props) => {
  const initialState = {
    name: '',
    minimum: '',
    maximum: '',
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [team, setTeam] = useState(initialState);

  const onSubmit = (data) => {
    teamHTTPService.createTeam(data)
      .then(() => {
        setTeam(initialState);
        showMessage('Confirmation', noteMessage.add, 'success');
        props.closeModal();
      })
      .catch((error) => {
        console.error("Error creating team:", error);
        showMessage('Error', 'Failed to create team', 'danger');
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeam((prevTeam) => ({ ...prevTeam, [name]: value }));
  };

  return (
    <div className="AddTeam">
      <form onSubmit={handleSubmit(onSubmit)} className="team-form">
        <div className="form-group">
          <label>Name <span className="text-danger">*</span></label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleInputChange}
            value={team.name}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Minimum <span className="text-danger">*</span></label>
          <input
            type="number"
            name="minimum"
            className="form-control"
            onChange={handleInputChange}
            value={team.minimum}
            {...register('minimum', { required: 'Minimum is required', min: { value: 1, message: 'Minimum must be at least 1' } })}
          />
          {errors.minimum && <p className="text-danger">{errors.minimum.message}</p>}
        </div>

        <div className="form-group">
          <label>Maximum <span className="text-danger">*</span></label>
          <input
            type="number"
            name="maximum"
            className="form-control"
            onChange={handleInputChange}
            value={team.maximum}
            {...register('maximum', { required: 'Maximum is required', min: { value: 1, message: 'Maximum must be at least 1' } })}
          />
          {errors.maximum && <p className="text-danger">{errors.maximum.message}</p>}
        </div>

        <button type="submit" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

AddTeam.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AddTeam;
