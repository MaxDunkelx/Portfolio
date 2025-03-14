import React from "react";
import "./CV.css"; // Import CSS

const CV = () => {
  return (
    <div className="cv-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/CVPage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="cv-content">
        <h1 className="fade-in">My CV</h1>

        {/* Personal Details */}
        <div className="cv-section fade-in">
          <h2>MAXIM DUNKEL</h2>
          <p>📞 054-3073383 | 📧 MaximDunkelx@gmail.com</p>
          <p>🌐 <a href="https://github.com/MaxDunkelx" target="_blank" rel="noopener noreferrer">GitHub: MaxDunkelx</a></p>
          <p>📍 Ramat HaSharon, Tel Aviv District | 🚗 Valid Driver’s License & Own Vehicle</p>
        </div>

        {/* Objective */}
        <div className="cv-section fade-in">
          <h2>OBJECTIVE</h2>
          <p>
            Results-driven Software Developer with expertise in data processing, AI-driven automation, 
            and scalable systems. Proven ability to solve complex technical challenges, optimize performance, 
            and build high-impact solutions.
          </p>
        </div>

        {/* Qualifications */}
        <div className="cv-section fade-in">
          <h2>SUMMARY OF QUALIFICATIONS</h2>
          <ul>
            <li>✔ Software Development & AI – Expertise in OOP, NLP, and data automation.</li>
            <li>✔ Cloud & Architecture – AWS Certified Solutions Architect Associate.</li>
            <li>✔ Optimization & Problem-Solving – Reduced processing time by 30%.</li>
            <li>✔ Leadership & Collaboration – Strong communicator bridging technical and business needs.</li>
            <li>✔ Multilingual – Fluent in English, Russian, and Hebrew.</li>
          </ul>
        </div>

        {/* Experience */}
        <div className="cv-section fade-in">
          <h2>EXPERIENCE</h2>
          <h3>Kinor Ltd – AI & Software Developer Intern (2023 – Present)</h3>
          <ul>
            <li>Led a high-stakes data acquisition project for a major U.S. client.</li>
            <li>Developed an AI-powered data processing platform in C#, Python, and JavaScript.</li>
            <li>Optimized frameworks to cut processing time by 30%.</li>
          </ul>
        </div>

        {/* Education */}
        <div className="cv-section fade-in">
          <h2>EDUCATION & CERTIFICATIONS</h2>
          <ul>
            <li>🎓 B.Sc. in Computer Science – Hadassah Academic College (2019–2023)</li>
            <li>📜 AWS Certified Solutions Architect Associate (2025)</li>
            <li>🏫 ORT College Givat Ram, Jerusalem (Graduated Successfully, 2014)</li>
          </ul>
        </div>

        {/* Programming Languages */}
        <div className="cv-section fade-in">
          <h2>PROGRAMMING LANGUAGES</h2>
          <p>✔ Proficient: Python, C#, C++, JavaScript</p>
          <p>✔ Intermediate: Java, C</p>
        </div>

        {/* Languages */}
        <div className="cv-section fade-in">
          <h2>LANGUAGES</h2>
          <p>✔ English: Native | ✔ Russian: Native | ✔ Hebrew: Native</p>
        </div>

        {/* Download Button */}
        <div className="cv-download fade-in">
          <a href="/MaxCVLoc.pdf" download="Maxim_Dunkel_CV.pdf">
            <button className="download-button">Download My CV</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CV;
