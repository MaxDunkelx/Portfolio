import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CV from "./pages/CV";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "../src/component/menu.jsx"; // Import the Menu component
import MakeMeMoney from "./pages/MakeMeMoney";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Menu /> {/* Add the Menu component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/makememoney" element={<MakeMeMoney />} />
      </Routes>
    </Router>
  );
};

export default App;