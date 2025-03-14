import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/AboutPage.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="about-content">
        <h1 className="fade-in">About Me</h1>
        <p className="fade-in">
          Hi, I'm Maxim Dunkel, a passionate software developer with a love for solving complex problems and building innovative solutions. 
          I specialize in AI, data processing, and scalable systems.
        </p>
        <p className="fade-in">
          Outside of coding, I have a deep love for sports and adventure. I enjoy playing tennis, sailing yachts, scuba diving, and running. 
          The thrill of the sea, the challenge of a good match, and the endurance of running keep me motivated.
        </p>

        {/* Social Media Links */}
        <div className="social-links fade-in">
          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/max-dunkel-404915352/" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin-icon.png" alt="LinkedIn" className="social-icon" />
          </a>

          {/* Instagram Icon */}
          <a href="https://www.instagram.com/dunkelmax/" target="_blank" rel="noopener noreferrer">
            <img src="/instagram-icon.png" alt="Instagram" className="social-icon" />
          </a>

          {/* GitHub Icon */}
          <a href="https://github.com/MaxDunkelx" target="_blank" rel="noopener noreferrer">
            <img src="/github-icon.png" alt="GitHub" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;