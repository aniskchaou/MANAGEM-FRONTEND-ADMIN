import React from 'react';
import PropTypes from 'prop-types';
import './AddNote.css';

const AddNote = () => (
  <div className="AddNote">
    <form  method="POST" class="">
  <div class="row">
    <div class="form-group col-md-12">
      <label>Note<span class="text-danger">*</span></label>
      <textarea type="text" name="description" class="form-control"></textarea>
    </div>
  </div>
      <button type="button" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
        <font   ><font   > Sauvegarder</font></font></button></form>
  </div>
);

AddNote.propTypes = {};

AddNote.defaultProps = {};

export default AddNote;
