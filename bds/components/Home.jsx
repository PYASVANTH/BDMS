import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../src/styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.removeItem("authToken");  

    
    navigate("/");  
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">Blood Donation App</div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/Availability">Availability</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="home-content">
        <section className="hero">
          <h1>Welcome to the Blood Donation App</h1>
          <p>Connecting lifesavers with those in need.</p>
          <div className="cta-buttons">
            <Link to="/Donor" className="cta-btn">
              Become a Donor
            </Link>
            <Link to="/RecipientRequest" className="cta-btn">
              Request Blood
            </Link>
          </div>
        </section>

        <section className="info">
          <h2>Why Donate Blood?</h2>
          <p>
            Donating blood saves lives and ensures that those in need get the
            treatment they deserve. Be a hero today by donating blood!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
