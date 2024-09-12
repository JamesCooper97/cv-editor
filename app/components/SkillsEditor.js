import React, { useState } from "react";

const SkillsEditor = ({ skill, onSave }) => {
  const [name, setName] = useState(skill.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...skill, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Skill</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default SkillsEditor;
