import './AddMessage.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import messageMessage from '../../../main/messages/messageMessage';
import messageValidation from '../../../main/validations/messageValidation';
import MessageTestService from '../../../main/mocks/MessageTestService';
import HTTPService from '../../../main/services/HTTPService';

const AddMessage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      destination: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await MessageTestService.create(data);
      showMessage('Confirmation', messageMessage.add, 'success');
      setValue('title', '');
      setValue('destination', '');
      setValue('message', '');
    } catch (error) {
      console.error('Error saving message:', error);
      showMessage('Error', 'Failed to save message', 'danger');
    }
  };

  return (
    <div className="AddMessage">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="form-group row">
          <label htmlFor="title" className="col-4 col-form-label">Title</label>
          <div className="col-8">
            <input
              {...register('title', { required: messageValidation.title })}
              id="title"
              name="title"
              type="text"
              className="form-control"
              placeholder="Enter title"
            />
            {errors.title && <p className="text-danger">{errors.title.message}</p>}
          </div>
        </div>

        {/* Destination Input */}
        <div className="form-group row">
          <label htmlFor="destination" className="col-4 col-form-label">Recipient</label>
          <div className="col-8">
            <input
              {...register('destination', { required: messageValidation.destination })}
              id="destination"
              name="destination"
              type="text"
              className="form-control"
              placeholder="Enter recipient"
            />
            {errors.destination && <p className="text-danger">{errors.destination.message}</p>}
          </div>
        </div>

        {/* Message Input */}
        <div className="form-group row">
          <label htmlFor="message" className="col-4 col-form-label">Message</label>
          <div className="col-8">
            <textarea
              {...register('message', { required: messageValidation.message })}
              id="message"
              name="message"
              cols="40"
              rows="5"
              className="form-control"
              placeholder="Enter your message"
            ></textarea>
            {errors.message && <p className="text-danger">{errors.message.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-group row">
          <div className="offset-4 col-8">
            <button type="submit" className="btn btn-success">
              <i className="fa fa-check"></i> Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMessage;
