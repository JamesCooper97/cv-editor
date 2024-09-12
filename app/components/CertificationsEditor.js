import React, { useState } from "react";

const CertificationsEditor = ({ certification, onSave }) => {
  const [name, setName] = useState(certification.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...certification, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Certification</label>
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

export default CertificationsEditor;
