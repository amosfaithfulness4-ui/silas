import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Overview() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Patient Dashboard</h2>
      <p>Welcome back, <strong>{user?.name || 'Patient'}</strong></p>

      {/* Quick Stats Grid */}
      <div style={styles.grid}>
        <div style={styles.statCard}>
          <h4>Upcoming Visit</h4>
          <p>Dr. Sarah Johnson - Cardiology</p>
          <small>Aug 14, 2026 at 10:00 AM</small>
        </div>
        <div style={styles.statCard}>
          <h4>Recent Lab Results</h4>
          <p>Blood Panel (Complete)</p>
          <small>Status: Ready</small>
        </div>
        <div style={styles.statCard}>
          <h4>Active Prescriptions</h4>
          <p> Amoxicillin (500mg)</p>
          <small>Refills Left: 2</small>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' },
  statCard: { padding: '1.25rem', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #0f766e' }
};