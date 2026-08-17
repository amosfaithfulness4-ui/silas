import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initial upcoming appointment state
  const [upcomingAppointment, setUpcomingAppointment] = useState({
    doctorName: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    reason: 'Follow-up',
    date: 'August 18, 2026',
    time: '10:30 AM',
    location: 'Building A, Suite 204',
    confirmed: false,
  });

  // Catch the newly booked appointment passed through navigate state
  useEffect(() => {
    if (location.state?.newAppointment) {
      const newAppt = location.state.newAppointment;
      setUpcomingAppointment({
        doctorName: newAppt.doctorName,
        specialty: newAppt.specialty,
        reason: newAppt.reason,
        date: newAppt.date || 'August 18, 2026',
        time: newAppt.time,
        location: newAppt.location || 'Building A, Suite 204',
        confirmed: false,
      });
    }
  }, [location.state]);

  const handleConfirm = () => {
    setUpcomingAppointment((prev) => ({ ...prev, confirmed: true }));
    alert('Appointment confirmed!');
  };

  const handleReschedule = () => {
    navigate('/book');
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#F8F6F0', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>
          Your Appointments
        </h1>
        <button
          onClick={() => navigate('/book')}
          style={{
            backgroundColor: '#E07A5F',
            color: '#ffffff',
            border: 'none',
            borderRadius: '20px',
            padding: '0.6rem 1.25rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          + Book Appointment
        </button>
      </div>

      {/* Dynamic Upcoming Appointment Card */}
      {upcomingAppointment && (
        <div
          style={{
            backgroundColor: '#1E4358',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
          }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.8 }}>
            UPCOMING APPOINTMENT
          </span>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>
                {upcomingAppointment.doctorName}
              </h2>
              <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                {upcomingAppointment.specialty} • {upcomingAppointment.reason}
              </p>
              
              <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', fontSize: '0.875rem', opacity: 0.9 }}>
                <span>📅 {upcomingAppointment.date}</span>
                <span>⏰ {upcomingAppointment.time}</span>
                <span>📍 {upcomingAppointment.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleReschedule}
                style={{
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid #FFFFFF',
                  borderRadius: '20px',
                  padding: '0.5rem 1.25rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Reschedule
              </button>
              <button
                onClick={handleConfirm}
                disabled={upcomingAppointment.confirmed}
                style={{
                  backgroundColor: upcomingAppointment.confirmed ? '#4ADE80' : '#E07A5F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '0.5rem 1.25rem',
                  fontWeight: '600',
                  cursor: upcomingAppointment.confirmed ? 'default' : 'pointer',
                }}
              >
                {upcomingAppointment.confirmed ? 'Confirmed ✓' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Past Appointments Section */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0F172A', marginBottom: '1rem' }}>
          Past Appointments
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', color: '#1E293B' }}>Dr. Marcus Vance</h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#64748B' }}>
              General Checkup • June 12, 2026
            </p>
          </div>
          <span style={{ backgroundColor: '#F1F5F9', color: '#475569', padding: '0.35rem 0.85rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>
            Completed
          </span>
        </div>
      </div>
    </div>
  );
}