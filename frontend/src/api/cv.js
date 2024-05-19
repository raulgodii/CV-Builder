import axios from './axios';

export const convertRequest = (html) => axios.post('/convert', html, { responseType: 'blob' });

export const getCvsRequest = async () => axios.get("/cvs");

export const createCvRequest = async (cv) => axios.post("/cvs", cv);

export const updateCvRequest = async (id, cv) => axios.put(`/cvs/${id}`, cv);

export const uploadFotoRequest = async (id, foto) => axios.put(`/cv/uploadFoto/${id}`, cv);

export const deleteCvRequest = async (id) => axios.delete(`/cvs/${id}`);

export const getCvRequest = async (id) => axios.get(`/cvs/${id}`);