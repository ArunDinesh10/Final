import React, { useState, useEffect } from "react";
import { apiClient } from "../api/apiClient"; // Ensure this path is correct
import "./JobAlertsPage.css";

const JobAlertsPage = () => {
  const [jobAlerts, setJobAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    keywords: "",
    location: "",
    category: "",
  });
  const [editingAlert, setEditingAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    fetchJobAlerts();
  }, []);

  const fetchJobAlerts = async () => {
    try {
      const response = await apiClient.get("/job-alerts", {
        params: { user_id: userId },
      });
      setJobAlerts(response.data);
    } catch (error) {
      console.error("Error fetching job alerts:", error);
      alert("Failed to fetch job alerts. Please try again later.");
    }
  };

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/job-alerts", {
        user_id: userId,
        ...newAlert,
      });
      fetchJobAlerts();
      setNewAlert({ keywords: "", location: "", category: "" });
      alert(response.data.message);
    } catch (error) {
      console.error("Error creating job alert:", error);
      alert("Failed to create job alert. Please try again.");
    }
  };

  const handleDeleteAlert = async (alertId) => {
    if (window.confirm("Are you sure you want to delete this alert?")) {
      try {
        await apiClient.delete(`/job-alerts/${alertId}`);
        fetchJobAlerts();
        alert("Job alert deleted successfully.");
      } catch (error) {
        console.error("Error deleting job alert:", error);
        alert("Failed to delete job alert. Please try again.");
      }
    }
  };

  const handleEditAlert = (alert) => {
    setEditingAlert(alert);
    setNewAlert({
      keywords: alert.keywords,
      location: alert.location,
      category: alert.category,
    });
    setShowModal(true);
  };

  const handleUpdateAlert = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(
        `/job-alerts/${editingAlert.alert_id}`,
        { ...newAlert }
      );
      fetchJobAlerts();
      setShowModal(false);
      setEditingAlert(null);
      setNewAlert({ keywords: "", location: "", category: "" });
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating job alert:", error);
      alert("Failed to update job alert. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAlert(null);
    setNewAlert({ keywords: "", location: "", category: "" });
  };

  return (
    <div className="job-alerts-page-container">
      <h2 className="page-title">Manage Your Job Alerts</h2>
      <form className="alert-form" onSubmit={handleCreateAlert}>
        <div className="form-group">
          <label htmlFor="keywords">Keywords</label>
          <div className="input-mic-container">
            <input
              type="text"
              id="keywords"
              placeholder="Enter keywords"
              value={newAlert.keywords}
              onChange={(e) =>
                setNewAlert({ ...newAlert, keywords: e.target.value })
              }
              className="input-field"
              required
            />
            <button
              type="button"
              className="mic-button"
              onClick={() => console.log("Listening for keywords")}
            >
              🎤
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <div className="input-mic-container">
            <input
              type="text"
              id="location"
              placeholder="Enter location"
              value={newAlert.location}
              onChange={(e) =>
                setNewAlert({ ...newAlert, location: e.target.value })
              }
              className="input-field"
              required
            />
            <button
              type="button"
              className="mic-button"
              onClick={() => console.log("Listening for location")}
            >
              🎤
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <div className="input-mic-container">
            <input
              type="text"
              id="category"
              placeholder="Enter category"
              value={newAlert.category}
              onChange={(e) =>
                setNewAlert({ ...newAlert, category: e.target.value })
              }
              className="input-field"
              required
            />
            <button
              type="button"
              className="mic-button"
              onClick={() => console.log("Listening for category")}
            >
              🎤
            </button>
          </div>
        </div>
        <button type="submit" className="create-alert-btn">
          Create Alert
        </button>
      </form>
    </div>
  );
};

export default JobAlertsPage;
