import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditTeam.css';
import { useForm } from 'react-hook-form';
import teamHTTPService from '../../../main/services/teamHTTPService'
import noteMessage from '../../../main/messages/noteMessage';
import showMessage from '../../../libraries/messages/messages';
const EditTeam = (props) => {

  const { register, handleSubmit, errors } = useForm() // initialise the hook
  const [team, setTeam] = useState(props.team);
  const [typeSubs, setTypeSubs] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setTeam(props.team)

  }, [props.team]);


  const onSubmit = (data) => {
    console.log(data)
    teamHTTPService.editTeam(props.team.id, data).then(data => {
      props.closeModal()
      showMessage('Confirmation', "teamMessage.edit", 'success')
    }).catch(e => {
      console.log(e)
    })

  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  };




  return (
    <div className="EditTeam">
      <form method="POST" class="" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">

          <div class="form-group col-md-12">
            <label>Name<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.name}
              type="text" name="name" class="form-control" />

            <label>Minimum <span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.minimum}
              type="number" name="minimum" class="form-control" />

            <label>Maximum<span class="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.maximum}
              type="number" name="maximum" class="form-control" />




          </div>

        </div>
        <button type="submit" id="save-form" className="btn btn-success">
          <i className="fa fa-check"></i>
          <font   ><font   > Save</font></font></button></form>
    </div>
  )
};

EditTeam.propTypes = {};

EditTeam.defaultProps = {};

export default EditTeam;
