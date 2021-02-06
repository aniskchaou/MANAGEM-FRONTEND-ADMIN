import './AddMessage.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import messageMessage from '../../../main/messages/messageMessage'
import messageValidation from '../../../main/validations/messageValidation'
import MessageTestService from '../../../main/mocks/MessageTestService';
import HTTPService from '../../../main/services/HTTPService';

const AddMessage = () => {
  const initialState = {
    title: "",
    destination: "",
    message: "",

  };

  const { register, handleSubmit, errors } = useForm()
  const [message, setMessage] = useState(initialState);

  const onSubmit = (data) => {
    //saveMessage(data)
    MessageTestService.create(data)
    setMessage(initialState)
    showMessage('Confirmation', messageMessage.add, 'success')
  }

  const saveMessage = (data) => {

    HTTPService.create(data)
      .then(response => {
        setMessage(initialState)
      })
      .catch(e => {
        console.log(e);
      });

  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setMessage({ ...message, [name]: value });
  };

  return (
    <div className="AddMessage">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group row">
          <label for="text1" class="col-4 col-form-label">Titre</label>
          <div class="col-8">
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={message.title} id="text1" name="title" type="text" class="form-control" />
            <div className="error text-danger">
              {errors.title && messageValidation.title}
              </div>
          </div>
        </div>


        <div class="form-group row">
          <label for="text" class="col-4 col-form-label">Destinataire</label>

          <div class="col-8">
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={message.destination} id="text" name="destination" type="text" class="form-control" />
            <div className="error text-danger">
              {errors.destination && messageValidation.destination}
            </div>
          </div>


        </div>

        <div class="form-group row">
          <label for="textarea" class="col-4 col-form-label">Message</label>
          <div class="col-8">
            <textarea ref={register({ required: true })} onChange={handleInputChange}
              value={message.message} id="textarea" name="message" cols="40" rows="5"
              class="form-control"></textarea>
            <div className="error text-danger">
              {errors.message && messageValidation.message}
              </div>
          </div>
        </div>


        <div class="form-group row">
          <div class="offset-4 col-8">
            <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
              <font   ><font   > Sauvegarder</font></font></button>
          </div>
        </div>


      </form>
    </div>
  )
};

AddMessage.propTypes = { };

AddMessage.defaultProps = { };

export default AddMessage;
