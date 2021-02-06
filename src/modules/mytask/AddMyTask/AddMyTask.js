import './AddMyTask.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import myTaskMessage from '../../../main/messages/myTaskMessage'
import myTaskValidation from '../../../main/validations/myTaskValidation'
import MyTaskTestService from '../../../main/mocks/MyTaskTestService';
import HTTPService from '../../../main/services/HTTPService';

const AddMyTask = () => {
  const initialState = {
    todo: "",
    due_date: "",
  };

  const { register, handleSubmit, errors } = useForm()
  const [myTask, setMyTask] = useState(initialState);

  const onSubmit = (data) => {
    //saveMyTask(data)
    MyTaskTestService.create(data)
    setMyTask(initialState)
    showMessage('Confirmation', myTaskMessage.add, 'success')
  }

  const saveMyTask = (data) => {

    HTTPService.create(data)
      .then(response => {
        setMyTask(initialState)
      })
      .catch(e => {
        console.log(e);
      });

  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setMyTask({ ...myTask, [name]: value });
  };

  return (
    <div className="AddMyTask">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">

          <div class="form-group col-md-12">
            <label>Tache<span class="text-danger">*</span></label>
            <textarea ref={register({ required: true })} onChange={handleInputChange}
              value={myTask.todo} type="text" name="todo" class="form-control"></textarea>
            <div className="error text-danger">
              {errors.todo && myTaskValidation.todo}
              </div>
          </div>

          <div class="form-group col-md-12">
            <label>date échéance<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={myTask.due_date} type="date" name="due_date" class="form-control datepicker" />
            <div className="error text-danger">
              {errors.due_date && myTaskValidation.due_date}
            </div>
          </div>

        </div>

        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button>
      </form>
    </div>
  )
};

AddMyTask.propTypes = {};

AddMyTask.defaultProps = {};

export default AddMyTask;
