import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditNote.css';
import noteHTTPService from '../../../main/services/noteHTTPService';
import showMessage from '../../../libraries/messages/messages';
import noteMessage from '../../../main/messages/noteMessage';
import { useForm } from 'react-hook-form';

const EditNote = ({ note: initialNote, closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [note, setNote] = useState(initialNote);

  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);

  const onSubmit = (data) => {
    noteHTTPService.editNote(note.id, data)
      .then(() => {
        closeModal();
        showMessage('Confirmation', noteMessage.edit, 'success');
      })
      .catch((e) => console.error(e));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  return (
    <div className="EditNote">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>
              Title<span className="text-danger">*</span>
            </label>
            <input
              {...register('name', { required: true })}
              onChange={handleInputChange}
              value={note.name || ''}
              type="text"
              name="name"
              className="form-control"
            />
            {errors.name && <div className="error text-danger">Title is required</div>}

            <label>
              Description<span className="text-danger">*</span>
            </label>
            <textarea
              {...register('description', { required: true })}
              onChange={handleInputChange}
              value={note.description || ''}
              name="description"
              className="form-control"
            ></textarea>
            {errors.description && <div className="error text-danger">Description is required</div>}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="far fa-save"></i> Save
        </button>
      </form>
    </div>
  );
};

EditNote.propTypes = {
  note: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditNote;
