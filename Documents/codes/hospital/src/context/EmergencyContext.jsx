import React, { createContext, useState, useContext, useEffect } from 'react';

const EmergencyContext = createContext(null);

export const EmergencyProvider = ({ children }) => {
  const [erWaitTime, setErWaitTime] = useState(12); // Estimated wait time in minutes
  const [emergencyAlert, setEmergencyAlert] = useState(null); // Active hospital alerts
  const [ambulanceAvailable, setAmbulanceAvailable] = useState(true);

  // Simulated live updates for ER status
  useEffect(() => {
    // Check or poll initial ER status
    const initialAlert = {
      id: 'alert-1',
      level: 'warning', // 'info' | 'warning' | 'critical'
      message: 'High ER volume today. Priority given to critical trauma cases.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setEmergencyAlert(initialAlert);
  }, []);

  const triggerEmergencyCall = () => {
    window.location.href = 'tel:+18005557272';
  };

  const clearAlert = () => {
    setEmergencyAlert(null);
  };

  return (
    <EmergencyContext.Provider
      value={{
        erWaitTime,
        setErWaitTime,
        emergencyAlert,
        setEmergencyAlert,
        clearAlert,
        ambulanceAvailable,
        setAmbulanceAvailable,
        triggerEmergencyCall,
        emergencyHotline: '1-800-555-7272'
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};