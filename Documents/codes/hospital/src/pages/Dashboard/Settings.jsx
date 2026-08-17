import React from 'react';

export default function Settings() {
  return (
    <div style={{ padding: '2rem' }}>
      <h3>Patient Settings</h3>
      <label>
        <input type="checkbox" defaultChecked /> Receive appointment SMS reminders
      </label>
    </div>
  );
}