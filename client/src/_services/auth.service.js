import Api from '../api/config';

const login = authData => Api().post('/login', authData);

export const authService = {
  login,
};
