import API from '../api/config';

const login = authData => API.post('/login', authData);

export const authService = {
  login,
};
