import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskReport.css';
import { useForm } from 'react-hook-form';
import projectHTTPService from '../../main/services/projectHTTPService';

const TaskReport = () => {

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
    <div className="TaskReport">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>

        <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
          name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
          <option value="started">Non Démarré</option>
          <option value="en cours">en cours</option>
          <option value="Fini">Fini</option>
        </select>

        <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
          name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
          <option value="started">High</option>
          <option value="en cours">low</option>
          <option value="Fini">normal</option>
        </select>

        <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button>
      </form>
    </div>
  )
};

TaskReport.propTypes = {};

TaskReport.defaultProps = {};

export default TaskReport;
