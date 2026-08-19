import React from 'react';

export default function FosteringGrowth() {
  return (
    <div style={styles.page}>
      {/* Hero Banner Section with Dark Overlay */}
      <section style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Women in Technology</h1>
          <p style={styles.subtitle}>
            Innovative project with focus on women and vulnerable youths, creating sustainable jobs through digital and entrepreneurial skills development
          </p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#1e2025',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
  heroSection: {
    position: 'relative',
    height: '80vh',
    minHeight: '500px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 2rem',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(20, 24, 33, 0.75)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '850px',
    color: '#ffffff',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.25rem',
    lineHeight: '1.6',
    color: '#e2e8f0',
    fontWeight: '400',
  },
};