import React from "react";

const Summary = ({ summary, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{summary.body}</h3>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Summary;
