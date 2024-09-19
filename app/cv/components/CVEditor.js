"use client";

import React, { useState, useEffect } from "react";
import BasicSection from "./sections/Section";
import SkillsSection from "./sections/Skills";
import CertificationsSection from "./sections/Certifications";

const CVEditor = () => {
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch("/api/sections");
        const data = await res.json();
        setSections(data.sections || []);
      } catch (error) {
        console.error("Failed to fetch sections:", error);
      }
    };
    fetchSections();
  }, []);

  const addSection = async (type) => {
    const newSection = { type, id: Date.now(), title: "", content: "" };

    try {
      const res = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSection),
      });

      const data = await res.json();
      setSections((prevSections) => [...prevSections, data]);
    } catch (error) {
      console.error("Failed to add section:", error);
    }
  };

  const saveSection = async (section) => {
    try {
      await fetch(`/api/sections/${section.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });
      setSections((prevSections) =>
        prevSections.map((s) => (s.id === section.id ? section : s))
      );
      setEditingSection(null);
    } catch (error) {
      console.error("Failed to save section:", error);
    }
  };

  const deleteSection = async (id) => {
    try {
      await fetch(`/api/sections/${id}`, {
        method: "DELETE",
      });
      setSections((prevSections) =>
        prevSections.filter((section) => section.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete section:", error);
    }
  };

  const renderSection = (section) => {
    switch (section.type) {
      case "skills":
        return (
          <SkillsSection
            key={section.id}
            section={section}
            onEdit={() => setEditingSection(section)}
            onDelete={() => deleteSection(section.id)}
          />
        );
      case "certifications":
        return (
          <CertificationsSection
            key={section.id}
            section={section}
            onEdit={() => setEditingSection(section)}
            onDelete={() => deleteSection(section.id)}
          />
        );
      case "basic":
      default:
        return (
          <BasicSection
            key={section.id}
            section={section}
            onEdit={() => setEditingSection(section)}
            onDelete={() => deleteSection(section.id)}
          />
        );
    }
  };

  return (
    <div className="editor-container">
      <button onClick={() => addSection("basic")}>Add Basic Section</button>
      <button onClick={() => addSection("skills")}>Add Skills Section</button>
      <button onClick={() => addSection("certifications")}>
        Add Certifications Section
      </button>

      {sections.map((section) => renderSection(section))}

      {editingSection && (
        <SectionEditor section={editingSection} onSave={saveSection} />
      )}
    </div>
  );
};

export default CVEditor;
