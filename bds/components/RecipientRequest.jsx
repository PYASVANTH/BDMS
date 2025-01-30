



import React, { useState } from "react";
import axios from "axios";
import "../src/styles/RecepientRequest.css";

const RecipientRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    location: "",
  });

  const [requests, setRequests] = useState([]); 
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/recipient", {
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        location: formData.location,
      });

      if (response.data.success) {
        setSuccessMessage("Recipient request submitted successfully!");
        setRequests([...requests, response.data.recipient]); // Update the requests list
        setFormData({ name: "", bloodGroup: "", location: "" }); // Reset the form
      }
    } catch (error) {
      console.error("Error submitting recipient request:", error.message);
      setError(
        error.response?.data?.message || "Failed to submit recipient request. Please try again."
      );
    }
  };

  return (
    <div className="recipient-request-container">
      <h1>Recipient Blood Request</h1>
      <form className="request-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="bloodGroup"
            placeholder="Required Blood Group (e.g., A+, O-)"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit Request</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="request-list">
        <h2>Recipient Requests</h2>
        <ul>
          {requests.map((request) => (
            <li key={request._id} className="request-item">
              <strong>{request.name}</strong> needs <strong>{request.bloodGroup}</strong> blood at <em>{request.location}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipientRequest;
