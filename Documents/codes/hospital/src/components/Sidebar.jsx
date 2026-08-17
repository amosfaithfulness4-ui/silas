import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <h3 style={styles.title}>Portal Navigation</h3>
      <nav style={styles.nav}>
        <NavLink to="/dashboard/overview" style={styles.link}>Overview</NavLink>
        <NavLink to="/dashboard/appointments" style={styles.link}>My Appointments</NavLink>
        <NavLink to="/dashboard/book" style={styles.link}>Book New Slot</NavLink>
        <NavLink to="/dashboard/records" style={styles.link}>Medical Records</NavLink>
        <NavLink to="/dashboard/billing" style={styles.link}>Billing & Claims</NavLink>
        <NavLink to="/dashboard/settings" style={styles.link}>Settings</NavLink>
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: { width: '240px', backgroundColor: '#f0fdfa', padding: '1.5rem', minHeight: 'calc(100vh - 70px)' },
  title: { color: '#0f766e', marginBottom: '1rem', fontSize: '1.1rem' },
  nav: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  link: { textDecoration: 'none', color: '#334155', padding: '0.5rem', borderRadius: '4px', fontWeight: '500' }
};