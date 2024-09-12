"use client";

import React, { useState, useEffect, useCallback } from "react";
import Section from "./Section";
import SectionEditor from "./SectionEditor";
import Skills from "./Skills";
import SkillsEditor from "./SkillsEditor";
import Certifications from "./Certifications";
import CertificationsEditor from "./CertificationsEditor";
import { saveData, loadData } from "../utils/storage";

const CVEditor = () => {
  const [sections, setSections] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingCertification, setEditingCertification] = useState(null);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const data = loadData();
    console.log("Loaded data from local storage:", data); // Debugging line

    if (data.sections && Array.isArray(data.sections)) {
      console.log("Setting sections:", data.sections); // Debugging line
      data.sections.forEach(initSection);
    } else {
      console.warn(
        "Loaded sections data is not an array or undefined:",
        data.sections
      );
    }

    if (data.skills && Array.isArray(data.skills)) {
      console.log("Setting skills:", data.skills); // Debugging line
      setSkills(data.skills);
    } else {
      console.warn(
        "Loaded skills data is not an array or undefined:",
        data.skills
      );
    }

    if (data.certifications && Array.isArray(data.certifications)) {
      console.log("Setting certifications:", data.certifications); // Debugging line
      setCertifications(data.certifications);
    } else {
      console.warn(
        "Loaded certifications data is not an array or undefined:",
        data.certifications
      );
    }
  }, []);

  // Save data to local storage whenever there is a change
  useEffect(() => {
    console.log("Saving data to local storage:", {
      sections,
      skills,
      certifications,
    }); // Debugging line
    saveData({ sections, skills, certifications });
  }, [sections, skills, certifications]);

  // Log state updates for debugging
  useEffect(() => {
    console.log("Sections state updated:", sections);
  }, [sections]);

  useEffect(() => {
    console.log("Skills state updated:", skills);
  }, [skills]);

  useEffect(() => {
    console.log("Certifications state updated:", certifications);
  }, [certifications]);

  const addSection = () => {
    const newSection = { title: "", content: "", id: Date.now() };
    console.log("Adding section:", newSection); // Debugging line
    setSections((prevSections) => {
      const updatedSections = [...prevSections, newSection];
      console.log("Updated sections:", updatedSections); // Debugging line
      return updatedSections;
    });
  };

  const addSkill = () => {
    const newSkill = { name: "", id: Date.now() };
    console.log("Adding skill:", newSkill); // Debugging line
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills, newSkill];
      console.log("Updated skills:", updatedSkills); // Debugging line
      return updatedSkills;
    });
  };

  const addCertification = () => {
    const newCertification = { name: "", id: Date.now() };
    console.log("Adding certification:", newCertification); // Debugging line
    setCertifications((prevCertifications) => {
      const updatedCertifications = [...prevCertifications, newCertification];
      console.log("Updated certifications:", updatedCertifications); // Debugging line
      return updatedCertifications;
    });
  };

  const initSection = (section) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections, section];
      console.log("Updated sections:", updatedSections); // Debugging line
      return updatedSections;
    });
  };

  const saveSection = (section) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.map((s) =>
        s.id === section.id ? section : s
      );
      console.log("Saved section:", updatedSections); // Debugging line
      return updatedSections;
    });
    setEditingSection(null);
  };

  const saveSkill = (skill) => {
    setSkills((prevSkills) => {
      const updatedSkills = prevSkills.map((s) =>
        s.id === skill.id ? skill : s
      );
      console.log("Saved skill:", updatedSkills); // Debugging line
      return updatedSkills;
    });
    setEditingSkill(null);
  };

  const saveCertification = (certification) => {
    setCertifications((prevCertifications) => {
      const updatedCertifications = prevCertifications.map((c) =>
        c.id === certification.id ? certification : c
      );
      console.log("Saved certification:", updatedCertifications); // Debugging line
      return updatedCertifications;
    });
    setEditingCertification(null);
  };

  const deleteSection = (id) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.filter(
        (section) => section.id !== id
      );
      console.log("Deleted section:", updatedSections); // Debugging line
      return updatedSections;
    });
  };

  const deleteSkill = (id) => {
    setSkills((prevSkills) => {
      const updatedSkills = prevSkills.filter((skill) => skill.id !== id);
      console.log("Deleted skill:", updatedSkills); // Debugging line
      return updatedSkills;
    });
  };

  const deleteCertification = (id) => {
    setCertifications((prevCertifications) => {
      const updatedCertifications = prevCertifications.filter(
        (certification) => certification.id !== id
      );
      console.log("Deleted certification:", updatedCertifications); // Debugging line
      return updatedCertifications;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="editor-container">
      <div className="contacts-section">Contact 2</div>
      <div className="content-container">
        <div className="left-column">
          <button onClick={addSection}>Add Section</button>
          {sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              onEdit={() => setEditingSection(section)}
              onDelete={() => deleteSection(section.id)}
            />
          ))}
          {editingSection && (
            <SectionEditor section={editingSection} onSave={saveSection} />
          )}
        </div>
        <div className="right-column">
          <button onClick={addSkill}>Add Skill</button>
          {skills.map((skill) => (
            <Skills
              key={skill.id}
              skill={skill}
              onEdit={() => setEditingSkill(skill)}
              onDelete={() => deleteSkill(skill.id)}
            />
          ))}
          {editingSkill && (
            <SkillsEditor skill={editingSkill} onSave={saveSkill} />
          )}
          <button onClick={addCertification}>Add Certification</button>
          {certifications.map((certification) => (
            <Certifications
              key={certification.id}
              certification={certification}
              onEdit={() => setEditingCertification(certification)}
              onDelete={() => deleteCertification(certification.id)}
            />
          ))}
          {editingCertification && (
            <CertificationsEditor
              certification={editingCertification}
              onSave={saveCertification}
            />
          )}
        </div>
      </div>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default CVEditor;
