import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/public/Home';
import BookAppointment from './pages/Dashboard/BookAppointment';
import Contact from './pages/public/Contact';
import Services from './pages/public/Services';
import PatientDashboard from './pages/Dashboard/PatientDashboard';
import Doctors from "./pages/public/Doctors";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header style={{
      backgroundColor: '#f8f6f0',
      borderTop: '4px solid #1e293b',
      padding: '0.85rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#1b4d72',
          border: '2px solid #e07a5f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20M6 6l12 12M18 6L6 18" />
          </svg>
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1b4d72', margin: 0, lineHeight: 1.1 }}>
            Sarah Care
          </h1>
          <span style={{ fontSize: '0.65rem', fontWeight: '600', color: '#829ab1', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block' }}>
            MEDICAL HUB
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>
          Home
        </Link>
        <Link to="/doctors" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>
          Doctors
        </Link>
        <Link to="/services" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>
          Services
        </Link>
        <Link to="/contact" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>
          Contact
        </Link>
      </nav>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e07a5f', fontWeight: '600', fontSize: '0.9rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#e07a5f', display: 'inline-block' }}></span>
          <span>Emergency: 1-800-SARAH-ER</span>
        </div>

        <button 
          onClick={() => navigate('/book')}
          style={{
            backgroundColor: '#1b4d72',
            color: '#ffffff',
            border: 'none',
            padding: '0.65rem 1.5rem',
            borderRadius: '9999px',
            fontWeight: '700',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Book Appointment
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginSuccess = (formData) => {
    setIsLoggedIn(true);
    if (formData) {
      setPatientData(formData);
    }
    navigate('/dashboard');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setPatientData(null);
    navigate('/');
  };

  const isDashboardRoute = location.pathname === '/dashboard';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f6f0', display: 'flex', flexDirection: 'column' }}>
      
      {/* Hide main Navbar when user is viewing the dashboard */}
      {!isDashboardRoute && <Navbar />}

      {/* Main Content Router */}
      <main style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/services" element={<Services />} />

          {/* Protected Dashboard route */}
          <Route 
            path="/dashboard" 
            element={
              isLoggedIn ? (
                <PatientDashboard onSignOut={handleSignOut} patient={patientData} />
              ) : (
                <Home />
              )
            } 
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={
            <div style={{
              maxWidth: '1100px',
              margin: '2.5rem auto',
              padding: '2rem',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <BookAppointment />
            </div>
          } />
        </Routes>
      </main>

      {/* Hide main Footer when user is viewing the dashboard */}
      {!isDashboardRoute && (
        <footer style={{
          backgroundColor: '#0f4c81',
          color: '#ffffff',
          textAlign: 'center',
          padding: '1.5rem',
          fontSize: '0.875rem',
          marginTop: 'auto'
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>© 2026 Sarah Care Medical Hub. All rights reserved.</p>
          <p style={{ margin: 0, opacity: 0.85 }}>Opposite Overhead Tank, Bogoro, Bauchi State, Nigeria | Emergency Hotline: 1-800-SARAH-ER</p>
        </footer>
      )}

    </div>
  );
}