import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const DOCTORS_DATA = {
  '1': {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    qualification: 'MD, FACC',
    experienceYears: 14,
    bio: 'Dr. Sarah Johnson is a leading cardiologist specializing in preventative cardiology, hypertension management, and non-invasive cardiac imaging at Sarah Care Medical Hub.',
    education: 'Harvard Medical School (MD), Johns Hopkins Hospital (Residency)',
    languages: ['English', 'Spanish'],
    consultationFee: 150,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    slots: ['09:00 AM', '11:30 AM', '02:00 PM', '04:00 PM']
  },
  '2': {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    qualification: 'MD, FAAP',
    experienceYears: 10,
    bio: 'Dedicated pediatrician focused on adolescent health, developmental monitoring, and routine infant immunizations.',
    education: 'Stanford University School of Medicine',
    languages: ['English', 'Mandarin'],
    consultationFee: 120,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    slots: ['10:00 AM', '01:00 PM', '03:30 PM']
  }
};

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = DOCTORS_DATA[id] || DOCTORS_DATA['1'];
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleBook = () => {
    if (!selectedSlot) {
      alert('Please select a time slot first.');
      return;
    }
    navigate(`/dashboard/book?doctorId=${doctor.id}&slot=${encodeURIComponent(selectedSlot)}`);
  };

  return (
    <div style={styles.container}>
      <Link to="/doctors" style={styles.backLink}>← Back to Doctors Directory</Link>
      
      <div style={styles.headerCard}>
        <div style={styles.avatarPlaceholder}>
          👨‍⚕️
        </div>
        <div style={styles.headerInfo}>
          <h2>{doctor.name}</h2>
          <p style={styles.specialty}>{doctor.specialty} — <span style={{ color: '#64748b' }}>{doctor.qualification}</span></p>
          <p><strong>Experience:</strong> {doctor.experienceYears} Years</p>
          <p><strong>Languages:</strong> {doctor.languages.join(', ')}</p>
          <p><strong>Consultation Fee:</strong> ${doctor.consultationFee}</p>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.detailsSection}>
          <h3>Biography</h3>
          <p style={styles.text}>{doctor.bio}</p>

          <h3>Education & Fellowship</h3>
          <p style={styles.text}>{doctor.education}</p>
        </div>

        <div style={styles.bookingCard}>
          <h3>Schedule Consultation</h3>
          <p><small>Available Days: {doctor.availableDays.join(', ')}</small></p>

          <label style={{ display: 'block', marginTop: '1rem', fontWeight: 'bold' }}>Available Slots:</label>
          <div style={styles.slotsContainer}>
            {doctor.slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                style={{
                  ...styles.slotBtn,
                  backgroundColor: selectedSlot === slot ? '#0f766e' : '#f1f5f9',
                  color: selectedSlot === slot ? '#ffffff' : '#0f172a'
                }}
              >
                {slot}
              </button>
            ))}
          </div>

          <button onClick={handleBook} style={styles.confirmBtn}>
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
  backLink: { textDecoration: 'none', color: '#0f766e', fontWeight: '500', marginBottom: '1rem', display: 'inline-block' },
  headerCard: { display: 'flex', gap: '2rem', backgroundColor: '#f0fdfa', padding: '2rem', borderRadius: '8px', alignItems: 'center' },
  avatarPlaceholder: { fontSize: '4rem', width: '100px', height: '100px', backgroundColor: '#ccfbf1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  headerInfo: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  specialty: { fontSize: '1.1rem', fontWeight: 'bold', color: '#0f766e' },
  grid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' },
  detailsSection: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  text: { color: '#334155', lineHeight: '1.6' },
  bookingCard: { padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#ffffff', height: 'fit-content' },
  slotsContainer: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' },
  slotBtn: { border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' },
  confirmBtn: { marginTop: '1.5rem', width: '100%', padding: '0.75rem', backgroundColor: '#0f766e', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }
};