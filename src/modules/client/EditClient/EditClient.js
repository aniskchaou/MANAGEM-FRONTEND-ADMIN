import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditClient.css';
import { useForm } from 'react-hook-form';
import clientHTTPService from '../../../main/services/clientHTTPService';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';

const EditClient = (props) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    defaultValues: props.client, // Preload values
  });

  const [client, setClient] = useState(props.client);

  useEffect(() => {
    setClient(props.client);
    reset(props.client); // Reset form when props change
  }, [props.client, reset]);

  const onSubmit = (data) => {
    clientHTTPService.editClient(client.id, data)
      .then(() => {
        showMessage('Confirmation', clientMessage.edit, 'success');
        props.closeModal();
      })
      .catch(error => {
        console.error("Error updating client:", error);
        showMessage('Error', 'Failed to update client', 'danger');
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClient((prevClient) => ({ ...prevClient, [name]: value }));
    setValue(name, value); // Update form state
  };

  return (
    <div className="EditClient">
      <form onSubmit={handleSubmit(onSubmit)} className="client-form">
        <div className="row">

          <div className="form-group col-md-12">
            <label>Company</label>
            <input
              type="text"
              name="company"
              className="form-control"
              {...register('company', { required: 'Company is required' })}
              onChange={handleInputChange}
            />
            {errors.company && <p className="text-danger">{errors.company.message}</p>}
          </div>

          <div className="form-group col-md-6">
            <label>First Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              {...register('first_name', { required: 'First name is required' })}
              onChange={handleInputChange}
            />
            {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
          </div>

          <div className="form-group col-md-6">
            <label>Last Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              {...register('last_name', { required: 'Last name is required' })}
              onChange={handleInputChange}
            />
            {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
          </div>

          <div className="form-group col-md-6">
            <label>Email <span className="text-danger">*</span></label>
            <input
              type="email"
              name="email"
              className="form-control"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
              })}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="form-group col-md-6">
            <label>Telephone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: { value: /^[0-9]+$/, message: 'Invalid phone number' }
              })}
              onChange={handleInputChange}
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

export default EditClient;
