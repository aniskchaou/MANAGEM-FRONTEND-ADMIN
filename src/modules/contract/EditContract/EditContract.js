import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditContract.css';
import { useForm } from 'react-hook-form';
import contractHTTPService from '../../../main/services/contractHTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';
import showMessage from '../../../libraries/messages/messages';

const EditContract = ({ contract, closeModal }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    retrieveProjects();
  }, []);

  useEffect(() => {
    if (contract) {
      Object.keys(contract).forEach(key => {
        setValue(key, contract[key]);
      });
    }
  }, [contract, setValue]);

  const retrieveProjects = async () => {
    try {
      const response = await projectHTTPService.getAllProject();
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await contractHTTPService.editContract(contract.id, data);
      showMessage('Confirmation', 'Contract updated successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error updating contract:', error);
      showMessage('Error', 'Failed to update contract', 'danger');
    }
  };

  return (
    <div className="EditContract">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">

            <label>Title <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p className="text-danger">{errors.title.message}</p>}

            <label>Date <span className="text-danger">*</span></label>
            <input
              type="date"
              className="form-control"
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && <p className="text-danger">{errors.date.message}</p>}

            <label>Client</label>
            <select className="form-control" {...register('client')}>
              <option value="Mike Dean">Mike Dean</option>
              <option value="John Doe">John Doe</option>
            </select>

            <label>Project <span className="text-danger">*</span></label>
            <select
              className="form-control"
              {...register('project', { required: 'Project selection is required' })}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
            {errors.project && <p className="text-danger">{errors.project.message}</p>}

            <label>Company <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              {...register('company', { required: 'Company name is required' })}
            />
            {errors.company && <p className="text-danger">{errors.company.message}</p>}

            <label>Value <span className="text-danger">*</span></label>
            <input
              type="number"
              className="form-control"
              {...register('contractValue', { required: 'Contract value is required' })}
            />
            {errors.contractValue && <p className="text-danger">{errors.contractValue.message}</p>}

            <label>Contract Type <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              {...register('contractType', { required: 'Contract type is required' })}
            />
            {errors.contractType && <p className="text-danger">{errors.contractType.message}</p>}

            <label>Website <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              {...register('website', { required: 'Website is required' })}
            />
            {errors.website && <p className="text-danger">{errors.website.message}</p>}

            <label>Start Date <span className="text-danger">*</span></label>
            <input
              type="date"
              className="form-control"
              {...register('startDate', { required: 'Start date is required' })}
            />
            {errors.startDate && <p className="text-danger">{errors.startDate.message}</p>}

            <label>End Date <span className="text-danger">*</span></label>
            <input
              type="date"
              className="form-control"
              {...register('endDate', { required: 'End date is required' })}
            />
            {errors.endDate && <p className="text-danger">{errors.endDate.message}</p>}

            <label>Description <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-danger">{errors.description.message}</p>}

          </div>
        </div>

        <button type="submit" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

export default EditContract;
