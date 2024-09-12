import React from "react";

const Skills = ({ skill, onEdit, onDelete }) => {
  return (
    <div className="skills-container">
      <h3>{skill.name}</h3>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Skills;
