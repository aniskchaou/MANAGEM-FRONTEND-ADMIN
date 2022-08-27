import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectReport.css';
import { useForm } from 'react-hook-form';
import projectValidation from '../../main/validations/projectValidation';
import projectHTTPService from '../../main/services/projectHTTPService';

const ProjectReport = () => {
  const initialState = {
    status: '',
    starting_date: '',
    ending_date: ''
  }
  const { register, handleSubmit, errors } = useForm()
  const [project, setProject] = useState(initialState);
  const [projectList, setProjectList] = useState([]);
  const onSubmit = (data) => {
    projectHTTPService.filterProject(data).then(data => {
      setProjectList(data.data)
    })
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  return (
    <div className="ProjectReport">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>

        <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
          name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
          <option value="started">Non Démarré</option>
          <option value="en cours">en cours</option>
          <option value="Fini">Fini</option>
        </select>

        <div class="form-group">
          <label>Début<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.starting_date}
            type="date" name="starting_date" class="form-control datepicker" />
          <div className="error text-danger">
            {errors.starting_date && projectValidation.starting_date}
          </div>
        </div>

        <div class="form-group">
          <label>fin<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.ending_date}
            type="date" name="ending_date" class="form-control datepicker" />
          <div className="error text-danger">
            {errors.ending_date && projectValidation.ending_date}
          </div>
        </div>
        <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button>
      </form>


      {projectList.map(item => item.status

      )}

    </div>
  )
};

ProjectReport.propTypes = {};

ProjectReport.defaultProps = {};

export default ProjectReport;
