import './AddUser.css';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import userMessage from '../../../main/messages/userMessage';
import userValidation from '../../../main/validations/userValidation';
import userHTTPService from '../../../main/services/userHTTPService';

const AddUser = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      groups: '',
    },
  });

  const closeButtonAdd = useRef(null);

  const onSubmit = async (data) => {
    try {
      await userHTTPService.createUser(data);
      showMessage('Confirmation', userMessage.add, 'success');

      // Reset form fields
      setValue('firstname', '');
      setValue('lastname', '');
      setValue('email', '');
      setValue('phone', '');
      setValue('groups', '');

      // Close modal
      closeModal();
    } catch (error) {
      console.error('Error adding user:', error);
      showMessage('Error', 'Failed to add user', 'danger');
    }
  };

  return (
    <div className="AddUser">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* First Name */}
          <div className="form-group col-md-6">
            <label>First Name <span className="text-danger">*</span></label>
            <input
              {...register('firstname', { required: userValidation.first_name })}
              type="text"
              className="form-control"
              placeholder="Enter first name"
            />
            {errors.firstname && <p className="text-danger">{errors.firstname.message}</p>}
          </div>

          {/* Last Name */}
          <div className="form-group col-md-6">
            <label>Last Name <span className="text-danger">*</span></label>
            <input
              {...register('lastname', { required: userValidation.last_name })}
              type="text"
              className="form-control"
              placeholder="Enter last name"
            />
            {errors.lastname && <p className="text-danger">{errors.lastname.message}</p>}
          </div>

          {/* Email */}
          <div className="form-group col-md-6">
            <label>Email <span className="text-danger">*</span></label>
            <input
              {...register('email', { required: userValidation.email })}
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="form-group col-md-6">
            <label>Phone</label>
            <input
              {...register('phone', { required: userValidation.phone })}
              type="tel"
              className="form-control"
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </div>

          {/* Role Selection */}
          <div className="form-group col-md-6">
            <label>Role <span className="text-danger">*</span></label>
            <select
              {...register('groups', { required: userValidation.groups })}
              className="form-control"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>
            {errors.groups && <p className="text-danger">{errors.groups.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

export default AddUser;
