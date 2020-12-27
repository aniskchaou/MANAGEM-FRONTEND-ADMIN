import React from 'react';
import PropTypes from 'prop-types';
import './EditMyTask.css';

const EditMyTask = () => (
  <div className="EditMyTask">
     <form action="http://timwork-saas.waptechy.com/todo/create" method="POST" class="">
  <div class="row">
    <div class="form-group col-md-12">
      <label>ToDo<span class="text-danger">*</span></label>
      <textarea type="text" name="todo" class="form-control"></textarea>
    </div>
    <div class="form-group col-md-12">
      <label>Due Date<span class="text-danger">*</span></label>
      <input type="text" name="due_date" class="form-control datepicker"/>
    </div>
  </div>
<button class="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

EditMyTask.propTypes = {};

EditMyTask.defaultProps = {};

export default EditMyTask;
