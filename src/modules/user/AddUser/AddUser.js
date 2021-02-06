import './AddUser.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import userMessage from '../../../main/messages/userMessage'
import userValidation from '../../../main/validations/userValidation'
import UserTestService from '../../../main/mocks/UserTestService';
import HTTPService from '../../../main/services/HTTPService';


const AddUser = () => {

  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    groups: ""
  };

  const { register, handleSubmit, errors } = useForm()
  const [user, setUser] = useState(initialState);

  const onSubmit = (data) => {
    //saveUser(data)
    UserTestService.create(data)
    setUser(initialState)
    showMessage('Confirmation', userMessage.add, 'success')
  }

  const saveUser = (data) => {

    HTTPService.create(data)
      .then(response => {
        setUser(initialState)
      })
      .catch(e => {
        console.log(e);
      });

  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="AddUser">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
        
          <div className="form-group col-md-6">
            <label>Nom<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.first_name} type="text" name="first_name" className="form-control" required="" />
            <div className="error text-danger">
              {errors.first_name && userValidation.first_name}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Prénom<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.last_name} type="text" name="last_name" className="form-control" />
            <div className="error text-danger">
              {errors.last_name && userValidation.last_name}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Email<span className="text-danger">*</span> <i className="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="This email will not be updated latter."></i></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.email} type="email" name="email" className="form-control" />
            <div className="error text-danger">
              {errors.email && userValidation.email}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Mobile</label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.phone} type="text" name="phone" className="form-control" />
            <div className="error text-danger">
              {errors.phone && userValidation.phone}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Mot de passe<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.password} type="password" name="password" className="form-control" />
            <div className="error text-danger">
              {errors.password && userValidation.password}
            </div>
          </div>


          <div className="form-group col-md-6">
            <label>Role<span className="text-danger">*</span> <i className="fas fa-question-circle"
              data-toggle="tooltip" data-placement="right" title=""
              data-original-title="Select user role like admin or team member."></i></label>

            <select ref={register({ required: true })} onChange={handleInputChange}
              value={user.groups} name="groups" className="form-control select2 select2-hidden-accessible"
              tabindex="-1" aria-hidden="true">
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>
            <div className="error text-danger">
              {errors.groups && userValidation.groups}
            </div>
          </div>



        </div>

        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button>
      </form>
    </div>
  )
};

AddUser.propTypes = {};

AddUser.defaultProps = {};

export default AddUser;
