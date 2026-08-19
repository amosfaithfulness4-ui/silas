import React from 'react';
import { Link } from 'react-router-dom';

export default function PartnershipsSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.headerBox}>
          <h2 style={styles.title}>
            We Offer You Partnerships for Sustainable Growth
          </h2>
          <p style={styles.subtitle}>
            Our services spanning software development, consultancy, technical skill training, 
            innovative workspace solutions, and talent outsourcing.
          </p>
        </div>

        {/* Content Layout */}
        <div style={styles.grid}>
          {/* Left Column: Feature Items */}
          <div style={styles.featuresList}>
            {/* Comprehensive Expertise */}
            <div style={styles.featureItem}>
              <div style={styles.iconBox}>🌐</div>
              <div>
                <h3 style={styles.featureTitle}>Comprehensive Expertise</h3>
                <p style={styles.featureDesc}>
                  Our expert engineering team brings together deep tech proficiency across modern frameworks, 
                  ensuring you receive scalable solutions tailored to your unique requirements.
                </p>
              </div>
            </div>

            {/* Innovation Driven */}
            <div style={styles.featureItem}>
              <div style={styles.iconBox}>💻</div>
              <div>
                <h3 style={styles.featureTitle}>Innovation Driven</h3>
                <p style={styles.featureDesc}>
                  We continuously explore modern technologies and robust architectures to deliver 
                  cutting-edge software solutions that drive success and elevate your competitive edge.
                </p>
              </div>
            </div>

            {/* Customer-Centric Strategies */}
            <div style={styles.featureItem}>
              <div style={styles.iconBox}>👤</div>
              <div>
                <h3 style={styles.featureTitle}>Customer-Centric Strategies</h3>
                <p style={styles.featureDesc}>
                  Your digital growth is our priority. We are dedicated to delivering continuous technical value 
                  and supporting every step of your journey toward achieving business objectives with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Featured CTA Card */}
          <div style={styles.cardWrapper}>
            <div style={styles.card}>
              <div style={styles.illustrationBox}>
                <div style={styles.rocketIcon}>🚀</div>
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>
                  Your Most <span style={styles.highlight}>TRUSTED</span> Tech Partner
                </h3>
                <p style={styles.cardText}>
                  Innovatech is ready to partner with you at any stage of digital transformation 
                  to turn your business vision into operational reality.
                </p>
                <Link to="/contact" style={styles.contactBtn}>
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#f8fafc',
    padding: '5rem 5%',
    fontFamily: 'sans-serif',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  headerBox: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 4rem auto',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '1rem',
    lineHeight: '1.3',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#64748b',
    lineHeight: '1.6',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    alignItems: 'center',
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.2rem',
  },
  iconBox: {
    fontSize: '1.5rem',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
    marginTop: 0,
  },
  featureDesc: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: '1.6',
    margin: 0,
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
    overflow: 'hidden',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
  },
  illustrationBox: {
    backgroundColor: '#818cf8',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rocketIcon: {
    fontSize: '4.5rem',
  },
  cardContent: {
    padding: '2rem',
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.8rem',
  },
  highlight: {
    color: '#1e293b',
    textTransform: 'uppercase',
  },
  cardText: {
    fontSize: '0.92rem',
    color: '#64748b',
    lineHeight: '1.5',
    marginBottom: '1.8rem',
  },
  contactBtn: {
    display: 'inline-block',
    backgroundColor: '#ec4899',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.9rem',
    padding: '0.85rem 2.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
  },
};