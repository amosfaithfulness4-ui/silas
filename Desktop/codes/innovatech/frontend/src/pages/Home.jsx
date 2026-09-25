import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.heroContainer}>
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80" 
          alt="Innovatech Workspace" 
          style={styles.bgImage}
        />

        {/* Left Bottom Dark Banner Box */}
        <div style={styles.leftOverlay}>
          <h2 style={styles.bannerTitle}>Upgrade Your Business with Innovatech Solutions</h2>
          <p style={styles.bannerText}>
            Seamless onboarding, instant IT support, and reliable web platforms to keep your business moving forward.
          </p>
          <Link to="/services" style={styles.goldButton}>Explore Services</Link>
        </div>

        {/* Right Floating Login Box */}
        <div style={styles.rightLoginCard}>
          <span style={styles.cardHeader}>INNOVATECH PORTAL LOGIN</span>
          <Link to="/login" style={styles.loginCardBtn}>
            Client / Corporate Login
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresCardContainer}>
          {/* Card 1: Highlighted Dark Background */}
          <div style={styles.highlightCard}>
            <div style={styles.cardIcon}>⚙️</div>
            <h3 style={styles.highlightTitle}>Unlocking Potentials</h3>
            <p style={styles.highlightText}>
              Kick-start and improve your career by leveraging cutting-edge digital skills. Join a path filled with coding challenges and real-world software development projects.
            </p>
            <Link to="/unlocking-potentials" style={styles.highlightLink}>Learn more ...</Link>
          </div>

          {/* Card 2: Fostering Growth */}
          <div style={styles.standardCard}>
            <div style={styles.standardIcon}>🚀</div>
            <h3 style={styles.standardTitle}>Fostering Growth</h3>
            <p style={styles.standardText}>
              We support startups in taking their first steps toward building scalable software. Dedicated business support, workspace tools, and technical guidance for your vision.
            </p>
            <Link to="/fostering-growth" style={styles.standardLink}>Learn more</Link>
          </div>

          {/* Card 3: Empowering Businesses */}
          <div style={styles.standardCard}>
            <div style={styles.standardIcon}>📈</div>
            <h3 style={styles.standardTitle}>Empowering Businesses</h3>
            <p style={styles.standardText}>
              Partner with us on your digital transformation journey. We design, prototype, and build high-performance web applications tailored to your client needs.
            </p>
            <Link to="/empowering-businesses" style={styles.standardLink}>Learn more</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
  heroContainer: {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 80px)',
    minHeight: '500px',
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  leftOverlay: {
    position: 'absolute',
    bottom: '40px',
    left: '5%',
    width: '420px',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    color: '#fff',
    padding: '2rem',
    borderRadius: '4px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  },
  bannerTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.8rem',
    lineHeight: '1.3',
  },
  bannerText: {
    fontSize: '0.95rem',
    color: '#cbd5e1',
    marginBottom: '1.5rem',
    lineHeight: '1.4',
  },
  goldButton: {
    display: 'inline-block',
    backgroundColor: '#eab308',
    color: '#003366',
    padding: '0.8rem 1.5rem',
    fontWeight: '700',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  rightLoginCard: {
    position: 'absolute',
    bottom: '40px',
    right: '5%',
    width: '300px',
    backgroundColor: '#fff',
    padding: '1.5rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    borderRadius: '4px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  cardHeader: {
    fontSize: '0.75rem',
    fontWeight: '800',
    color: '#003366',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  },
  loginCardBtn: {
    backgroundColor: '#eab308',
    color: '#003366',
    padding: '0.8rem',
    borderRadius: '4px',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },

  /* Feature Section Styles */
  featuresSection: {
    padding: '4rem 5%',
    display: 'flex',
    justifyContent: 'center',
  },
  featuresCardContainer: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '1200px',
    width: '100%',
    padding: '1.5rem',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  highlightCard: {
    flex: '1',
    minWidth: '280px',
    backgroundColor: '#5d6878',
    color: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardIcon: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  highlightTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  highlightText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#e2e8f0',
    marginBottom: '1.5rem',
  },
  highlightLink: {
    color: '#fff',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  standardCard: {
    flex: '1',
    minWidth: '280px',
    padding: '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  standardIcon: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  standardTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#003366',
    marginBottom: '1rem',
  },
  standardText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#64748b',
    marginBottom: '1.5rem',
  },
  standardLink: {
    color: '#eab308',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
};