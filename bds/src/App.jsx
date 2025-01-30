import React, { useState } from "react";
import Login from "../components/login.jsx";
import Register from "../components/Register.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home.jsx";
import Availability from "../components/Availability.jsx";
import About from "../components/About.jsx";
import Contact from "../components/Contact.jsx";
import Donor from "../components/Donor.jsx";
import RecipientRequest from "../components/RecipientRequest.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Determines whether to show the Register page or not

  return (
    <Router>
      <div>
        <Routes>
          
          <Route
            path="/"
           element={<Login/>}
          />

          <Route
            path="/Register"
            element={
              <Register
                setIsRegistering={setIsRegistering} 
                setIsLoggedIn={setIsLoggedIn} 
              />
            }
          />

          
          <Route
            path="/Home"
            element={<Home />} 
          />

          
          <Route
            path="/Availability"
            element={ <Availability />}
          />
          <Route
            path="/About"
            element={ <About  />}
          />
          <Route
            path="/Contact"
            element={<Contact />}
          />
          <Route
            path="/Donor"
            element={<Donor />}
          />
          <Route
          path="/RecipientRequest"
          element={<RecipientRequest />}
          />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
