import Api from '../api/config';

const API_PREFIX = 'user_profile';

const getAllUsers = () => Api().get(`${API_PREFIX}/all`);

const getLoggedUser = token => Api().get(`${API_PREFIX}`);

const getUserProfile = userId => Api().get(`${API_PREFIX}/${userId}`);

const getUserRole = userId => Api().get(`${API_PREFIX}/${userId}/role`);

const updateLoggedUser = userData =>
  Api().put(`${API_PREFIX}/update`, userData);

const updateUserPassword = newPswd =>
  Api().put(`${API_PREFIX}/edit_password`, newPswd);

export const userService = {
  getAllUsers,
  getCurrentUser: getLoggedUser,
  getUserByID: getUserProfile,
  getRoleByID: getUserRole,
  updateCurrentUser: updateLoggedUser,
  updatePassword: updateUserPassword,
};
