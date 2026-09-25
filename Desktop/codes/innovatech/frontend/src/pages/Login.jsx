import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = ['Customer', 'Shareholder', 'Manager', 'Owner'];
const defaultShareholders = ['david', 'amos', 'williams', 'divine', 'felix'];

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Customer');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const roleHint = {
    Customer: 'Use any name and a Gmail address ending in @gmail.com.',
    Shareholder: 'Login only with a valid shareholder email such as david.share.ng or amos.share.ng.',
    Manager: 'Use francis.manage.ng.plc as the login email.',
    Owner: 'Use innovatech.com.ng as the login email and ordained as the password.',
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setMessage('');
    if (role === 'Owner') {
      setCredentials({ email: 'innovatech.com.ng', password: 'ordained' });
    } else if (role === 'Manager') {
      setCredentials({ email: 'francis.manage.ng.plc', password: '' });
    } else {
      setCredentials({ email: '', password: '' });
    }
  };

  const validateLogin = () => {
    const email = credentials.email.trim();
    const password = credentials.password.trim();

    if (selectedRole === 'Owner') {
      if (email !== 'innovatech.com.ng' || password !== 'ordained') {
        return 'Owner login requires innovatech.com.ng and password ordained.';
      }
    }

    if (selectedRole === 'Shareholder') {
      if (!email.endsWith('.share.ng')) {
        return 'Shareholder email must end with .share.ng.';
      }
      const shareholderList = JSON.parse(
        localStorage.getItem('innovatechShareholders') || JSON.stringify(defaultShareholders)
      );
      const emailName = email.replace(/\.share\.ng$/i, '').toLowerCase();
      if (!shareholderList.map((name) => name.toLowerCase()).includes(emailName)) {
        return `Shareholder login is limited to: ${shareholderList.join(', ')}.`;
      }
    }

    if (selectedRole === 'Manager') {
      if (email !== 'francis.manage.ng.plc') {
        return 'Manager login must use francis.manage.ng.plc.';
      }
    }

    if (selectedRole === 'Customer') {
      if (!email.includes('@gmail.com')) {
        return 'Customer email must include @gmail.com.';
      }
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateLogin();

    if (error) {
      setMessage(error);
      return;
    }

    if (selectedRole === 'Owner' || selectedRole === 'Manager' || selectedRole === 'Shareholder') {
      navigate('/dashboard', { state: { role: selectedRole } });
      return;
    }

    setMessage(`Logged in successfully as ${selectedRole}.`);
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <p>Select your role and enter the required credentials below.</p>
      <div style={styles.roleRow}>
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => handleRoleChange(role)}
            style={{
              ...styles.roleButton,
              background: selectedRole === role ? '#0f172a' : '#e2e8f0',
              color: selectedRole === role ? '#fff' : '#0f172a',
            }}
          >
            {role}
          </button>
        ))}
      </div>
      <p style={styles.hint}>{roleHint[selectedRole]}</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>Login</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '500px', margin: '0 auto' },
  roleRow: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' },
  roleButton: { padding: '0.75rem 1rem', border: '1px solid #cbd5e1', borderRadius: '999px', cursor: 'pointer' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' },
  input: { padding: '0.9rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' },
  submitButton: { padding: '0.9rem', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  message: { marginTop: '1rem', padding: '0.9rem', background: '#def7ec', color: '#065f46', borderRadius: '8px' }
};