import React from 'react';
import PropTypes from 'prop-types';
import './EditNote.css';

const EditNote = () => (
  <div className="EditNote">
       <form  method="POST" class="">
  <div class="row">
    <div class="form-group col-md-12">
      <label>Note<span class="text-danger">*</span></label>
      <textarea type="text" name="description" class="form-control"></textarea>
    </div>
  </div>
<button class="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

EditNote.propTypes = {};

EditNote.defaultProps = {};

export default EditNote;
