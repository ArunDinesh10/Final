import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import companyLogos from "./companyLogos";
import feature1 from "../img/telework-6795505_640.jpg";
import feature2 from "../img/feature2.png";
import feature3 from "../img/feature3.png";

const Home = () => {
  const navigate = useNavigate();

  const handleStartSearch = () => {
    navigate("/search"); 
  };
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-image">
        <div className="overlay">
          <h1>Your Dream Job Awaits At QuickJob</h1>
          <p>Discover job opportunities from top companies around the world.</p>
        </div>
      </div>
      <div className="features-container">
        <h2>Why Choose Quick Job?</h2>
        <div className="features-grid">
          <div className="feature">
            <img src={feature1} alt="Feature 1" />
            <h3>Curated Job Listings</h3>
            <p>
              We provide hand-picked job opportunities from reputable companies.
            </p>
          </div>
          <div className="feature">
            <img src={feature2} alt="Feature 2" />
            <h3>Easy Application Process</h3>
            <p>Apply with ease and track your job applications in real time.</p>
          </div>
          <div className="feature">
            <img src={feature3} alt="Feature 3" />
            <h3>Top Hiring Companies</h3>
            <p>Connect with top-tier companies hiring for various roles.</p>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="carousel-container">
        <h2>Top Companies Hiring</h2>
        <div className="carousel">
          {companyLogos.map((logo, index) => (
            <img
              src={logo}
              alt={`Company Logo ${index}`}
              className="company-logo"
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="cta-container">
        <h2>Ready to Start Your Career?</h2>
        <p class="explore">Explore thousands of job listings now!</p>
        <button onClick={handleStartSearch} className="explore-button">
        Start Your Job Search
      </button>
      </div>
    </div>
  );
};

export default Home;
