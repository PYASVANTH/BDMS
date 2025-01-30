import React from "react";
import "../src/styles/About.css";
import { Link } from "react-router-dom";


const About = () => {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1>About Blood Donation</h1>
        <p>Your contribution can save lives!</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Why Donate Blood?</h2>
          <p>
            Every year, millions of people around the world need blood to survive. From trauma victims to those undergoing surgeries, blood donations are crucial for saving lives. Donating blood is simple, quick, and can make a huge difference.
          </p>
        </div>

        <div className="about-info">
          <h2>How Does Blood Donation Help?</h2>
          <ul>
            <li>Helps in emergencies like accidents or surgeries</li>
            <li>Supports cancer patients and people with blood disorders</li>
            <li>Maintains a steady supply of blood in hospitals</li>
          </ul>
        </div>
      </section>

      <section className="cta">
        <h2>Be a Hero Today</h2>
        <p>Your small act of kindness can save multiple lives.</p>
        <button className="cta-btn">
  <Link to="/Donor" className="cta-btn">
    Go to Donor
  </Link>
</button>


      </section>
    </div>
  );
};

export default About;
