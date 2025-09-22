import React from 'react';

const AddAchievement = ({ closeModal }) => {
  return (
    <div>
      <h5>Add Achievement</h5>
      {/* Add achievement form goes here */}
      <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
    </div>
  );
};

export default AddAchievement;
