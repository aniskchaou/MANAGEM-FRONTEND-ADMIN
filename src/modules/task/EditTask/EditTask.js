import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditTask.css';
import taskMessage from '../../../main/messages/taskMessage';
import taskHHTPService from '../../../main/services/taskHHTPService';
import showMessage from '../../../libraries/messages/messages';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../../main/services/userHTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';

const EditTask = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Updated useForm structure

  const [task, setTask] = useState(props.task || {}); // Prevents undefined errors
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTask(props.task || {}); // Update when props change
  }, [props.task]);

  useEffect(() => {
    retrieveUsers();
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    setLoading(true);
    projectHTTPService.getAllProject()
      .then(data => {
        setProjects(data.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  };

  const retrieveUsers = () => {
    setLoading(true);
    userHTTPService.getAllUser()
      .then(response => {
        setUsers(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    taskHHTPService.editTask(props.task.id, data)
      .then(() => {
        props.closeModal();
        showMessage('Confirmation', taskMessage.edit, 'success');
      })
      .catch(error => {
        console.error("Error updating task:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className="EditTask">
      <form onSubmit={handleSubmit(onSubmit)} className="task-form">
        <div className="form-group">
          <label>Project <span className="text-danger">*</span></label>
          <select
            name="project_id"
            className="form-control"
            onChange={handleInputChange}
            value={task?.project || ""}
            {...register("project_id", { required: "Project is required" })}
          >
            {projects.map((item, index) => (
              <option key={index} value={item.title}>{item.title}</option>
            ))}
          </select>
          {errors.project_id && <p className="text-danger">{errors.project_id.message}</p>}
        </div>

        <div className="form-group">
          <label>Title <span className="text-danger">*</span></label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={handleInputChange}
            value={task?.title || ""}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label>Short Description <span className="text-danger">*</span></label>
          <textarea
            name="description"
            className="form-control"
            onChange={handleInputChange}
            value={task?.description || ""}
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label>Due Date <span className="text-danger">*</span></label>
          <input
            type="date"
            name="deadline"
            className="form-control"
            onChange={handleInputChange}
            value={task?.deadline || ""}
            {...register("deadline", { required: "Due date is required" })}
          />
          {errors.deadline && <p className="text-danger">{errors.deadline.message}</p>}
        </div>

        <div className="form-group">
          <label>Priority <span className="text-danger">*</span></label>
          <select
            name="priority"
            className="form-control"
            onChange={handleInputChange}
            value={task?.priority || ""}
            {...register("priority", { required: "Priority is required" })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <p className="text-danger">{errors.priority.message}</p>}
        </div>

        <div className="form-group">
          <label>Status <span className="text-danger">*</span></label>
          <select
            name="status"
            className="form-control"
            onChange={handleInputChange}
            value={task?.status || ""}
            {...register("status", { required: "Status is required" })}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <p className="text-danger">{errors.status.message}</p>}
        </div>

        <div className="form-group">
          <label>User</label>
          <select
            name="assigned"
            className="form-control"
            onChange={handleInputChange}
            value={task?.assigned || ""}
            {...register("assigned", { required: "User assignment is required" })}
          >
            {users.map((item, index) => (
              <option key={index} value={item.username}>{item.name}</option>
            ))}
          </select>
          {errors.assigned && <p className="text-danger">{errors.assigned.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          <i className="far fa-save"></i> Save
        </button>
      </form>
    </div>
  );
};

EditTask.propTypes = {
  task: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditTask;
