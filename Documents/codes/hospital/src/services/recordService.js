import api from './api';

export const getMedicalRecords = async (patientId) => {
  const response = await api.get(`/patients/${patientId}/records`);
  return response.data;
};

export const getBillingInvoices = async (patientId) => {
  const response = await api.get(`/patients/${patientId}/billing`);
  return response.data;
};