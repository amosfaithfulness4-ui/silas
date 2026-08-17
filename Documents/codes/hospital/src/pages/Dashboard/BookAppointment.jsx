import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    department: 'all',
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
  });

  // Updated Doctors List matching the rest of the app
  const doctorsList = [
    { id: 'doc-1', name: 'Dr. Sarah Amos', specialty: 'Chief of Medicine & Cardiology', department: 'cardiology' },
    { id: 'doc-2', name: 'Dr. Gideon', specialty: 'General Surgery', department: 'surgery' },
    { id: 'doc-3', name: 'Dr. Yadat Johnas', specialty: 'Neurology', department: 'neurology' },
    { id: 'doc-4', name: 'Dr. Success', specialty: 'Pediatrics', department: 'pediatrics' },
    { id: 'doc-5', name: 'Dr. Emeka Okonkwo', specialty: 'Orthopedics', department: 'orthopedics' },
    { id: 'doc-6', name: 'Dr. Folake Adebayo', specialty: 'Obstetrics & Gynecology', department: 'gynecology' },
  ];

  const availableSlots = [
    '09:00 AM', '10:00 AM', '11:30 AM', 
    '01:30 PM', '02:45 PM', '04:00 PM'
  ];

  const filteredDoctors = doctorsList.filter(
    (doc) => formData.department === 'all' || doc.department === formData.department
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.appointmentTime) {
      alert('Please select an available time slot.');
      return;
    }

    // Format the new appointment object matching your dashboard structure
    const newAppointment = {
      id: Date.now().toString(),
      doctorName: formData.doctor || 'Dr. Sarah Amos',
      specialty: formData.department !== 'all' 
        ? formData.department.charAt(0).toUpperCase() + formData.department.slice(1) 
        : 'General Consultation',
      reason: formData.notes ? formData.notes : 'General Checkup',
      date: formData.appointmentDate,
      time: formData.appointmentTime,
      location: 'Main Hospital Building, Suite 204',
      status: 'Pending Confirmation',
    };

    // Redirect directly to logged-in dashboard and pass new appointment state
    navigate('/dashboard', { state: { newAppointment } });
  };

  return (
    <div style={{ color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1b4d72', marginBottom: '0.5rem' }}>
          Book a Hospital Appointment
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
          Select a medical department, preferred specialist, and available time slot below.
        </p>
      </div>

      <div style={{ padding: '0.85rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <strong>Emergency Notice:</strong> If you are experiencing a life-threatening medical situation, please call emergency services immediately or visit the nearest emergency room.
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            1. Patient Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.35rem' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="patientName"
                required
                value={formData.patientName}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.35rem' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.35rem' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 (0) 800 000 0000"
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            2. Department & Medical Specialist
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.35rem' }}>
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              >
                <option value="all">All Departments</option>
                <option value="cardiology">Cardiology</option>
                <option value="surgery">General Surgery</option>
                <option value="neurology">Neurology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="gynecology">Obstetrics & Gynecology</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.35rem' }}>
                Preferred Doctor
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
              >
                <option value="">Any Available Specialist</option>
                {filteredDoctors.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} ({doc.specialty})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            3. Select Date & Time Slot
          </h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.35rem' }}>
              Appointment Date *
            </label>
            <input
              type="date"
              name="appointmentDate"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.appointmentDate}
              onChange={handleChange}
              style={{ width: '100%', maxWidth: '300px', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
              Available Time Slots *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.5rem' }}>
              {availableSlots.map((slot) => {
                const isSelected = formData.appointmentTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, appointmentTime: slot }))}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      border: isSelected ? '2px solid #e07a5f' : '1px solid #cbd5e1',
                      backgroundColor: isSelected ? '#fef3f2' : '#ffffff',
                      color: isSelected ? '#1b4d72' : '#334155',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.35rem' }}>
            Symptoms / Reason for Visit (Optional)
          </label>
          <textarea
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Briefly describe your health concern or symptoms..."
            style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#ffffff', boxSizing: 'border-box', fontFamily: 'inherit' }}
          ></textarea>
        </div>

        <button
          type="submit"
          style={{ padding: '0.75rem 1.5rem', backgroundColor: '#1b4d72', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' }}
        >
          Confirm & Book Appointment
        </button>
      </form>
    </div>
  );
}