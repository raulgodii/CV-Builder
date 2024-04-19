import axios from './axios';

export const convertRequest = () => axios.post(`/convert`);
