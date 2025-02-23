import './AddMyTask.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import myTaskMessage from '../../../main/messages/myTaskMessage';
import myTaskValidation from '../../../main/validations/myTaskValidation';
import MyTaskTestService from '../../../main/mocks/MyTaskTestService';
import HTTPService from '../../../main/services/HTTPService';

const AddMyTask = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      todo: '',
      due_date: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await MyTaskTestService.create(data);
      showMessage('Confirmation', myTaskMessage.add, 'success');
      setValue('todo', '');
      setValue('due_date', '');
    } catch (error) {
      console.error('Error saving task:', error);
      showMessage('Error', 'Failed to save task', 'danger');
    }
  };

  return (
    <div className="AddMyTask">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* Task Input */}
          <div className="form-group col-md-12">
            <label>Task <span className="text-danger">*</span></label>
            <textarea
              {...register('todo', { required: myTaskValidation.todo })}
              className="form-control"
              placeholder="Enter task description..."
            ></textarea>
            {errors.todo && <p className="text-danger">{errors.todo.message}</p>}
          </div>

          {/* Due Date Input */}
          <div className="form-group col-md-12">
            <label>Due Date <span className="text-danger">*</span></label>
            <input
              type="date"
              {...register('due_date', { required: myTaskValidation.due_date })}
              className="form-control datepicker"
            />
            {errors.due_date && <p className="text-danger">{errors.due_date.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

export default AddMyTask;
