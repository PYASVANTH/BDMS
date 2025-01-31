








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../src/styles/Availability.css";

// const Availability = () => {
//   const [bloodData, setBloodData] = useState([]);

//   // Fetch availability data from the backend
//   const fetchAvailability = async () => {
//     try {
//       const response = await axios.get("https://bdms-igj8.onrender.com/api/availability");
//       setBloodData(response.data.availability); // Assume the backend sends `{ availability: [...] }`
//     } catch (error) {
//       console.error("Error fetching availability data:", error.message);
//       alert("Failed to load availability data.");
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchAvailability();
//   }, []);

//   return (
//     <div className="availability-container">
//       <h1>
//         <span className="blood-symbol">💉</span> Blood Donation Availability
//       </h1>
//       <p>Check the availability of blood for different blood types.</p>

//       <table className="availability-table">
//         <thead>
//           <tr>
//             <th>Blood Type</th>
//             <th>Available Units</th>
//             <th>Location</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bloodData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.bloodType}</td>
//               <td>{data.availableUnits}</td>
//               <td>{data.location}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Availability;





import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/styles/Availability.css";

const Availability = () => {
  const [bloodData, setBloodData] = useState([]);
  const [error, setError] = useState("");

  // Fetch availability data from the backend
  const fetchAvailability = async () => {
    try {
      const response = await axios.get("https://bdms-igj8.onrender.com/api/availability");
      if (response.data.success) {
        setBloodData(response.data.availability);
      }
    } catch (error) {
      console.error("Error fetching availability data:", error.message);
      setError("Failed to load availability data. Please try again.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div className="availability-container">
      <h1>
        <span className="blood-symbol">💉</span> Blood Donation Availability
      </h1>
      <p>Check the availability of blood for different blood types.</p>

      {error && <p className="error-message">{error}</p>}

      <table className="availability-table">
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Available Units</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {bloodData.map((data, index) => (
            <tr key={index}>
              <td>{data.bloodType}</td>
              <td>{data.availableUnits}</td>
              <td>{data.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Availability;
