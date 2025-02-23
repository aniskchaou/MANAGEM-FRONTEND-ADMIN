import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import './EditProject.css';
import projectHTTPService from '../../../main/services/projectHTTPService';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';
import projectMessage from '../../../main/messages/projectMessage';
import showMessage from '../../../libraries/messages/messages';

const EditProject = ({ project: initialProject, closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [project, setProject] = useState(initialProject);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProject(initialProject);
    fetchClients();
    fetchUsers();
  }, [initialProject]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data } = await clientHTTPService.getAllClient();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await userHTTPService.getAllUser();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    try {
      await projectHTTPService.editProject(project.id, data);
      showMessage('Confirmation', projectMessage.edit, 'success');
      closeModal();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="EditProject">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title<span className="text-danger">*</span></label>
          <input
            type="text"
            name="title"
            className="form-control"
            {...register('title', { required: true })}
            value={project.title}
            onChange={handleInputChange}
          />
          {errors.title && <div className="error text-danger">Title is required</div>}
        </div>

        <div className="form-group">
          <label>Short Description<span className="text-danger">*</span></label>
          <textarea
            name="description"
            className="form-control"
            {...register('description', { required: true })}
            value={project.description}
            onChange={handleInputChange}
          />
          {errors.description && <div className="error text-danger">Description is required</div>}
        </div>

        <div className="form-group">
          <label>Start Date<span className="text-danger">*</span></label>
          <input
            type="date"
            name="starting_date"
            className="form-control"
            {...register('starting_date', { required: true })}
            value={project.starting_date}
            onChange={handleInputChange}
          />
          {errors.starting_date && <div className="error text-danger">Start date is required</div>}
        </div>

        <div className="form-group">
          <label>End Date<span className="text-danger">*</span></label>
          <input
            type="date"
            name="ending_date"
            className="form-control"
            {...register('ending_date', { required: true })}
            value={project.ending_date}
            onChange={handleInputChange}
          />
          {errors.ending_date && <div className="error text-danger">End date is required</div>}
        </div>

        <div className="form-group">
          <label>Status<span className="text-danger">*</span></label>
          <select
            name="status"
            className="form-control"
            {...register('status', { required: true })}
            value={project.status}
            onChange={handleInputChange}
          >
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
          {errors.status && <div className="error text-danger">Status is required</div>}
        </div>

        <div className="form-group">
          <label>User</label>
          <select
            name="users"
            className="form-control"
            {...register('users', { required: true })}
            value={project.users}
            onChange={handleInputChange}
          >
            {users.map((item) => (
              <option key={item.id} value={item.username}>{item.name}</option>
            ))}
          </select>
          {errors.users && <div className="error text-danger">User is required</div>}
        </div>

        <div className="form-group">
          <label>Client</label>
          <select
            name="client"
            className="form-control"
            {...register('client', { required: true })}
            value={project.client}
            onChange={handleInputChange}
          >
            {clients.map((item) => (
              <option key={item.id} value={`${item.first_name} ${item.last_name}`}>
                {item.first_name} {item.last_name}
              </option>
            ))}
          </select>
          {errors.client && <div className="error text-danger">Client is required</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          <i className="far fa-save"></i> Save
        </button>
      </form>
    </div>
  );
};

EditProject.propTypes = {
  project: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditProject;
