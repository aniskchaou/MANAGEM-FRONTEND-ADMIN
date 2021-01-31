import React from 'react';
import PropTypes from 'prop-types';
import './AddUser.css';

const AddUser = () => (
  <div className="AddUser">
    <form method="POST" className="">
      <div className="row">
        
        <div className="form-group col-md-6">
          <label>Nom<span className="text-danger">*</span></label>
          <input type="text" name="first_name" className="form-control" required="" />
        </div>

        <div className="form-group col-md-6">
          <label>Prénom<span className="text-danger">*</span></label>
          <input type="text" name="last_name" className="form-control" />
        </div>

        <div className="form-group col-md-6">
          <label>Email<span className="text-danger">*</span> <i className="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="This email will not be updated latter."></i></label>
          <input type="email" name="email" className="form-control" />
        </div>

        <div className="form-group col-md-6">
          <label>Mobile</label>
          <input type="text" name="phone" className="form-control" />
        </div>

        <div className="form-group col-md-6">
          <label>Mot de passe<span className="text-danger">*</span></label>
          <input type="text" name="password" className="form-control" />
        </div>


        <div className="form-group col-md-6">
          <label>Role<span className="text-danger">*</span> <i className="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="Select user role like admin or team member."></i></label>
          <select name="groups" className="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
            <option value="1">Admin</option>
            <option value="2">Members</option>
          </select>
        </div>



      </div>

      <button type="button" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
        <font   ><font   > Sauvegarder</font></font></button>
    </form>
  </div>
);

AddUser.propTypes = {};

AddUser.defaultProps = {};

export default AddUser;
