import React, { useState } from "react";
import TowerDefense from "./TowerDefense";
import "./Projects.css";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: "tower-defense",
      title: "Tower Defense Game",
      description: "A simple but fun tower defense game with infinite waves and upgrades.",
      component: <TowerDefense />,
    },
    {
      id: "project-2",
      title: "Realtor portfolio website",
      description: "A custom-made website for a realtor to showcase their services. Built using React & Vite.",
      component: null, // No component needed for redirect
      redirectUrl: "https://maxdunkelx.github.io/Romano-Exp/", // Ensure this URL is correct
    },
    {
      id: "project-3",
      title: "Portfolio Website",
      description: "This very website, built with React and Vite.",
      component: <div>Coming soon...</div>,
    },
    {
      id: "project-4",
      title: "E-Commerce Platform",
      description: "A fully functional e-commerce platform with React and Node.js.",
      component: <div>Coming soon...</div>,
    },
    {
      id: "project-5",
      title: "Real-Time Chat App",
      description: "A real-time chat application built using Socket.io.",
      component: <div>Coming soon...</div>,
    },
    {
      id: "project-6",
      title: "AI Image Recognition",
      description: "An AI-powered tool for recognizing objects in images.",
      component: <div>Coming soon...</div>,
    },
  ];

  const handleProjectClick = (project) => {
    console.log("Button clicked:", project.title); // Debugging
    if (project.redirectUrl) {
      console.log("Opening in new tab:", project.redirectUrl); // Debugging
      window.open(project.redirectUrl, "_blank"); // Open in a new tab
    } else {
      setActiveProject(project.id);
    }
  };

  return (
    <div className="projects-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/ProjectsPage.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="projects-content">
        <h1 className="fade-in">My Projects</h1>

        {/* Project Selection Buttons */}
        <div className="projects-list fade-in">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`project-button ${activeProject === project.id ? "active" : ""}`}
              onClick={() => handleProjectClick(project)}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Project Display Section */}
        <div className="project-display fade-in">
          {activeProject ? (
            projects.find((project) => project.id === activeProject).component
          ) : (
            <p>Select a project to view it.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;