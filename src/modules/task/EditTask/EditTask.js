import React from 'react';
import PropTypes from 'prop-types';
import './EditTask.css';

const EditTask = () => (
  <div className="EditTask">
     <form method="POST" className="">

<div className="form-group">
  <label>Projet<span className="text-danger">*</span></label>
  <select name="project_id" id="project_id" className="form-control select2 select2-hidden-accessible" tabIndex="-1" aria-hidden="true">
    <option value="">Select Project</option>
    <option value="11">asean india team 1</option>
  </select>
</div>

<div className="form-group">
  <label>Titre<span className="text-danger">*</span></label>
  <input type="text" name="title" className="form-control" required="" />
</div>

<div className="form-group">
  <label>Description<span className="text-danger">*</span></label>
  <textarea type="text" name="description" className="form-control"></textarea>
</div>

<div className="form-group">
  <label>Date échéance<span className="text-danger">*</span></label>
  <input type="date" name="due_date" className="form-control datepicker" required="" />
</div>

<div className="form-group">
  <label>Priorité<span className="text-danger">*</span></label>
  <select name="priority" className="form-control select2 select2-hidden-accessible" required="" tabIndex="-1" aria-hidden="true">
    <option value="1">Low</option>
    <option value="2">Medium</option>
    <option value="3">High</option>
  </select>
</div>

<div className="form-group">
  <label>Statut<span className="text-danger">*</span></label>
  <select name="status" className="form-control select2 select2-hidden-accessible" required="" tabIndex="-1" aria-hidden="true">
    <option value="1">Todo</option>
    <option value="2">In Progress</option>
    <option value="3">In Review</option>
    <option value="4">Completed</option>
  </select>
</div>

<div className="form-group">
  <label>Utilisateurs </label>
  <select name="users[]" id="users_append" className="form-control select2 select2-hidden-accessible" multiple tabIndex="-1" aria-hidden="true">
  </select>
</div>

<button className="btn btn-success" id="fire-modal-3-submit">Sauvegarder</button></form>
  </div>
);

EditTask.propTypes = {};

EditTask.defaultProps = {};

export default EditTask;
