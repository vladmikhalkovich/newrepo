import axios from 'axios';

//const cors_api_host = 'cors-anywhere.herokuapp.com';
//const cors_api_url = 'https://' + cors_api_host + '/';
//const ngrok_server_number = 'b042c61a';

export const ENDPOINT = 'https://training-center-boot.herokuapp.com'
  //cors_api_url + 'http://' + ngrok_server_number + '.ngrok.io';

const api = () => axios.create({
  baseURL: ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('authToken')
  },
});

export default api;
