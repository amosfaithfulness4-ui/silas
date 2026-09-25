import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header style={styles.header}>
      <nav style={styles.mainNav}>
        <div style={styles.logo}>
          <Link to="/" style={styles.logoText}>INNOVATECH <span style={styles.plc}>Plc</span></Link>
        </div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navItem}>Home</Link>
          <Link to="/services" style={styles.navItem}>Services</Link>
          <Link to="/about" style={styles.navItem}>About Us</Link>
          <Link to="/contact" style={styles.navItem}>Contact</Link>
          <Link to="/dashboard" style={styles.navItem}>Dashboard</Link>
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    width: '100%',
    fontFamily: 'sans-serif',
  },
  mainNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 5%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#003366',
    textDecoration: 'none',
  },
  plc: {
    color: '#eab308',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  navItem: {
    textDecoration: 'none',
    color: '#334155',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
};