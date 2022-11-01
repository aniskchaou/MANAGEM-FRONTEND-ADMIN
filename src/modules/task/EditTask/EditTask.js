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

  const { register, handleSubmit, errors } = useForm() // initialise the hook
  const [task, setTask] = useState(props.task);
  const [typeSubs, setTypeSubs] = useState([]);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setTask(props.task)

  }, [props.task]);


  const onSubmit = (data) => {
    console.log(data)
    taskHHTPService.editTask(props.task.id, data).then(data => {
      props.closeModal()
      showMessage('Confirmation', taskMessage.edit, 'success')
    }).catch(e => {
      console.log(e)
    })

  }

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
    <div className="EditTask">
      <form onSubmit={handleSubmit(onSubmit)} className="">

        <div className="form-group">
          <label>Project<span className="text-danger">*</span></label>
          <select name="project_id" id="project" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            onChange={handleInputChange} value={task?.project}
            ref={register({ required: true })}>
            {
              projects.map(item =>
                <option value={item.title}>{item.title}</option>

              )
            }
          </select>
        </div>

        <div className="form-group">
          <label>Title<span className="text-danger">*</span></label>
          <input type="text" name="title" className="form-control" required="" onChange={handleInputChange} value={task.title}
            ref={register({ required: true })} />
        </div>

        <div className="form-group">
          <label>Short Description<span className="text-danger">*</span></label>
          <textarea type="text" name="description" className="form-control" onChange={handleInputChange} value={task.description}
            ref={register({ required: true })}></textarea>
        </div>

        <div className="form-group">
          <label>Due Date<span className="text-danger">*</span></label>
          <input type="date" name="deadline" className="form-control datepicker" required=""
            onChange={handleInputChange} value={task.deadline}
            ref={register({ required: true })} />
        </div>

        <div className="form-group">
          <label>Priority<span className="text-danger">*</span></label>
          <select onChange={handleInputChange} value={task.priority}
            ref={register({ required: true })} name="priority" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            <option id="low" value="Low">Low</option>
            <option id="medium" value="Medium">Medium</option>
            <option id="high" value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status<span className="text-danger">*</span></label>
          <select onChange={handleInputChange} value={task.status}
            ref={register({ required: true })} name="status" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            <option id="todo" value="Todo">Todo</option>
            <option id="inprogress" value="In Progress">In Progress</option>
            <option id="inreview" value="In Review">In Review</option>
            <option id="completed" value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>User </label>
          <select onChange={handleInputChange} value={task.assigned}
            ref={register({ required: true })} name="assigned" id="users_append" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            {
              users.map(item =>
                <option value={item.username}>{item.name}</option>

              )
            }
          </select>
        </div>

        <button name="submit" type="submit" class="btn btn-primary"><i class="far fa-save"></i>
          Save</button></form>
    </div>
  )
};

EditTask.propTypes = {};

EditTask.defaultProps = {};

export default EditTask;
