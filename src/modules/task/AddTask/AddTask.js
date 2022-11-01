import './AddTask.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import taskMessage from '../../../main/messages/taskMessage'
import taskValidation from '../../../main/validations/taskValidation'
import TaskTestService from '../../../main/mocks/TaskTestService';
import HTTPService from '../../../main/services/userHTTPService';
import taskHHTPService from '../../../main/services/taskHHTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';
import { useEffect } from 'react';
import userHTTPService from '../../../main/services/userHTTPService';


const AddTask = (props) => {

  const initialState = {
    project: "",
    description: "",
    title: "",
    deadline: "",
    priority: "",
    status: "",
    assigned: ""
  };

  const { register, handleSubmit, errors } = useForm()
  const [task, setTask] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);



  const onSubmit = (data) => {
    //saveTask(data)
    //TaskTestService.create(data)
    console.log(data)
    taskHHTPService.createTask(data).then(data => {
      setTask(initialState)
      showMessage('Confirmation', taskMessage.add, 'success')
      props.closeModal()
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


  useEffect(() => {
    retrieveUsers()
    retrieveProjects()
  }, []);

  const retrieveProjects = () => {
    //var projects = ProjectTestService.getAll();
    setLoading(true)
    projectHTTPService.getAllProject().then(data => {
      console.log(data.data)
      setProjects(data.data);
      setLoading(false)
    })

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
    <div className="AddTask">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>


        <div className="form-group">
          <label>Title<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange}
            value={task.title} type="text" name="title" className="form-control" required="" />
          <div className="error text-danger">
            {errors.title && taskValidation.title}
          </div>
        </div>

        <div className="form-group">
          <label>Project<span className="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange}
            value={task.project} name="project_id" id="project"
            class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow" tabIndex="-1" aria-hidden="true">

            {
              projects.map(item =>
                <option value={item.title}>{item.title}</option>

              )
            }
          </select>
          <div className="error text-danger">
            {errors.project_id && taskValidation.project_id}
          </div>
        </div>



        <div className="form-group">
          <label>Short Description<span className="text-danger">*</span></label>
          <textarea ref={register({ required: true })} onChange={handleInputChange}
            value={task.description} type="text" name="description" className="form-control"></textarea>
          <div className="error text-danger">
            {errors.description && taskValidation.description}
          </div>
        </div>

        <div className="form-group">
          <label>Due Date<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange}
            value={task.deadline} type="date" name="deadline" className="form-control datepicker" required="" />
          <div className="error text-danger">
            {errors.due_date && taskValidation.due_date}
          </div>
        </div>

        <div className="form-group">
          <label>Priority<span className="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange}
            value={task.priority} name="priority" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow" required="" tabIndex="-1" aria-hidden="true">
            <option id="low" value="Low">Low</option>
            <option id="medium" value="Medium">Medium</option>
            <option id="high" value="High">High</option>
          </select>
          <div className="error text-danger">
            {errors.priority && taskValidation.priority}
          </div>
        </div>

        <div className="form-group">
          <label>Status<span className="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange}
            value={task.status} name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            required="" tabIndex="-1" aria-hidden="true">
            <option id="todo" value="Todo">Todo</option>
            <option id="inprogress" value="In Progress">In Progress</option>
            <option id="inreview" value="In Review">In Review</option>
            <option id="completed" value="Completed">Completed</option>
          </select>
          <div className="error text-danger">
            {errors.status && taskValidation.status}
          </div>
        </div>

        <div className="form-group">
          <label>User </label>
          <select ref={register({ required: true })}
            onChange={handleInputChange}
            value={task.assigned} name="assigned" id="users_append"
            class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"  >
            {
              users.map(item =>
                <option value={item.username}>{item.name}</option>

              )
            }
          </select>
          <div className="error text-danger">
            {errors.users && taskValidation.users}
          </div>
        </div>

        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Save</font></font></button></form>
    </div>
  )
};

AddTask.propTypes = {};

AddTask.defaultProps = {};

export default AddTask;
