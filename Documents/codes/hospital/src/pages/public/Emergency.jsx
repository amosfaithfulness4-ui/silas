import React from 'react';

export default function Emergency() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#fef2f2', borderLeft: '6px solid #dc2626' }}>
      <h2 style={{ color: '#991b1b' }}>🚨 Emergency Medical Care</h2>
      <p>If you or someone near you is in immediate danger, call our emergency team directly.</p>
      <h3>Direct Hotline: <a href="tel:+18005557272" style={{ color: '#dc2626' }}>1-800-555-7272</a></h3>
      <p><strong>Current ER Estimated Wait Time:</strong> 12 Minutes</p>
    </div>
  );
}