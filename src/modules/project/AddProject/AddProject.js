import './AddProject.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import projectMessage from '../../../main/messages/projectMessage'
import projectValidation from '../../../main/validations/projectValidation'
import ProjectTestService from '../../../main/mocks/ProjectTestService';
import HTTPService from '../../../main/services/userHTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';
import { useEffect } from 'react';


const AddProject = (props) => {


  const initialState = {
    title: "",
    description: "",
    starting_date: "",
    ending_date: "",
    users: "",
    client: "",
    status: ''
  };

  const { register, handleSubmit, errors } = useForm()
  const [project, setProject] = useState(initialState);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  const onSubmit = (data) => {
    console.log(data)
    //saveProject(data)
    // ProjectTestService.create(data)
    projectHTTPService.createProject(data).then(data => {

      setProject(initialState)
      showMessage('Confirmation', projectMessage.add, 'success')
      props.closeModal()
      //setProjects(data.data);
      //setLoading(false)

    })

  }

  useEffect(() => {
    retrieveUsers()
    retrieveClients()
  }, []);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };


  const retrieveClients = () => {
    setLoading(true)
    clientHTTPService.getAllClient().then(data => {
      setLoading(false)
      setClients(data.data)

    });
    ;
  };


  const retrieveUsers = () => {
    setLoading(true)
    userHTTPService.getAllUser()
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
        setLoading(false)
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div className="AddProject">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group">
          <label>Title<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.title}
            type="text" name="title" class="form-control" required="" />
          <div className="error text-danger">
            {errors.title && projectValidation.title}
          </div>
        </div>

        <div class="form-group">
          <label>Short Description<span class="text-danger">*</span></label>
          <textarea ref={register({ required: true })} onChange={handleInputChange} value={project.description}
            type="text" name="description" class="form-control"></textarea>
          <div className="error text-danger">
            {errors.description && projectValidation.description}
          </div>
        </div>

        <div class="form-group">
          <label>Start<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.starting_date}
            type="date" name="starting_date" class="form-control datepicker" />
          <div className="error text-danger">
            {errors.starting_date && projectValidation.starting_date}
          </div>
        </div>

        <div class="form-group">
          <label>End<span class="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.ending_date}
            type="date" name="ending_date" class="form-control datepicker" />
          <div className="error text-danger">
            {errors.ending_date && projectValidation.ending_date}
          </div>
        </div>

        <div class="form-group">
          <label>Status<span class="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
            name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
          <div className="error text-danger">
            {errors.status && projectValidation.status}
          </div>
        </div>

        <div class="form-group">
          <label>User </label>


          <select ref={register({ required: true })} onChange={handleInputChange}
            value={project.users} name="users" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
          >
            {
              users.map(item =>
                <option value={item.username}>{item.name}</option>

              )
            }

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
            {
              clients.map(item =>
                <option value={item.first_name + ' ' + item.last_name}>{item.first_name + ' ' + item.last_name}</option>

              )
            }
          </select>
          <div className="error text-danger">
            {errors.client && projectValidation.client}
          </div>
        </div>


        <button type="submit" id="save-form" class="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Save</font></font></button></form>
    </div>
  )
};

AddProject.propTypes = {};

AddProject.defaultProps = {};

export default AddProject;
