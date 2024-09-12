import React from "react";

const Certifications = ({ certification, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{certification.name}</h3>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Certifications;
