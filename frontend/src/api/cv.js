import axios from './axios';

export const convertRequest = (html) => axios.post('/convert', html, { responseType: 'blob' });

export const getCvsRequest = async () => axios.get("/cvs");

export const createCvRequest = async (cv) => axios.post("/cvs", cv);

export const updateCvRequest = async (cv) => axios.put(`/cvs/${cv._id}`, cv);

export const deleteCvRequest = async (id) => axios.delete(`/cvs/${id}`);

export const getCvRequest = async (id) => axios.get(`/cvs/${id}`);