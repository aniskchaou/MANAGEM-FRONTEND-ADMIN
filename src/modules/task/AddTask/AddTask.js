import './AddTask.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import taskMessage from '../../../main/messages/taskMessage';
import taskValidation from '../../../main/validations/taskValidation';
import taskHTTPService from '../../../main/services/taskHHTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';

const AddTask = ({ closeModal }) => {
  const initialState = {
    project: '',
    description: '',
    title: '',
    deadline: '',
    priority: '',
    status: '',
    assigned: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [task, setTask] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveUsers();
    retrieveProjects();
  }, []);

  const retrieveProjects = async () => {
    setLoading(true);
    try {
      const { data } = await projectHTTPService.getAllProject();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const retrieveUsers = async () => {
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

  const onSubmit = (data) => {
    taskHTTPService.createTask(data)
      .then(() => {
        setTask(initialState);
        showMessage('Confirmation', taskMessage.add, 'success');
        closeModal();
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className="AddTask">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title<span className="text-danger">*</span></label>
          <input
            {...register('title', { required: true })}
            onChange={handleInputChange}
            value={task.title || ''}
            type="text"
            name="title"
            className="form-control"
          />
          {errors.title && <div className="error text-danger">{taskValidation.title}</div>}
        </div>

        <div className="form-group">
          <label>Project<span className="text-danger">*</span></label>
          <select
            {...register('project', { required: true })}
            onChange={handleInputChange}
            value={task.project || ''}
            className="form-control"
          >
            <option value="">Select a project</option>
            {projects.map((item, index) => (
              <option key={index} value={item.title}>{item.title}</option>
            ))}
          </select>
          {errors.project && <div className="error text-danger">{taskValidation.project_id}</div>}
        </div>

        <div className="form-group">
          <label>Short Description<span className="text-danger">*</span></label>
          <textarea
            {...register('description', { required: true })}
            onChange={handleInputChange}
            value={task.description || ''}
            name="description"
            className="form-control"
          ></textarea>
          {errors.description && <div className="error text-danger">{taskValidation.description}</div>}
        </div>

        <div className="form-group">
          <label>Due Date<span className="text-danger">*</span></label>
          <input
            {...register('deadline', { required: true })}
            onChange={handleInputChange}
            value={task.deadline || ''}
            type="date"
            name="deadline"
            className="form-control"
          />
          {errors.deadline && <div className="error text-danger">{taskValidation.due_date}</div>}
        </div>

        <div className="form-group">
          <label>Priority<span className="text-danger">*</span></label>
          <select
            {...register('priority', { required: true })}
            onChange={handleInputChange}
            value={task.priority || ''}
            className="form-control"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <div className="error text-danger">{taskValidation.priority}</div>}
        </div>

        <div className="form-group">
          <label>Status<span className="text-danger">*</span></label>
          <select
            {...register('status', { required: true })}
            onChange={handleInputChange}
            value={task.status || ''}
            className="form-control"
          >
            <option value="">Select Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <div className="error text-danger">{taskValidation.status}</div>}
        </div>

        <div className="form-group">
          <label>User</label>
          <select
            {...register('assigned')}
            onChange={handleInputChange}
            value={task.assigned || ''}
            className="form-control"
          >
            <option value="">Select a user</option>
            {users.map((item, index) => (
              <option key={index} value={item.username}>{item.name}</option>
            ))}
          </select>
          {errors.assigned && <div className="error text-danger">{taskValidation.users}</div>}
        </div>

        <button type="submit" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

export default AddTask;
