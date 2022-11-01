import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AddContract.css';
import contractHTTPService from '../../../main/services/contractHTTPService';

import noteMessage from '../../../main/messages/noteMessage';
import { useForm } from 'react-hook-form';
import projectHTTPService from '../../../main/services/projectHTTPService';
import showMessage from '../../../libraries/messages/messages';

const AddContract = (props) => {
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
  const [projects, setProjects] = useState([]);
  const onSubmit = (data) => {
    //saveNote(data)
    // NoteTestService.create(data)
    contractHTTPService.createContract(data).then(data => {
      setContract(initialState)
      showMessage('Confirmation', noteMessage.add, 'success')
      props.closeModal()
    })

  }

  useEffect(() => {
    retrieveProjects()
  }, []);

  const retrieveProjects = () => {
    //var projects = ProjectTestService.getAll();

    projectHTTPService.getAllProject().then(data => {
      console.log(data.data)
      setProjects(data.data);

    })

  };



  const handleInputChange = event => {
    const { name, value } = event.target;
    setContract({ ...contract, [name]: value });
  };

  return (
    <div className="AddContract">



      <div className="AddNote">
        <form class="" onSubmit={handleSubmit(onSubmit)}>
          <div class="row">

            <div class="form-group col-md-12">

              <label>Title<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.title}
                type="text" name="title" class="form-control" />

              <label>Date<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.date}
                type="date" name="date" class="form-control" />


              <div class="form-group">
                <label>Client</label>
                <select ref={register({ required: true })} onChange={handleInputChange} value={contract.client}
                  name="client" class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
                >
                  <option value="Mike Dean">Mike Dean</option>
                  <option value="John Doe">John Doe</option>
                </select>

              </div>



              <div className="form-group">
                <label>Project<span className="text-danger">*</span></label>
                <select ref={register({ required: true })} onChange={handleInputChange}
                  value={contract.project} name="project" id="project"
                  class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow" tabIndex="-1" aria-hidden="true">

                  <option value="Projet 1">Project</option>
                </select>
              </div>

              <label>Company<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.company}
                type="text" name="company" class="form-control" />

              <label>Value<span class="text-danger">*</span></label>
              <div class="input-group mb-3">
                <input ref={register({ required: true })} onChange={handleInputChange} value={contract.contractValue}
                  type="number" name="contractValue" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2"> $</span>
                </div>
              </div>

              <label>Type<span class="text-danger">*</span></label>
              <select ref={register({ required: true })} onChange={handleInputChange} value={contract.contractType} name="contractType" id="project"
                class="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow" tabIndex="-1" aria-hidden="true">

                <option value="Fixed-price contracts">Fixed-price contracts</option>
                <option value="Cost-reimbursable Contracts">Cost-reimbursable Contracts</option>
                <option value="Time and materials (T&M)">Time and materials (T&M):</option>
              </select>

              <label>Website<span class="text-danger">*</span></label>


              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">https://</span>
                </div>
                <input ref={register({ required: true })} onChange={handleInputChange} value={contract.website}
                  type="text" name="website" class="form-control" />
              </div>


              <label>Start<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.startDate}
                type="date" name="startDate" class="form-control" />


              <label>End<span class="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.endDate}
                type="date" name="endDate" class="form-control" />

              <label>Description<span class="text-danger">*</span></label>
              <textarea ref={register({ required: true })} onChange={handleInputChange} value={contract.description}
                type="text" name="description" class="form-control" ></textarea>

            </div>

          </div>
          <button type="submit" id="save-form" className="btn btn-success">
            <i className="fa fa-check"></i>
            <font   ><font   > Save</font></font></button>
        </form>
      </div>

    </div>
  )
};

AddContract.propTypes = {};

AddContract.defaultProps = {};

export default AddContract;
