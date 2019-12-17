import { SECURE_API } from '../api/config';

const API_URL = 'user_profile';

const getAllUsers = () => SECURE_API.get(`${API_URL}/all`);

const getLoggedUser = token => SECURE_API.get(`${API_URL}`);

const getUserProfile = userId => SECURE_API.get(`${API_URL}/${userId}`);

const getUserRole = userId => SECURE_API.get(`${API_URL}/${userId}/role`);

const updateLoggedUser = userData =>
  SECURE_API.put(`${API_URL}/update`, userData);

const updateUserPassword = newPswd =>
  SECURE_API.put(`${API_URL}/edit_password`, newPswd);

export const userService = {
  getAllUsers,
  getCurrentUser: getLoggedUser,
  getUserByID: getUserProfile,
  getRoleByID: getUserRole,
  updateCurrentUser: updateLoggedUser,
  updatePassword: updateUserPassword,
};
