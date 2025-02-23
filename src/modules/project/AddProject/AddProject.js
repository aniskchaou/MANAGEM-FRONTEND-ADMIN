import './AddProject.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import projectMessage from '../../../main/messages/projectMessage';
import projectValidation from '../../../main/validations/projectValidation';
import projectHTTPService from '../../../main/services/projectHTTPService';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';

const AddProject = ({ closeModal }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveUsers();
    retrieveClients();
  }, []);

  const retrieveClients = async () => {
    setLoading(true);
    try {
      const response = await clientHTTPService.getAllClient();
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
    setLoading(false);
  };

  const retrieveUsers = async () => {
    setLoading(true);
    try {
      const response = await userHTTPService.getAllUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    try {
      await projectHTTPService.createProject(data);
      showMessage('Confirmation', projectMessage.add, 'success');
      closeModal();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="AddProject">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title <span className="text-danger">*</span></label>
          <input {...register("title", { required: true })} type="text" className="form-control" />
          {errors.title && <div className="error text-danger">{projectValidation.title}</div>}
        </div>

        <div className="form-group">
          <label>Description <span className="text-danger">*</span></label>
          <textarea {...register("description", { required: true })} className="form-control"></textarea>
          {errors.description && <div className="error text-danger">{projectValidation.description}</div>}
        </div>

        <div className="form-group">
          <label>Start Date <span className="text-danger">*</span></label>
          <input {...register("starting_date", { required: true })} type="date" className="form-control" />
          {errors.starting_date && <div className="error text-danger">{projectValidation.starting_date}</div>}
        </div>

        <div className="form-group">
          <label>End Date <span className="text-danger">*</span></label>
          <input {...register("ending_date", { required: true })} type="date" className="form-control" />
          {errors.ending_date && <div className="error text-danger">{projectValidation.ending_date}</div>}
        </div>

        <div className="form-group">
          <label>Status <span className="text-danger">*</span></label>
          <select {...register("status", { required: true })} className="form-control">
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
          {errors.status && <div className="error text-danger">{projectValidation.status}</div>}
        </div>

        <div className="form-group">
          <label>User</label>
          <select {...register("users", { required: true })} className="form-control">
            {users.map(user => <option key={user.id} value={user.username}>{user.name}</option>)}
          </select>
          {errors.users && <div className="error text-danger">{projectValidation.users}</div>}
        </div>

        <div className="form-group">
          <label>Client</label>
          <select {...register("client", { required: true })} className="form-control">
            {clients.map(client => (
              <option key={client.id} value={`${client.first_name} ${client.last_name}`}>
                {client.first_name} {client.last_name}
              </option>
            ))}
          </select>
          {errors.client && <div className="error text-danger">{projectValidation.client}</div>}
        </div>

        <button type="submit" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

export default AddProject;
