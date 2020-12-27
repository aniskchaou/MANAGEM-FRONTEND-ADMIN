import React from 'react';
import PropTypes from 'prop-types';
import './AddProject.css';

const AddProject = () => (
  <div className="AddProject">
    <form action="http://timwork-saas.waptechy.com/projects/create-project" method="POST" class="">
      <div class="form-group">
        <label>Project Title<span class="text-danger">*</span></label>
        <input type="text" name="title" class="form-control" required="" />
      </div>
      <div class="form-group">
        <label>Description<span class="text-danger">*</span></label>
        <textarea type="text" name="description" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label>Starting Date<span class="text-danger">*</span></label>
        <input type="text" name="starting_date" class="form-control datepicker" />
      </div>

      <div class="form-group">
        <label>Ending Date<span class="text-danger">*</span></label>
        <input type="text" name="ending_date" class="form-control datepicker" />
      </div>

      <div class="form-group">
        <label>Status<span class="text-danger">*</span></label>
        <select name="status" class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
          <option value="1">Not Started</option>
          <option value="2">On Going</option>
          <option value="3">Finished</option>
        </select><span class="select2 select2-container select2-container--default" dir="ltr"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-status-fq-container"><span class="select2-selection__rendered" id="select2-status-fq-container" title="Not Started">Not Started</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
      </div>

      <div class="form-group">
        <label>Project Users <i class="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="Add users who will work on this project. Only this users are able to see this project."></i></label>


        <select name="users[]" class="form-control select2 select2-hidden-accessible" multiple="" tabindex="-1" aria-hidden="true">
          <option value="3">Admin Natash</option>
          <option value="4">Tony Stark</option>
          <option value="5">Scarlet Witch</option>
          <option value="6">Captain Marvel</option>
          <option value="7">Groot Groot</option>
        </select>

        <span class="select2 select2-container select2-container--default" dir="ltr" >
          <span class="selection">
            <span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1">
              <ul class="select2-selection__rendered">
                <li class="select2-search select2-search--inline">
                  <input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" />
                </li></ul>
            </span>
          </span>
          <span class="dropdown-wrapper" aria-hidden="true">
          </span>
        </span>
      </div>
      <div class="form-group">
        <label>Project Client</label>
        <select name="client" class="form-control select2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
          <option value="">Select Client</option>
          <option value="10">Client User</option>
          <option value="14">B C</option>
        </select>
        <span class="select2 select2-container select2-container--default" dir="ltr" >
          <span class="selection">
            <span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-client-ga-container">
              <span class="select2-selection__rendered" id="select2-client-ga-container" title="Select Client">Select Client</span><span class="select2-selection__arrow" role="presentation"><b role="presentation">
              </b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
      </div>
      <button class="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

AddProject.propTypes = {};

AddProject.defaultProps = {};

export default AddProject;
