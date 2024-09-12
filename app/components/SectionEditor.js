import React, { useState } from "react";

const SectionEditor = ({ section, onSave }) => {
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...section, title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default SectionEditor;
