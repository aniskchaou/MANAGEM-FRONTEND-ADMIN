import './AddTask.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import taskMessage from '../../../main/messages/taskMessage'
import taskValidation from '../../../main/validations/taskValidation'
import TaskTestService from '../../../main/mocks/TaskTestService';
import HTTPService from '../../../main/services/HTTPService';
import taskHHTPService from '../../../main/services/taskHHTPService';


const AddTask = () => {

  const initialState = {
    project_id: "",
    description: "",
    title: "",
    due_date: "",
    priority: "",
    status: "",
    users: ""
  };

  const { register, handleSubmit, errors } = useForm()
  const [task, setTask] = useState(initialState);

  const onSubmit = (data) => {
    //saveTask(data)
    //TaskTestService.create(data)
    taskHHTPService.createTask(data).then(data => {
      setTask(initialState)
      showMessage('Confirmation', taskMessage.add, 'success')
    })

  }

  const saveTask = (data) => {

    HTTPService.create(data)
      .then(response => {
        setTask(initialState)
      })
      .catch(e => {
        console.log(e);
      });

  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };


  return (
    <div className="AddTask">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
          <label>Projet<span className="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange}
            value={task.project_id} name="project_id" id="project_id"
            className="form-control select2 select2-hidden-accessible" tabIndex="-1" aria-hidden="true">

            <option value="Projet 1">Projet 1</option>
          </select>
          <div className="error text-danger">
            {errors.project_id && taskValidation.project_id}
          </div>
        </div>

        <div className="form-group">
          <label>Titre<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange}
            value={task.title} type="text" name="title" className="form-control" required="" />
          <div className="error text-danger">
            {errors.title && taskValidation.title}
          </div>
        </div>

        <div className="form-group">
          <label>Description<span className="text-danger">*</span></label>
          <textarea ref={register({ required: true })} onChange={handleInputChange}
            value={task.description} type="text" name="description" className="form-control"></textarea>
          <div className="error text-danger">
            {errors.description && taskValidation.description}
          </div>
        </div>

        <div className="form-group">
          <label>Date échéance<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange}
            value={task.due_date} type="date" name="due_date" className="form-control datepicker" required="" />
          <div className="error text-danger">
            {errors.due_date && taskValidation.due_date}
          </div>
        </div>

        <div className="form-group">
          <label>Priorité<span className="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange}
            value={task.priority} name="priority" className="form-control select2 select2-hidden-accessible" required="" tabIndex="-1" aria-hidden="true">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div className="error text-danger">
            {errors.priority && taskValidation.priority}
          </div>
        </div>

        <div className="form-group">
          <label>Statut<span className="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange}
            value={task.status} name="status" className="form-control select2 select2-hidden-accessible"
            required="" tabIndex="-1" aria-hidden="true">
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="error text-danger">
            {errors.status && taskValidation.status}
          </div>
        </div>

        <div className="form-group">
          <label>Utilisateurs </label>
          <select ref={register({ required: true })}
            onChange={handleInputChange}
            value={task.users} name="users" id="users_append"
            className="form-control select2 select2-hidden-accessible"  >
            <option value="John Doe">John Doe</option>
            <option value="Mike Dean">Mike Dean</option>
          </select>
          <div className="error text-danger">
            {errors.users && taskValidation.users}
          </div>
        </div>

        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button></form>
    </div>
  )
};

AddTask.propTypes = {};

AddTask.defaultProps = {};

export default AddTask;
