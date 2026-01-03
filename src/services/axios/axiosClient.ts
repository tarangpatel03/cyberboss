import axios from 'axios';
import { BASE_URL, XAPI_TOKEN } from '@config/constants/axiosValues';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Token': XAPI_TOKEN,
  },
});
