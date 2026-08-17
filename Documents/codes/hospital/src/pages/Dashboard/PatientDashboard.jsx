import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientDashboard({ onSignOut, patient }) {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Fallback patient data if none was passed from login
  const firstName = patient?.firstName || 'Faithfulness';
  const lastName = patient?.lastName || 'Amos';
  const email = patient?.email || 'faithfulness@example.com';
  const phone = patient?.phone || '+1 (555) 000-0000';
  const bloodType = patient?.bloodType || 'A+';
  const dob = patient?.dob || '2000-01-01';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fcfbf9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Header */}
      <header style={{ backgroundColor: '#1B4360', color: '#ffffff', padding: '1.25rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem' }}>
            {firstName[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>Welcome back, {firstName}</h2>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>Patient ID: SCM-2024-00847</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          style={{ backgroundColor: 'transparent', border: 'none', color: '#ffffff', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          🚪 Sign Out
        </button>
      </header>

      {/* Dashboard Body Container */}
      <div style={{ display: 'flex', maxWidth: '1300px', margin: '2rem auto', padding: '0 2rem', gap: '2.5rem', boxSizing: 'border-box' }}>
        
        {/* Sidebar */}
        <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: activeTab === 'overview' ? '#1B4360' : 'transparent',
              color: activeTab === 'overview' ? '#ffffff' : '#334155',
              border: 'none',
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%'
            }}
          >
            🏠 Overview
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: activeTab === 'appointments' ? '#1B4360' : 'transparent',
              color: activeTab === 'appointments' ? '#ffffff' : '#334155',
              border: 'none',
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%'
            }}
          >
            📅 Appointments
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: activeTab === 'profile' ? '#1B4360' : 'transparent',
              color: activeTab === 'profile' ? '#ffffff' : '#334155',
              border: 'none',
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%'
            }}
          >
            👤 My Profile
          </button>
        </div>

        {/* Main Content Pane */}
        <div style={{ flex: 1 }}>
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#102a43', margin: '0 0 0.3rem 0' }}>Health Overview</h1>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Here is your personal health summary and active schedule.</p>
                </div>
                <button
                  onClick={() => navigate('/book')}
                  style={{ backgroundColor: '#ea580c', color: '#ffffff', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(234, 88, 12, 0.2)' }}
                >
                  + Book Appointment
                </button>
              </div>

              {/* Visits Scheduled Card */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    📅
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.5px' }}>VISITS</span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#102a43', margin: '0.1rem 0' }}>0 Scheduled</h3>
                    <span style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      📈 Active Schedule
                    </span>
                  </div>
                </div>
              </div>

              {/* No Upcoming Appointments Banner */}
              <div style={{ backgroundColor: '#1B4360', borderRadius: '20px', padding: '2rem', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(27, 67, 96, 0.2)' }}>
                <div>
                  <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#93c5fd', fontSize: '0.75rem', fontWeight: '700', padding: '0.25rem 0.6rem', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Next Scheduled Appointment
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0.75rem 0 0.4rem 0' }}>No Upcoming Appointments</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>You have no visits scheduled right now. Select a doctor to book a consultation.</p>
                </div>
                <button
                  onClick={() => navigate('/book')}
                  style={{ backgroundColor: '#ea580c', color: '#ffffff', border: 'none', padding: '0.85rem 1.5rem', borderRadius: '12px', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                >
                  + Schedule Now
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#102a43', marginTop: 0 }}>Your Appointments</h2>
              <p style={{ color: '#64748b' }}>You currently have no active appointment history.</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#102a43', marginTop: 0 }}>Patient Profile</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#334155', fontSize: '0.95rem' }}>
                <div><strong>Name:</strong> {firstName} {lastName}</div>
                <div><strong>Email:</strong> {email}</div>
                <div><strong>Phone:</strong> {phone}</div>
                <div><strong>Blood Type:</strong> {bloodType}</div>
                <div><strong>Date of Birth:</strong> {dob}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}