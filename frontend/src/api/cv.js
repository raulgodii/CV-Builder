import axios from './axios';

export const convertRequest = (html) => axios.post('/convert', html, { responseType: 'blob' });

export const getCvsRequest = async () => axios.get("/cvs");

export const createCvRequest = async (cv) => axios.post("/cvs", cv);

export const updateCvRequest = async (id, cv) => axios.put(`/cvs/${id}`, cv);

export const uploadFotoRequest = async (id, foto) => axios.post(`/cv/uploadFoto/${id}`, foto);

export const loadFileRequest = async (foto) => axios.get(`/cv/files/${foto}`);

export const deleteCvRequest = async (id) => axios.delete(`/cvs/${id}`);

export const getCvRequest = async (id) => axios.get(`/cvs/${id}`);