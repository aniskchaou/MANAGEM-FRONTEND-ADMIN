import React from 'react';
import PropTypes from 'prop-types';
import './AddMessage.css';

const AddMessage = () => (
  <div className="AddMessage">
    <form>
      <div class="form-group row">
        <label for="text1" class="col-4 col-form-label">Titre</label>
        <div class="col-8">
          <input id="text1" name="text1" type="text" class="form-control"/>
    </div>
        </div>
        <div class="form-group row">
          <label for="text" class="col-4 col-form-label">Destinataire</label>
          <div class="col-8">
            <input id="text" name="text" type="text" class="form-control"/>
    </div>
          </div>
          <div class="form-group row">
            <label for="textarea" class="col-4 col-form-label">Message</label>
            <div class="col-8">
              <textarea id="textarea" name="textarea" cols="40" rows="5" class="form-control"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <div class="offset-4 col-8">
              <button name="submit" type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
</form>
      </div>
);

AddMessage.propTypes = { };

AddMessage.defaultProps = { };

export default AddMessage;
