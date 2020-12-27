import React from 'react';
import PropTypes from 'prop-types';
import './AddUser.css';

const AddUser = () => (
  <div className="AddUser">
    <form action="http://timwork-saas.waptechy.com/auth/create-user" method="POST" className="">
      <div className="row">
        <div className="form-group col-md-6">
          <label>First Name<span className="text-danger">*</span></label>
          <input type="text" name="first_name" className="form-control" required="" />
        </div>
        <div className="form-group col-md-6">
          <label>Last Name<span className="text-danger">*</span></label>
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
          <label>Password<span className="text-danger">*</span></label>
          <input type="text" name="password" className="form-control" />
        </div>
        <div className="form-group col-md-6">
          <label>Confirm Password<span className="text-danger">*</span></label>
          <input type="text" name="password_confirm" className="form-control" />
        </div>
        <div className="form-group col-md-6">
          <label>User Role<span className="text-danger">*</span> <i className="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="Select user role like admin or team member."></i></label>
          <select name="groups" className="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
            <option value="1">Admin</option>
            <option value="2">Members</option>
          </select><span className="select2 select2-container select2-container--default" dir="ltr" >
            <span className="selection">
              <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-labelledby="select2-groups-p9-container">
                <span className="select2-selection__rendered" id="select2-groups-p9-container" title="Admin">Admin</span>
                <span className="select2-selection__arrow" role="presentation">
                  <b role="presentation"></b>
                </span></span></span>
            <span className="dropdown-wrapper" aria-hidden="true"></span></span>
        </div>
      </div>
      <button className="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

AddUser.propTypes = {};

AddUser.defaultProps = {};

export default AddUser;
