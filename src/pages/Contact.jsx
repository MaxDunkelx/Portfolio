import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/ContactPage.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="contact-content">
        <h1 className="fade-in">Contact Me</h1>
        <p className="fade-in">📞 Phone: 054-3073383</p>
        <p className="fade-in">📧 Email: MaximDunkelx@gmail.com</p>
        <p className="fade-in">🌍 Location: Ramat HaSharon, Tel Aviv District</p>

        {/* Social Media Links */}
        <div className="social-links fade-in">
          <a href="https://www.linkedin.com/in/max-dunkel-404915352/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/dunkelmax/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
