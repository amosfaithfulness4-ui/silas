import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UnlockingPotentials from "./pages/unlockingpotential.jsx";
import FosteringGrowth from "./pages/FosteringGrowth.jsx";
import EmpoweringBusinesses from "./pages/EmpoweringBusinesses.jsx";
import OurStory from "./pages/OurStory.jsx";

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/unlocking-potentials" element={<UnlockingPotentials />} />
            <Route path="/fostering-growth" element={<FosteringGrowth />} />
            <Route path="/empowering-businesses" element={<EmpoweringBusinesses />} />
            <Route path="/our-story" element={<OurStory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}