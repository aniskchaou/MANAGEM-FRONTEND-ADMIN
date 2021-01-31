import React from 'react';
import PropTypes from 'prop-types';
import './AddClient.css';

const AddClient = () => (
  <div className="AddClient">
    <form method="POST" class="">
      <div class="row">
        <div class="form-group col-md-12">
          <label>Entreprise</label>
          <input type="text" name="company" class="form-control" />
        </div>


        <div class="form-group col-md-6">
          <input type="hidden" name="groups" value="4" />
          <label>Nom<span class="text-danger">*</span></label>
          <input type="text" name="first_name" class="form-control" required="" />
        </div>


        <div class="form-group col-md-6">
          <label>Prénom<span class="text-danger">*</span></label>
          <input type="text" name="last_name" class="form-control" />
        </div>

        <div class="form-group col-md-6">
          <label>Email<span class="text-danger">*</span></label>
          <input type="email" name="email" class="form-control" />
        </div>

        <div class="form-group col-md-6">
          <label>Mobile</label>
          <input type="text" name="phone" class="form-control" />
        </div>
        <div class="form-group col-md-6">
          <label>Mot de passe<span class="text-danger">*</span></label>
          <input type="text" name="password" class="form-control" />
        </div>

      </div>
      <button type="button" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
        <font   ><font   > Sauvegarder</font></font></button>

    </form>
  </div>
);

AddClient.propTypes = {};

AddClient.defaultProps = {};

export default AddClient;
