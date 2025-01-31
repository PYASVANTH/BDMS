import React, { useState } from "react";
import axios from "axios";
import "../src/styles/donor.css";

const Donor = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://bdms-igj8.onrender.com/api/donations", {
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        location: formData.location,
      });

      console.log("API Response:", response.data);

      // Validate the API response before updating requests
      if (response.data.success && response.data.donation) {
        setRequests([...requests, response.data.donation]); // Add the new request
        alert("Donation request added successfully!");

        // Optional: Update availability
        const availabilityResponse = await axios.get(
          "https://bdms-igj8.onrender.com/api/availability"
        );
        console.log("Updated Availability:", availabilityResponse.data);
      } else {
        console.error("Invalid response data:", response.data);
        alert("Error: Unexpected response from the server.");
      }

      setFormData({ name: "", bloodGroup: "", location: "" }); // Reset the form
    } catch (error) {
      console.error("Error submitting donation request:", error.message);
      alert("Error submitting donation request. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <h1>Blood Donation Platform</h1>
      <form className="add-request-form" onSubmit={handleFormSubmit}>
        <h2>Add New Donation Request</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <button type="submit">Add Request</button>
      </form>

      <div className="request-list">
        <h2>Donation Requests</h2>
        <ul>
          {requests.map((request, index) => (
            <li key={index}>
              <strong>{request.name}</strong> - {request.bloodGroup} <br />
              Location: {request.location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Donor;


  