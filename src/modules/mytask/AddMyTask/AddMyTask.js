import React from 'react';
import PropTypes from 'prop-types';
import './AddMyTask.css';

const AddMyTask = () => (
  <div className="AddMyTask">
    <form  method="POST" class="">
  <div class="row">
    <div class="form-group col-md-12">
      <label>Tache<span class="text-danger">*</span></label>
      <textarea type="text" name="todo" class="form-control"></textarea>
    </div>
    <div class="form-group col-md-12">
      <label>date échéance<span class="text-danger">*</span></label>
      <input type="text" name="due_date" class="form-control datepicker"/>
    </div>
  </div>
<button class="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

AddMyTask.propTypes = {};

AddMyTask.defaultProps = {};

export default AddMyTask;