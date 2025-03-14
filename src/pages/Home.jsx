import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

import "./Home.css";

const Home = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -9999, y: -9999 });
  const animationFrame = useRef();

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    animationFrame.current = requestAnimationFrame(() => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    });
  };

  // Handle touch movement
  const handleTouchMove = (e) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    animationFrame.current = requestAnimationFrame(() => {
      const touch = e.touches[0];
      setCursorPosition({ x: touch.clientX, y: touch.clientY });
    });
  };

  // Reset position when mouse/touch leaves
  const handleMouseLeave = () => {
    setCursorPosition({ x: -9999, y: -9999 });
  };

  return (
    <div
      className="home-container"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
    >
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/HomePage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Image (Logo) with "X" Mask Effect */}
      <div
        className="overlay-image"
        style={{
          "--x": `${cursorPosition.x}px`,
          "--y": `${cursorPosition.y}px`,
        }}
      ></div>

      {/* Content Over the Video */}
      <div className="overlay">
      

        {/* Hero Section */}
        <div className="hero-section fade-in">
          <h1>Welcome to My Portfolio</h1>
          <h2>Your Vision, My Code. Let's Build Something Amazing.</h2>
          <p>
            Hi, I'm Max! A passionate full-stack developer specializing in
            creating modern, responsive, and high-performance web applications.
          </p>
        </div>

        {/* QR Code */}
        <div className="qr-section fade-in">
          <h3>Scan the QR Code to Visit My Website</h3>
          <QRCodeCanvas
            value="https://my-new-portfolio-teal-nine.vercel.app"
            size={180}
            includeMargin={true}
            level="H"
          />
        </div>

        {/* CTA Button */}
        <button className="cta-button fade-in">Explore My Work</button>
      </div>
    </div>
  );
};

export default Home;