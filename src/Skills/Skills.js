import React, { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import "../PersonalInfo/PersonalInfo.css"; // Reuse the same CSS file for consistent styling

const Skills = ({ prevStep, handleChange, formData, handleSubmit }) => {
  const [skill, setSkill] = useState("");

  const saveSkill = async (skill) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/skills`, { skill });
      console.log("Skill saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  const addSkill = () => {
    if (skill.trim()) {
      handleChange("skills", [...formData.skills, skill]); // Update form data
      saveSkill(skill); // Save skill to the database
      setSkill(""); // Clear the input field
    }
  };

  const handleSubmitWithDownload = () => {
    addSkill(); // Add the last skill before submitting
    handleSubmit(); // Call the submit handler
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="heading">Skills</h2>
        <div className="input-row">
          <input
            className="personal-input"
            type="text"
            placeholder="Add a skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <button className="personal-input" onClick={addSkill}>
            Add Skill
          </button>
        </div>
        <ul className="skills-list">
          {formData.skills.map((s, index) => (
            <li key={index} className="skill-item">{s}</li>
          ))}
        </ul>
        <div className="input-row">
          <button className="personal-input" onClick={prevStep}>
            Back
          </button>
          <button className="personal-input" onClick={handleSubmitWithDownload}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
