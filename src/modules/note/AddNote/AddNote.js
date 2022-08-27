import './AddNote.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages'
import noteMessage from '../../../main/messages/noteMessage'
import noteValidation from '../../../main/validations/noteValidation'
import NoteTestService from '../../../main/mocks/NoteTestService';
import HTTPService from '../../../main/services/HTTPService';
import noteHTTPService from '../../../main/services/noteHTTPService';


const AddNote = () => {
  const initialState = {

    description: "",
    name: ""

  };

  const { register, handleSubmit, errors } = useForm()
  const [note, setNote] = useState(initialState);

  const onSubmit = (data) => {
    //saveNote(data)
    // NoteTestService.create(data)
    noteHTTPService.createNote(data).then(data => {
      setNote(initialState)
      showMessage('Confirmation', noteMessage.add, 'success')
    })

  }



  const handleInputChange = event => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  return (
    <div className="AddNote">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">

          <div class="form-group col-md-12">
            <label>Note<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={note.name}
              type="text" name="name" class="form-control" />



            <label>Note<span class="text-danger">*</span></label>
            <textarea ref={register({ required: true })} onChange={handleInputChange} value={note.description}
              type="text" name="description" class="form-control"></textarea>
            <div className="error text-danger">
              {errors.description && noteValidation.description}
            </div>
          </div>

        </div>
        <button type="submit" id="save-form" className="btn btn-success">
          <i className="fa fa-check"></i>
          <font   ><font   > Sauvegarder</font></font></button></form>
    </div>
  )
};

AddNote.propTypes = {};

AddNote.defaultProps = {};

export default AddNote;
