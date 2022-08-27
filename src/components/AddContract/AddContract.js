import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddContract.css';
import contractHTTPService from '../../main/services/contractHTTPService';
import showMessage from '../../libraries/messages/messages';
import noteMessage from '../../main/messages/noteMessage';
import { useForm } from 'react-hook-form';

const AddContract = () => {
  const initialState = {

    title: "",
    date: "",
    client: "",
    project: "",
    company: "",
    note: "",
    contractValue: "",
    contractType: "",
    website: "",
    startDate: "",
    endDate: "",
    description: ""

  };

  const { register, handleSubmit, errors } = useForm()
  const [contract, setContract] = useState(initialState);

  const onSubmit = (data) => {
    //saveNote(data)
    // NoteTestService.create(data)
    contractHTTPService.createContract(data).then(data => {
      setContract(initialState)
      showMessage('Confirmation', noteMessage.add, 'success')
    })

  }



  const handleInputChange = event => {
    const { name, value } = event.target;
    setContract({ ...contract, [name]: value });
  };

  return (
    <div className="AddContract">



      <div className="AddNote">
        <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>
          <div class="row">

            <div class="form-group col-md-12">

              <label>Title<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.title}
                type="text" name="title" class="form-control" />

              <label>date<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.date}
                type="text" name="date" class="form-control" />

              <label>client<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.client}
                type="text" name="client" class="form-control" />

              <label>project<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.project}
                type="text" name="project" class="form-control" />

              <label>company<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.company}
                type="text" name="company" class="form-control" />

              <label>contractValue<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.contractValue}
                type="text" name="contractValue" class="form-control" />


              <label>contractType<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.contractType}
                type="text" name="contractType" class="form-control" />

              <label>website<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.website}
                type="text" name="website" class="form-control" />

              <label>startDate<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.startDate}
                type="text" name="startDate" class="form-control" />


              <label>endDate<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.endDate}
                type="text" name="endDate" class="form-control" />

              <label>description<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.description}
                type="text" name="description" class="form-control" />






            </div>

          </div>
          <button type="submit" id="save-form" className="btn btn-success">
            <i className="fa fa-check"></i>
            <font   ><font   > Sauvegarder</font></font></button></form>
      </div>

    </div>
  )
};

AddContract.propTypes = {};

AddContract.defaultProps = {};

export default AddContract;
