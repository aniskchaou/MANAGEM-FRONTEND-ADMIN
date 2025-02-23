import './AddClient.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';
import clientValidation from '../../../main/validations/clientValidation';
import clientHTTPService from '../../../main/services/clientHTTPService';

const AddClient = (props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    clientHTTPService.createClient(data)
      .then(() => {
        showMessage('Confirmation', clientMessage.add, 'success');
        reset(); // Reset form after submission
        props.closeModal();
      })
      .catch(error => {
        console.error("Error adding client:", error);
        showMessage('Error', 'Failed to add client', 'danger');
      });
  };

  return (
    <div className="AddClient">
      <form onSubmit={handleSubmit(onSubmit)} className="client-form">
        <div className="row">

          <div className="form-group col-md-12">
            <label>Company</label>
            <input
              type="text"
              name="company"
              className="form-control"
              {...register('company', { required: clientValidation.company })}
            />
            {errors.company && <p className="text-danger">{errors.company.message}</p>}
          </div>

          <div className="form-group col-md-6">
            <input type="hidden" name="groups" value="4" />
            <label>First Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              {...register('first_name', { required: clientValidation.first_name })}
            />
            {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
          </div>

          <div className="form-group col-md-6">
            <label>Last Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              {...register('last_name', { required: clientValidation.last_name })}
            />
            {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
          </div>

          <div className="form-group col-md-6">
            <label>Email <span className="text-danger">*</span></label>
            <input
              type="email"
              name="email"
              className="form-control"
              {...register('email', { required: clientValidation.email, pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="form-group col-md-6">
            <label>Telephone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              {...register('phone', { required: clientValidation.phone, pattern: { value: /^[0-9]+$/, message: "Invalid phone number" } })}
            />
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
          </div>

        </div>

        <button type="submit" id="save-form" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

export default AddClient;
