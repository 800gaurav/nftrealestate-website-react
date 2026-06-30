// src/utils/axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';



// export const baseUrl = 'https://230pns71-3010.inc1.devtunnels.ms/';

// export const baseUrl = 'http://192.168.1.52:6969';

// export const baseUrl = 'https://backend.nftrealestate.us';
// export const imgBaseUrl = 'https://backend.nftrealestate.us';

// export const baseUrl = 'http://api.nftrealestate.genzteck.com';
// export const imgBaseUrl = 'http://api.nftrealestate.genzteck.com';

export const baseUrl = 'http://localhost:5000';
export const imgBaseUrl = 'http://localhost:5000';




const token = Cookies.get('TOKEN') || '';
const axiosInstance = (token) =>{

  return axios.create({
    baseURL: baseUrl,
    // timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

export default axiosInstance;
