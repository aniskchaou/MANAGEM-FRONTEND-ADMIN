import './AddProject.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import projectMessage from '../../../main/messages/projectMessage'
import projectValidation from '../../../main/validations/projectValidation'
import ProjectTestService from '../../../main/mocks/ProjectTestService';
import HTTPService from '../../../main/services/HTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';


const AddProject = () => {


  const initialState = {
    title: "",
    description: "",
    starting_date: "",
    ending_date: "",
    users: "",
    client: ""
  };

  const { register, handleSubmit, errors } = useForm()
  const [project, setProject] = useState(initialState);

  const onSubmit = (data) => {
    //saveProject(data)
    // ProjectTestService.create(data)
    projectHTTPService.createProject(data).then(data => {
      setProject(initialState)
      showMessage('Confirmation', projectMessage.add, 'success')
      //setProjects(data.data);
      //setLoading(false)
    })

  }

  const saveProject = (data) => {

    HTTPService.create(data)
      .then(response => {
        setProject(initialState)
      })
      .catch(e => {
        console.log(e);
      });

  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };


  return (
    <div className="AddProject">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group">
          <label>Titre<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.title}
            type="text" name="title" class="form-control" required="" />
          <div className="error text-danger">
            {errors.title && projectValidation.title}
          </div>
        </div>

        <div class="form-group">
          <label>Description<span class="text-danger">*</span></label>
          <textarea ref={register({ required: true })} onChange={handleInputChange} value={project.description}
            type="text" name="description" class="form-control"></textarea>
          <div className="error text-danger">
            {errors.description && projectValidation.description}
          </div>
        </div>

        <div class="form-group">
          <label>Début<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.starting_date}
            type="date" name="starting_date" class="form-control datepicker" />
          <div className="error text-danger">
            {errors.starting_date && projectValidation.starting_date}
          </div>
        </div>

        <div class="form-group">
          <label>Fin<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.ending_date}
            type="date" name="ending_date" class="form-control datepicker" />
          <div className="error text-danger">
            {errors.ending_date && projectValidation.ending_date}
          </div>
        </div>

        <div class="form-group">
          <label>Statut<span class="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
            name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            <option value="Non Démarré">Non Démarré</option>
            <option value="en cours">en cours</option>
            <option value="Fini">Fini</option>
          </select>
          <div className="error text-danger">
            {errors.status && projectValidation.status}
          </div>
        </div>

        <div class="form-group">
          <label>Utilisateurs </label>


          <select ref={register({ required: true })} onChange={handleInputChange}
            value={project.users} name="users" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
          >
            <option value="Admin Natash">Admin Natash</option>
            <option value="Tony Stark">Tony Stark</option>
            <option value="Scarlet Witch">Scarlet Witch</option>
            <option value="Captain Marvel">Captain Marvel</option>

          </select>
          <div className="error text-danger">
            {errors.users && projectValidation.users}
          </div>
        </div>


        <div class="form-group">
          <label>Client</label>
          <select ref={register({ required: true })} onChange={handleInputChange} value={project.client}
            name="client" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
          >
            <option value="">Select Client</option>
            <option value="Mike Dean">Mike Dean</option>
            <option value="John Doe">John Doe</option>
          </select>
          <div className="error text-danger">
            {errors.client && projectValidation.client}
          </div>
        </div>


        <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button></form>
    </div>
  )
};

AddProject.propTypes = {};

AddProject.defaultProps = {};

export default AddProject;
