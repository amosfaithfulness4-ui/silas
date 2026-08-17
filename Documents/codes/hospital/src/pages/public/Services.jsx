import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#f8f6f0', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#f97316', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              OUR SPECIALTIES
            </span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#0f4c81', margin: '0.5rem 0 0', letterSpacing: '-0.02em' }}>
              Care for every <br /> condition
            </h1>
          </div>
          <a href="/services" style={{ color: '#0f4c81', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            View all services <span>→</span>
          </a>
        </div>

        {/* Top Row: Emergency Care & Cardiology */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Emergency Care Hero Card */}
          <div style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            minHeight: '340px',
            backgroundImage: 'url("https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '2.25rem',
            color: '#ffffff'
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.55)' }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '50%', fontSize: '0.8rem' }}>⚡</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#f97316', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  24/7 CRITICAL RESPONSE
                </span>
              </div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem' }}>Emergency Care</h2>
              <p style={{ margin: 0, opacity: 0.9, maxWidth: '440px', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Immediate attention for life-threatening conditions. Our ER team responds in under 4 minutes on average.
              </p>
            </div>
          </div>

          {/* Cardiology Card */}
          <div style={{ backgroundColor: '#e0f2fe', padding: '2.25rem', borderRadius: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '1.5rem', color: '#0284c7' }}>♡</div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                HEART & VASCULAR
              </span>
              <h3 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#0f4c81', margin: '0.25rem 0 0.5rem' }}>Cardiology</h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                Advanced cardiac diagnostics and minimally invasive procedures.
              </p>
            </div>
          </div>

        </div>

        {/* Middle Row: Neurology, Oncology, Orthopedics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Neurology */}
          <div style={{ backgroundColor: '#ece7de', padding: '2rem', borderRadius: '28px' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#0f4c81' }}>⚙</div>
            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              BRAIN & SPINE
            </span>
            <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f4c81', margin: '0.25rem 0 0.5rem' }}>Neurology</h4>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
              Comprehensive neurological care from stroke to complex spine conditions.
            </p>
          </div>

          {/* Oncology */}
          <div style={{ backgroundColor: '#0f4c81', color: '#ffffff', padding: '2rem', borderRadius: '28px' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>🧪</div>
            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#93c5fd', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              CANCER CARE CENTER
            </span>
            <h4 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0.25rem 0 0.5rem' }}>Oncology</h4>
            <p style={{ opacity: 0.85, fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
              Multidisciplinary cancer treatment with cutting-edge immunotherapy and precision medicine.
            </p>
          </div>

          {/* Orthopedics */}
          <div style={{ backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '28px' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#0284c7' }}>🔧</div>
            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              BONE & JOINT
            </span>
            <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f4c81', margin: '0.25rem 0 0.5rem' }}>Orthopedics</h4>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
              From sports injuries to joint replacement — get back to moving.
            </p>
          </div>

        </div>

        {/* Bottom Wide Card: Maternity */}
        <div style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          minHeight: '280px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem'
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}></div>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f97316', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              <span>✨</span> MOTHER & CHILD
            </div>
            <h3 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f4c81', margin: '0 0 0.5rem' }}>Maternity</h3>
            <p style={{ color: '#334155', fontSize: '0.925rem', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
              Compassionate prenatal, delivery, and postnatal care in our dedicated birthing suites.
            </p>
            <button 
              onClick={() => navigate('/book')}
              style={{
                backgroundColor: '#0f4c81',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Book Consultation <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}