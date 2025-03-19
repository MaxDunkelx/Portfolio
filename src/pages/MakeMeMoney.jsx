import React, { useEffect } from "react";
import "./MakeMeMoney.css";

const MakeMeMoney = () => {
  // Add the Popunder script to the <head> dynamically
  useEffect(() => {
    const popunderScript = document.createElement("script");
    popunderScript.type = "text/javascript";
    popunderScript.src =
      "//pl26157988.effectiveratecpm.com/bd/ed/dc/bdeddcae257fcbeee303140bca687dd7.js";
    document.head.appendChild(popunderScript);

    // Cleanup the script on component unmount
    return () => {
      document.head.removeChild(popunderScript);
    };
  }, []);

  // Add the Social Bar script to the <body> dynamically
  useEffect(() => {
    const socialBarScript = document.createElement("script");
    socialBarScript.type = "text/javascript";
    socialBarScript.src =
      "//pl26114349.effectiveratecpm.com/ab/3a/6e/ab3a6eebe4401fa37f0f8e8ada0c7668.js";
    document.body.appendChild(socialBarScript);

    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(socialBarScript);
    };
  }, []);

  return (
    <div className="make-money-container">
      <h1 className="make-money-title">💰 Make Me Money 💰</h1>
      <p className="make-money-description">
        Support me by engaging with the ads below. Every click or view helps me
        earn a small commission. Thank you for your support!
      </p>

      {/* Popunder Ad Section */}
      <div className="ad-unit">
        <h2>Support Me with a Popunder Ad</h2>
        <p>
          Click the button below to view a popunder ad. It will open in a new
          window, and you can continue browsing here.
        </p>
        <button
          className="make-money-button"
          onClick={() => {
            // Trigger the popunder ad
            window.open("https://www.example.com", "_blank");
          }}
        >
          View Popunder Ad
        </button>
      </div>

      {/* Social Bar Ad Section */}
      <div className="ad-unit">
        <h2>Follow Me on Social Media</h2>
        <p>
          Check out my social media profiles below. The social bar is powered by
          ads, so your clicks help me earn!
        </p>
        {/* Social Bar Ad will be injected here by the script */}
        <div id="adsterra-social-bar"></div>
      </div>

      {/* Additional Call-to-Action */}
      <div className="ad-unit">
        <h2>Want to Support Me More?</h2>
        <p>
          If you'd like to help me out even more, consider sharing this page with
          your friends or checking out more ads. Every little bit helps!
        </p>
        <button
          className="make-money-button"
          onClick={() => {
            window.location.href = "https://www.example.com/share";
          }}
        >
          Share This Page
        </button>
      </div>
    </div>
  );
};

export default MakeMeMoney;