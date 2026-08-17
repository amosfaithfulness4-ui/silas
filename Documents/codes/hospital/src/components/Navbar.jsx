import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <header style={styles.header}>
      {/* Brand Logo */}
      <Link to="/" style={styles.logoContainer}>
        <div style={styles.logoIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20M6 6l12 12M18 6L6 18" />
          </svg>
        </div>
        <div>
          <h1 style={styles.logoTitle}>Sarah Care</h1>
          <span style={styles.logoSubtitle}>MEDICAL HUB</span>
        </div>
      </Link>

      {/* Navigation Links (Patient Portal Removed) */}
      <nav style={styles.nav}>
        <Link to="/" style={location.pathname === '/' ? styles.activeNavLink : styles.navLink}>Home</Link>
        <Link to="/doctors" style={location.pathname === '/doctors' ? styles.activeNavLink : styles.navLink}>Doctors</Link>
        <Link to="/services" style={location.pathname === '/services' ? styles.activeNavLink : styles.navLink}>Services</Link>
        <Link to="/contact" style={location.pathname === '/contact' ? styles.activeNavLink : styles.navLink}>Contact</Link>
      </nav>

      {/* Action Area */}
      <div style={styles.actions}>
        <div style={styles.emergencyContainer}>
          <span style={styles.orangeDot}></span>
          <span style={styles.emergencyText}>Emergency: 1-800-SARAH-ER</span>
        </div>

        <Link to="/book" style={styles.bookBtn}>
          Book Appointment
        </Link>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#f8f6f0',
    padding: '0.85rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    borderTop: '4px solid #1e293b'
  },
  logoContainer: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#1b4d72',
    border: '2px solid #e07a5f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
  },
  logoTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1b4d72',
    margin: 0,
    lineHeight: 1.1
  },
  logoSubtitle: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: '#829ab1',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    display: 'block'
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  navLink: {
    color: '#475569',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem'
  },
  activeNavLink: {
    color: '#1b4d72',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.95rem'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.75rem'
  },
  emergencyContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  orangeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#e07a5f',
    display: 'inline-block'
  },
  emergencyText: {
    color: '#e07a5f',
    fontWeight: '600',
    fontSize: '0.9rem'
  },
  bookBtn: {
    backgroundColor: '#1b4d72',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.65rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '0.875rem'
  }
};