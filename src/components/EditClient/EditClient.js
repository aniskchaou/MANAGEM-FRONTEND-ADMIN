import React from 'react';
import PropTypes from 'prop-types';
import './EditClient.css';

const EditClient = () => (
  <div className="EditClient">
    <form action="http://timwork-saas.waptechy.com/auth/create-user" method="POST" class="">
  <div class="row">
    <div class="form-group col-md-12">
      <label>Company</label>
      <input type="text" name="company" class="form-control"/>
    </div>
    <div class="form-group col-md-6">
      <input type="hidden" name="groups" value="4"/>
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
  </div>
<button class="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

EditClient.propTypes = {};

EditClient.defaultProps = {};

export default EditClient;
