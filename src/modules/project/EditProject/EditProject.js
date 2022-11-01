import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditProject.css';
import projectHTTPService from '../../../main/services/projectHTTPService';
import projectMessage from '../../../main/messages/projectMessage';
import showMessage from '../../../libraries/messages/messages';
import { useForm } from 'react-hook-form';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';

const EditProject = (props) => {

  const { register, handleSubmit, errors } = useForm() // initialise the hook
  const [project, setProject] = useState(props.project);
  const [typeSubs, setTypeSubs] = useState([]);
  const [members, setMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProject(props.project)
    console.log(props.project)
  }, [props.project]);


  const onSubmit = (data) => {
    console.log(data)
    projectHTTPService.editProject(props.project.id, data).then(data => {
      props.closeModal()
      showMessage('Confirmation', projectMessage.edit, 'success')

    }).catch(e => {
      console.log(e)
    })

  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  useEffect(() => {
    retrieveUsers()
    retrieveClients()
  }, []);

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
    <div className="EditProject">
      <form class="" onSubmit={handleSubmit(onSubmit)}>

        <div class="form-group">
          <label>Title<span class="text-danger">*</span></label>
          <input type="text" name="title" class="form-control" onChange={handleInputChange} value={project.title} ref={register({ required: true })} />
        </div>

        <div class="form-group">
          <label>Short description<span class="text-danger">*</span></label>
          <textarea type="text" name="description" class="form-control" onChange={handleInputChange} value={project.description} ref={register({ required: true })}></textarea>
        </div>

        <div class="form-group">
          <label>Start<span class="text-danger">*</span></label>
          <input type="date" name="starting_date" class="form-control datepicker" onChange={handleInputChange} value={project.starting_date} ref={register({ required: true })} />
        </div>

        <div class="form-group">
          <label>End<span class="text-danger">*</span></label>
          <input type="date" name="ending_date" class="form-control datepicker" onChange={handleInputChange} value={project.ending_date} ref={register({ required: true })} />
        </div>

        <div class="form-group">
          <label>Status<span class="text-danger">*</span></label>
          <select name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            onChange={handleInputChange} value={project.title} ref={register({ required: true })}>
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div class="form-group">
          <label>User </label>


          <select name="users" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            onChange={handleInputChange}
            value={project.users} ref={register({ required: true })}>
            {
              users.map(item =>
                <option value={item.username}>{item.name}</option>

              )
            }
          </select>
        </div>


        <div class="form-group">
          <label>Client</label>
          <select name="client" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            onChange={handleInputChange} value={project.client} ref={register({ required: true })}>
            {
              clients.map(item =>
                <option value={item.first_name + ' ' + item.last_name}>{item.first_name + ' ' + item.last_name}</option>

              )
            }
          </select>
        </div>


        <button name="submit" type="submit" class="btn btn-primary"><i class="far fa-save"></i>
          Save</button>
      </form>
    </div>
  )

};

EditProject.propTypes = {};

EditProject.defaultProps = {};

export default EditProject;
