import './AddClient.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import clientMessage from '../../../main/messages/clientMessage'
import clientValidation from '../../../main/validations/clientValidation'
import ClientTestService from '../../../main/mocks/ClientTestService';
import HTTPService from '../../../main/services/HTTPService';
import clientHTTPService from '../../../main/services/clientHTTPService';


const AddClient = () => {
  const initialState = {
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    email: "",
    company: ""

  };

  const { register, handleSubmit, errors } = useForm()
  const [client, setClient] = useState(initialState);

  const onSubmit = (data) => {
    //saveClient(data)
    //ClientTestService.create(data)
    clientHTTPService.createClient(data).then(data => {
      setClient(initialState)
      showMessage('Confirmation', clientMessage.add, 'success')
    })

  }

  const saveClient = (data) => {

    HTTPService.create(data)
      .then(response => {
        setClient(initialState)
      })
      .catch(e => {
        console.log(e);
      });

  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  return (
    <div className="AddClient">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">

          <div class="form-group col-md-12">
            <label>Entreprise</label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.company}
              type="text" name="company" class="form-control" />
            <div className="error text-danger">
              {errors.company && clientValidation.company}
            </div>
          </div>


          <div class="form-group col-md-6">
            <input type="hidden" name="groups" value="4" />
            <label>Nom<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.first_name}
              type="text" name="first_name" class="form-control" required="" />
            <div className="error text-danger">
              {errors.first_name && clientValidation.first_name}
            </div>
          </div>


          <div class="form-group col-md-6">
            <label>Prénom<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.last_name}
              type="text" name="last_name" class="form-control" />
            <div className="error text-danger">
              {errors.last_name && clientValidation.last_name}
            </div>
          </div>

          <div class="form-group col-md-6">
            <label>Email<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.email}
              type="email" name="email" class="form-control" />
            <div className="error text-danger">
              {errors.email && clientValidation.email}
            </div>
          </div>

          <div class="form-group col-md-6">
            <label>Mobile</label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.phone}
              type="text" name="phone" class="form-control" />
            <div className="error text-danger">
              {errors.phone && clientValidation.phone}
            </div>
          </div>

          <div class="form-group col-md-6">
            <label>Mot de passe<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.password}
              type="text" name="password" class="form-control" />
            <div className="error text-danger">
              {errors.password && clientValidation.password}
            </div>
          </div>

        </div>
        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button>

      </form>
    </div>
  )
};

AddClient.propTypes = {};

AddClient.defaultProps = {};

export default AddClient;
