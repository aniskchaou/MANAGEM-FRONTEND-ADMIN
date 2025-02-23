import './AddNote.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import noteMessage from '../../../main/messages/noteMessage';
import noteValidation from '../../../main/validations/noteValidation';
import noteHTTPService from '../../../main/services/noteHTTPService';

const AddNote = ({ closeModal }) => {
  const initialState = {
    description: '',
    name: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [note, setNote] = useState(initialState);

  const onSubmit = (data) => {
    noteHTTPService.createNote(data).then(() => {
      setNote(initialState);
      showMessage('Confirmation', noteMessage.add, 'success');
      closeModal();
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  return (
    <div className="AddNote">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>
              Title<span className="text-danger">*</span>
            </label>
            <input
              {...register('name', { required: true })}
              onChange={handleInputChange}
              value={note.name}
              type="text"
              name="name"
              className="form-control"
            />

            <label>
              Description<span className="text-danger">*</span>
            </label>
            <textarea
              {...register('description', { required: true })}
              onChange={handleInputChange}
              value={note.description}
              name="description"
              className="form-control"
            ></textarea>

            {errors.description && (
              <div className="error text-danger">{noteValidation.description}</div>
            )}
          </div>
        </div>

        <button type="submit" id="save-form" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

export default AddNote;
