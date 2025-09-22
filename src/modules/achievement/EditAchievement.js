import React from 'react';

const EditAchievement = ({ achievement, closeModal }) => {
  return (
    <div>
      <h5>Edit Achievement</h5>
      {/* Edit achievement form goes here */}
      <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
    </div>
  );
};

export default EditAchievement;
