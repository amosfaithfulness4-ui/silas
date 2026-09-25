import React from 'react';

export default function ServiceCard({ title, description, iconName }) {
  return (
    <div style={styles.card}>
      {iconName && <div style={styles.icon}>{iconName}</div>}
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
    </div>
  );
}

const styles = {
  card: {
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  icon: {
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '#0284c7',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  title: {
    margin: '0',
    fontSize: '1.25rem',
    color: '#0f172a',
  },
  description: {
    margin: '0',
    color: '#64748b',
    fontSize: '0.95rem',
    lineHeight: '1.5',
  },
};