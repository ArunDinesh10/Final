import React, { useState } from "react";
import axios from "axios";
import "../PersonalInfo/PersonalInfo.css"; // Reuse the same CSS file for consistent styling

const Experience = ({ nextStep, prevStep, handleChange, formData, userId }) => {
  const [experiences, setExperiences] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    responsibilities: [],
  });

  const [responsibility, setResponsibility] = useState("");

  const API_BASE_URL = "https://host-wo44.onrender.com/api"; // Update to your deployed backend URL

  const addResponsibility = () => {
    if (responsibility) {
      setCurrentExperience((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibility],
      }));
      setResponsibility("");
    }
  };

  const removeResponsibility = (index) => {
    setCurrentExperience((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const addExperience = async () => {
    const newExperience = { ...currentExperience, userId };
    const responsibilitiesString = newExperience.responsibilities.join(", ");

    const dataToSend = {
      ...newExperience,
      responsibilities: responsibilitiesString,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/experience`, dataToSend);
      console.log("Experience saved:", response.data);
      setExperiences([...experiences, newExperience]);
      resetCurrentExperience();
    } catch (error) {
      console.error("Error saving experience:", error);
      alert("Failed to save experience. Please try again.");
    }
  };

  const resetCurrentExperience = () => {
    setCurrentExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      responsibilities: [],
    });
    setResponsibility("");
  };

  const handleNext = () => {
    handleChange("experience", experiences); // Pass the complete experiences array to the parent
    nextStep();
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="heading">Professional Experience</h2>

        <div className="input-row">
          <input
            className="personal-input"
            type="text"
            placeholder="Company Name"
            value={currentExperience.company}
            onChange={(e) =>
              setCurrentExperience({ ...currentExperience, company: e.target.value })
            }
            required
          />
          <input
            className="personal-input"
            type="text"
            placeholder="Position"
            value={currentExperience.position}
            onChange={(e) =>
              setCurrentExperience({ ...currentExperience, position: e.target.value })
            }
            required
          />
        </div>

        <div className="input-row">
          <input
            className="personal-input"
            type="date"
            placeholder="Start Date"
            value={currentExperience.startDate}
            onChange={(e) =>
              setCurrentExperience({ ...currentExperience, startDate: e.target.value })
            }
            required
          />
          <input
            className="personal-input"
            type="date"
            placeholder="End Date"
            value={currentExperience.endDate}
            onChange={(e) =>
              setCurrentExperience({ ...currentExperience, endDate: e.target.value })
            }
            disabled={currentExperience.isCurrent} // Disable if current job is selected
          />
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={currentExperience.isCurrent}
            onChange={(e) =>
              setCurrentExperience({ ...currentExperience, isCurrent: e.target.checked })
            }
          />
          I am currently working here
        </label>

        <div className="input-row">
          <input
            className="personal-input"
            type="text"
            placeholder="Add a responsibility"
            value={responsibility}
            onChange={(e) => setResponsibility(e.target.value)}
          />
          <button className="personal-input" onClick={addResponsibility}>
            Add Responsibility
          </button>
        </div>

        <ul className="responsibilities-list">
          {currentExperience.responsibilities.map((resp, index) => (
            <li key={index} className="responsibility-item">
              {resp}
              <button className="remove-btn" onClick={() => removeResponsibility(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="input-row">
          <button className="personal-input" onClick={addExperience}>
            Add Experience
          </button>
          <button className="personal-input" onClick={prevStep}>
            Back
          </button>
          <button className="personal-input" onClick={handleNext}>
            Next
          </button>
        </div>

        <h3>Added Experiences</h3>
        <ul>
          {experiences.map((exp, index) => (
            <li key={index}>
              {exp.company} - {exp.position} (
              {exp.startDate} to {exp.isCurrent ? "Present" : exp.endDate})
              <ul>
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
