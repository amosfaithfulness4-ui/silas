import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#f8f6f0', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '4rem 2rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }}></span>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', color: '#64748b', textTransform: 'uppercase' }}>
            NOW ACCEPTING NEW PATIENTS — ALL SPECIALTIES
          </span>
        </div>

        <div>
          <h1 style={{ 
            fontSize: 'clamp(4.5rem, 10vw, 8.5rem)', 
            fontWeight: '900', 
            lineHeight: 0.95, 
            color: '#1e4e79', 
            margin: 0, 
            letterSpacing: '-0.03em' 
          }}>
            Expert Care, <br />
            <span style={{ 
              background: 'linear-gradient(90deg, #1e4e79 0%, #38bdf8 35%, #94a3b8 65%, #e07a5f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Every Step
            </span> <br />
            of the Way.
          </h1>

          <p style={{ marginTop: '2rem', fontSize: '1.25rem', color: '#475569', maxWidth: '520px', lineHeight: 1.6 }}>
            From same-day urgent care to complex specialist consultations — Sarah Care Medical Hub brings world-class medicine close to home.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
            <button 
              onClick={() => navigate('/book')}
              style={{
                backgroundColor: '#0f4c81',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Book an Appointment <span>→</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}