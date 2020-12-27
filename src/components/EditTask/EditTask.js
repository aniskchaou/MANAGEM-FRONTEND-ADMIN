import React from 'react';
import PropTypes from 'prop-types';
import './EditTask.css';

const EditTask = () => (
  <div className="EditTask">
      <form action="http://timwork-saas.waptechy.com/projects/create-task" method="POST" className="">

<div className="form-group">
<label>Project<span className="text-danger">*</span></label>
<select name="project_id" id="project_id" className="form-control select2 select2-hidden-accessible"  tabIndex="-1" aria-hidden="true">
  <option value="">Select Project</option>
          <option value="11">asean india team 1</option>
          <option value="10">Inas</option>
          <option value="9">تصميم</option>
          <option value="8">Test</option>
          <option value="7">Pater Ey</option>
          <option value="6">تصميم هوية تجارية</option>
          <option value="5">thiet ke</option>
          <option value="3">SEO Made Simple: A Step-by-Step Guide</option>
          <option value="2">Website Development Life Cycle</option>
          <option value="1">Steps To Create An App Successfully</option>
        </select><span className="select2 select2-container select2-container--default" dir="ltr"><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false"  tabIndex="0" aria-labelledby="select2-project_id-container"><span className="select2-selection__rendered" id="select2-project_id-container" title="Select Project">Select Project</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
</div>

<div className="form-group">
<label>Task Title<span className="text-danger">*</span></label>
<input type="text" name="title" className="form-control" required=""/>
</div>
<div className="form-group">
<label>Description<span className="text-danger">*</span></label>
<textarea type="text" name="description" className="form-control"></textarea>
</div>
<div className="form-group">
<label>Due Date<span className="text-danger">*</span></label>
<input type="text" name="due_date" className="form-control datepicker" required=""/>
</div>

<div className="form-group">
<label>Priority<span className="text-danger">*</span></label>
<select name="priority" className="form-control select2 select2-hidden-accessible" required=""  tabIndex="-1" aria-hidden="true">
      <option value="1">Low</option>
      <option value="2">Medium</option>
      <option value="3">High</option>
    </select><span className="select2 select2-container select2-container--default" dir="ltr"  ><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false"  tabIndex="0" aria-labelledby="select2-priority-yd-container"><span className="select2-selection__rendered" id="select2-priority-yd-container" title="Low">Low</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
</div>

<div className="form-group">
<label>Status<span className="text-danger">*</span></label>
<select name="status" className="form-control select2 select2-hidden-accessible" required=""  tabIndex="-1" aria-hidden="true">
      <option value="1">Todo</option>
      <option value="2">In Progress</option>
      <option value="3">In Review</option>
      <option value="4">Completed</option>
    </select><span className="select2 select2-container select2-container--default" dir="ltr"  ><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false"  tabIndex="0" aria-labelledby="select2-status-fl-container"><span className="select2-selection__rendered" id="select2-status-fl-container" title="Todo">Todo</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
</div>

<div className="form-group">
<label>Assigned Users <i className="fas fa-question-circle" data-toggle="tooltip" data-placement="right" title="" data-original-title="Assign task to the users who will work on this task. Only this users are able to see this task."></i></label>
<select name="users[]" id="users_append" className="form-control select2 select2-hidden-accessible" multiple=""  tabIndex="-1" aria-hidden="true">
    </select><span className="select2 select2-container select2-container--default" dir="ltr"  >
      <span className="selection"><span className="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false"  tabIndex="-1">
      <ul className="select2-selection__rendered">
        <li className="select2-search select2-search--inline">
          <input className="select2-search__field" type="search"  tabIndex="0" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" />
          </li>
          </ul>
          </span>
          </span>
          <span className="dropdown-wrapper" aria-hidden="true">
            </span>
            </span>
</div>

<button className="d-none" id="fire-modal-3-submit"></button></form>
  </div>
);

EditTask.propTypes = {};

EditTask.defaultProps = {};

export default EditTask;
