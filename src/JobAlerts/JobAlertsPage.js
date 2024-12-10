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

  const API_BASE_URL = "https://host-wo44.onrender.com/api";

  useEffect(() => {
    if (!userId) {
      alert("User not logged in. Redirecting to login.");
      window.location.href = "/login";
      return;
    }
    fetchJobAlerts();
  }, [userId]);

  // Fetch job alerts
  const fetchJobAlerts = async () => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/job-alerts`, {
        params: { user_id: userId },
      });
      setJobAlerts(response.data);
    } catch (error) {
      console.error("Error fetching job alerts:", error);
      alert("Failed to fetch job alerts. Please try again.");
    }
  };

  // Create a new job alert
  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(`${API_BASE_URL}/job-alerts`, {
        user_id: userId,
        ...newAlert,
      });
      fetchJobAlerts();
      setNewAlert({ keywords: "", location: "", category: "" });
      alert("Job alert created successfully.");
    } catch (error) {
      console.error("Error creating job alert:", error);
      alert("Failed to create job alert. Please try again.");
    }
  };

  // Delete a job alert
  const handleDeleteAlert = async (alertId) => {
    if (window.confirm("Are you sure you want to delete this alert?")) {
      try {
        await apiClient.delete(`${API_BASE_URL}/job-alerts/${alertId}`);
        fetchJobAlerts();
        alert("Job alert deleted successfully.");
      } catch (error) {
        console.error("Error deleting job alert:", error);
        alert("Failed to delete job alert. Please try again.");
      }
    }
  };

  // Edit an existing job alert
  const handleEditAlert = (alert) => {
    setEditingAlert(alert);
    setNewAlert({
      keywords: alert.keywords,
      location: alert.location,
      category: alert.category,
    });
    setShowModal(true);
  };

  // Update the job alert
  const handleUpdateAlert = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`${API_BASE_URL}/job-alerts/${editingAlert.alert_id}`, {
        ...newAlert,
      });
      fetchJobAlerts();
      closeModal();
      alert("Job alert updated successfully.");
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

      {/* Create Alert Form */}
      <form className="alert-form" onSubmit={handleCreateAlert}>
        <div className="form-group">
          <label htmlFor="keywords">Keywords</label>
          <input
            type="text"
            id="keywords"
            placeholder="Enter keywords"
            value={newAlert.keywords}
            onChange={(e) =>
              setNewAlert({ ...newAlert, keywords: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Enter location"
            value={newAlert.location}
            onChange={(e) =>
              setNewAlert({ ...newAlert, location: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter category"
            value={newAlert.category}
            onChange={(e) =>
              setNewAlert({ ...newAlert, category: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="create-alert-btn">
          Create Alert
        </button>
      </form>

      {/* Job Alerts List */}
      <div className="job-alerts-list">
        {jobAlerts.length > 0 ? (
          jobAlerts.map((alert) => (
            <div className="alert-card" key={alert.alert_id}>
              <h3>{alert.keywords}</h3>
              <p><strong>Location:</strong> {alert.location}</p>
              <p><strong>Category:</strong> {alert.category}</p>
              <div className="alert-actions">
                <button onClick={() => handleEditAlert(alert)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAlert(alert.alert_id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No job alerts found.</p>
        )}
      </div>

      {/* Modal for Editing Job Alert */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Job Alert</h3>
            <form onSubmit={handleUpdateAlert}>
              <div className="form-group">
                <label htmlFor="edit-keywords">Keywords</label>
                <input
                  type="text"
                  id="edit-keywords"
                  value={newAlert.keywords}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, keywords: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-location">Location</label>
                <input
                  type="text"
                  id="edit-location"
                  value={newAlert.location}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, location: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-category">Category</label>
                <input
                  type="text"
                  id="edit-category"
                  value={newAlert.category}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, category: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="update-btn">
                  Update
                </button>
                <button type="button" onClick={closeModal} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAlertsPage;
