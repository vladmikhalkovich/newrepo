import { history } from '../_utils/history';
import { authService } from '../_services';
import { getCurrentUser } from './user.actions';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const userLogin = ({ username, password }) => dispatch => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  authService
    .login({ username, password })
    .then(({ headers, status }) => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: headers.authorization,
      });
      localStorage.setItem('authToken', headers.authorization);
      dispatch(getCurrentUser);
      history.push('/dashboard');
    })
    .catch(error => {
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: error.message,
      });
    });
};

export const userLogout = () => dispatch => {
  localStorage.removeItem('authToken');
  history.push('/');
};
