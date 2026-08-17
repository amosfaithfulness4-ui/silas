import api from './api';

export const getAvailableSlots = async (doctorId, date) => {
  const response = await api.get(`/appointments/slots`, {
    params: { doctorId, date },
  });
  return response.data;
};

export const bookAppointment = async (appointmentData) => {
  const response = await api.post('/appointments/book', appointmentData);
  return response.data;
};

export const getPatientAppointments = async (patientId) => {
  const response = await api.get(`/patients/${patientId}/appointments`);
  return response.data;
};