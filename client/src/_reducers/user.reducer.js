import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_ROLE_SUCCESS,
  GET_USER_ROLE_FAILURE,
  CLEAR_USER_STORE,
} from '../_actions';
import createReducer from '../_utils/createReducer';

const DEFAULT_USER = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  skype: '',
  role: '',
  avatar: 'https://i.pravatar.cc/150?img=69',
};

const defaultState = {
  isRequestProcessing: false,

  isCurrentUser: false,
  currentUser: DEFAULT_USER,
  currentUserId: '',
  currentUserRole: '',

  allUsers: [],
  userData: DEFAULT_USER,
  userRole: '',
  errorMessage: null,
};

export default createReducer(defaultState, (state, action) => ({
  [GET_ALL_USERS_REQUEST]: () => ({
    ...state,
  }),
  [GET_ALL_USERS_SUCCESS]: () => ({
    ...state,
    allUsers: action.payload.users,
  }),
  [GET_ALL_USERS_FAILURE]: () => ({
    ...state,
    errorMessage: action.payload,
  }),
  [GET_CURRENT_USER_REQUEST]: () => ({
    ...state,
    isRequestProcessing: true,
  }),
  [GET_CURRENT_USER_SUCCESS]: () => ({
    ...state,
    isRequestProcessing: false,
    isCurrentUser: true,
    currentUser: action.payload.userData,
    currentUserId: action.payload.userData.id,
  }),
  [GET_CURRENT_USER_FAILURE]: () => ({
    ...state,
    errorMessage: action.payload.error,
  }),

  [GET_USER_BY_ID_REQUEST]: () => ({
    ...state,
    isRequestProcessing: true,
  }),
  [GET_USER_BY_ID_SUCCESS]: () => ({
    ...state,
    isRequestProcessing: false,
    userData: action.payload.userData,
  }),
  [GET_USER_BY_ID_FAILURE]: () => ({
    ...state,
    isRequestProcessing: false,
  }),

  [GET_USER_ROLE_SUCCESS]: () => ({
    ...state,
    userRole: action.payload,
  }),
  [GET_USER_ROLE_FAILURE]: () => ({
    ...state,
    errorMessage: action.payload,
  }),

  [CLEAR_USER_STORE]: () => ({
    ...defaultState
  })
}));
