import React from 'react';
import PropTypes from 'prop-types';
import './EditUser.css';

const EditUser = () => (
  <div className="EditUser">
     <form action="http://timwork-saas.waptechy.com/auth/create-user" method="POST" class="">
  <div class="row">
    <div class="form-group col-md-6">
      <label>First Name<span class="text-danger">*</span></label>
      <input type="text" name="first_name" class="form-control" required=""/>
    </div>
    <div class="form-group col-md-6">
      <label>Last Name<span class="text-danger">*</span></label>
      <input type="text" name="last_name" class="form-control"/>
    </div>
    <div class="form-group col-md-6">
      <label>Email<span class="text-danger">*</span> <i class="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="This email will not be updated latter."></i></label>
      <input type="email" name="email" class="form-control"/>
    </div>

    <div class="form-group col-md-6">
      <label>Mobile</label>
      <input type="text" name="phone" class="form-control"/>
    </div>
    <div class="form-group col-md-6">
      <label>Password<span class="text-danger">*</span></label>
      <input type="text" name="password" class="form-control"/>
    </div>
    <div class="form-group col-md-6">
      <label>Confirm Password<span class="text-danger">*</span></label>
      <input type="text" name="password_confirm" class="form-control"/>
    </div>
    <div class="form-group col-md-6">
      <label>User Role<span class="text-danger">*</span> <i class="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="Select user role like admin or team member."></i></label>
      <select name="groups" class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                  <option value="1">Admin</option>
                  <option value="2">Members</option>
              </select><span class="select2 select2-container select2-container--default" dir="ltr" ><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-groups-p9-container"><span class="select2-selection__rendered" id="select2-groups-p9-container" title="Admin">Admin</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
    </div>
  </div>
<button class="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

EditUser.propTypes = {};

EditUser.defaultProps = {};

export default EditUser;
