import axios from './axios';

export const emailRequest = () => axios.get(`/email`);