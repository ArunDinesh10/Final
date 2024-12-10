import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./JobApplicationPage.css";

const JobApplicationPage = () => {
  const { jobId } = useParams(); // Fetch jobId from the URL params
  const [job, setJob] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("user_id"); // Retrieve user_id from sessionStorage
  const API_BASE_URL = "https://host-wo44.onrender.com/api"; // Deployed API base URL

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!userId) {
      alert("Please log in to apply for a job.");
      navigate("/login");
    }
  }, [userId, navigate]);

  // Fetch job details when the component mounts
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [jobId, API_BASE_URL]);

  // Handle job application submission
  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId, // Use dynamic user ID
          job_id: jobId,
          status: "applied",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setApplicationStatus("Application submitted successfully!");
      setTimeout(() => navigate("/"), 3000); // Navigate back to homepage after submission
    } catch (error) {
      console.error("Error submitting application:", error);
      setApplicationStatus("Failed to submit application");
    }
  };

  if (!job) return <div>Loading job details...</div>;

  return (
    <div className="job-application-page">
      <h2>{job.job_role}</h2>
      <p>
        <strong>Description:</strong> {job.description}
      </p>
      <p>
        <strong>Requirements:</strong> {job.requirements}
      </p>

      <form onSubmit={handleApplicationSubmit} className="application-form">
        <label>
          Name:
          <input
            type="text"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Apply</button>
      </form>

      {applicationStatus && <p>{applicationStatus}</p>}
    </div>
  );
};

export default JobApplicationPage;
