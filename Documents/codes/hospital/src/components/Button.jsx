import React from 'react';

export default function Button({ children, onClick, variant = 'primary', type = 'button', style = {} }) {
  const baseStyle = {
    padding: '0.6rem 1.2rem',
    borderRadius: '4px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    ...style
  };

  const variants = {
    primary: { backgroundColor: '#0f766e', color: '#ffffff' },
    secondary: { backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1' },
    danger: { backgroundColor: '#dc2626', color: '#ffffff' }
  };

  return (
    <button type={type} onClick={onClick} style={{ ...baseStyle, ...variants[variant] }}>
      {children}
    </button>
  );
}