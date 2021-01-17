import React from 'react';
import PropTypes from 'prop-types';
import './EditProject.css';

const EditProject = () => (
  <div className="EditProject">
    <form  method="POST" class="">
      
      <div class="form-group">
        <label>Titre<span class="text-danger">*</span></label>
        <input type="text" name="title" class="form-control" required="" />
      </div>

      <div class="form-group">
        <label>Description<span class="text-danger">*</span></label>
        <textarea type="text" name="description" class="form-control"></textarea>
      </div>

      <div class="form-group">
        <label>Début<span class="text-danger">*</span></label>
        <input type="date" name="starting_date" class="form-control datepicker" />
      </div>

      <div class="form-group">
        <label>Fin<span class="text-danger">*</span></label>
        <input type="date" name="ending_date" class="form-control datepicker" />
      </div>

      <div class="form-group">
        <label>Statut<span class="text-danger">*</span></label>
        <select name="status" class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
          <option value="1">Non Démarré</option>
          <option value="2">en cours</option>
          <option value="3">Fini</option>
        </select><span class="select2 select2-container select2-container--default" dir="ltr"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-status-fq-container"><span class="select2-selection__rendered" id="select2-status-fq-container" title="Not Started">Not Started</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
      </div>

      <div class="form-group">
        <label>Utilisateurs </label>


        <select name="users[]" class="form-control select2 select2-hidden-accessible" multiple  tabindex="-1" aria-hidden="true">
          <option value="3">Admin Natash</option>
          <option value="4">Tony Stark</option>
          <option value="5">Scarlet Witch</option>
          <option value="6">Captain Marvel</option>
          <option value="7">Groot Groot</option>
        </select>
      </div>


      <div class="form-group">
        <label>Client</label>
        <select name="client" class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
          <option value="">Select Client</option>
          <option value="10">Client User</option>
          <option value="14">B C</option>
        </select>
      </div>


      <button class="d-none" id="fire-modal-2-submit"></button>
    </form>
  </div>
);

EditProject.propTypes = {};

EditProject.defaultProps = {};

export default EditProject;
