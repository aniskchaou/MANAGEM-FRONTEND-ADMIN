import React from 'react';
import PropTypes from 'prop-types';
import './AddNote.css';

const AddNote = () => (
  <div className="AddNote">
    <form action="http://timwork-saas.waptechy.com/notes/create" method="POST" class="">
  <div class="row">
    <div class="form-group col-md-12">
      <label>Note<span class="text-danger">*</span></label>
      <textarea type="text" name="description" class="form-control"></textarea>
    </div>
  </div>
<button class="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

AddNote.propTypes = {};

AddNote.defaultProps = {};

export default AddNote;
