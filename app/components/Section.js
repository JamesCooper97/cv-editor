import React from "react";

const Section = ({ section, onEdit, onDelete }) => {
  return (
    <div>
      <h2>{section.title}</h2>
      <p>{section.content}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Section;
