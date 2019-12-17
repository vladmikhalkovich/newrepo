import axios from 'axios';

const cors_api_host = 'cors-anywhere.herokuapp.com';
const cors_api_url = 'https://' + cors_api_host + '/';
const ngrok_server_number = '8c32bacf';

const headers = {
  'Content-Type': 'application/json',
  // 'Content-Type': 'x-www-form-urlencoded',
};

export const API_URL =
  cors_api_url + 'http://' + ngrok_server_number + '.ngrok.io';

export default axios.create({
  baseURL: API_URL,
  headers,
});

export const SECURE_API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('authToken'),
  },
});
