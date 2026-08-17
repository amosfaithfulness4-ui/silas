import React from 'react';

export default function AppointmentCard({ appointment, onCancel }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h4>{appointment.doctorName}</h4>
        <span style={styles.badge}>{appointment.status}</span>
      </div>
      <p><strong>Specialty:</strong> {appointment.specialty}</p>
      <p><strong>Date & Time:</strong> {appointment.appointmentDate} at {appointment.timeSlot}</p>
      <p><strong>Type:</strong> {appointment.type}</p>
      {onCancel && (
        <button onClick={() => onCancel(appointment.id)} style={styles.cancelBtn}>
          Cancel Appointment
        </button>
      )}
    </div>
  );
}

const styles = {
  card: { padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: '#ccfbf1', color: '#0f766e', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
  cancelBtn: { marginTop: '0.5rem', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', width: 'fit-content' }
};