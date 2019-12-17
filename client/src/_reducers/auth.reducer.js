import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
} from '../_actions';
import createReducer from '../_utils/createReducer';

const token = localStorage.getItem('authToken') || '';

const defaultState = {
  isLoggedIn: !!token,
  isUserLoginProcessing: false,
  isUserLogoutProcessing: false,
  errorMessage: null,
  authToken: token,
};

export default createReducer(defaultState, (state, action) => ({
  [USER_LOGIN_REQUEST]: () => ({
    ...state,
    isUserLoginProcessing: true,
  }),
  [USER_LOGIN_SUCCESS]: () => ({
    ...state,
    isUserLoginProcessing: false,
    isLoggedIn: true,
    authToken: action.payload,
  }),
  [USER_LOGIN_FAILURE]: () => ({
    ...state,
    isUserLoginProcessing: false,
    errorMessage: action.payload,
  }),
  [USER_LOGOUT_REQUEST]: () => ({
    ...state,
    isUserLogoutProcessing: true,
  }),
  [USER_LOGOUT_SUCCESS]: () => ({
    ...state,
    isUserLogoutProcessing: false,
    isLoggedIn: false,
    authToken: action.payload.token,
  }),
  [USER_LOGOUT_FAILURE]: () => ({
    ...state,
    isUserLogoutProcessing: false,
    errorMessage: action.payload,
  }),
}));
