import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditTeam.css';
import { useForm } from 'react-hook-form';
import teamHTTPService from '../../../main/services/teamHTTPService';
import noteMessage from '../../../main/messages/noteMessage';
import showMessage from '../../../libraries/messages/messages';

const EditTeam = (props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [team, setTeam] = useState(props.team || {});

  useEffect(() => {
    setTeam(props.team);
    setValue('name', props.team.name);
    setValue('minimum', props.team.minimum);
    setValue('maximum', props.team.maximum);
  }, [props.team, setValue]);

  const onSubmit = (data) => {
    teamHTTPService.editTeam(props.team.id, data)
      .then(() => {
        showMessage('Confirmation', noteMessage.edit, 'success');
        props.closeModal();
      })
      .catch((error) => {
        console.error("Error editing team:", error);
        showMessage('Error', 'Failed to edit team', 'danger');
      });
  };

  return (
    <div className="EditTeam">
      <form onSubmit={handleSubmit(onSubmit)} className="team-form">
        <div className="form-group">
          <label>Name <span className="text-danger">*</span></label>
          <input
            type="text"
            name="name"
            className="form-control"
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

EditTeam.propTypes = {
  team: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditTeam;
