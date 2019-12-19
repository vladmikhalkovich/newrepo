import { userService } from '../_services';

const uniqueAvatarCreator = id => `https://i.pravatar.cc/150?u=1${id}`;

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

export const GET_CURRENT_USER_ROLE_SUCCESS = 'GET_CURRENT_USER_ROLE_SUCCESS';
export const GET_CURRENT_USER_ROLE_FAILURE = 'GET_CURRENT_USER_ROLE_FAILURE';

export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE';

export const GET_USER_ROLE_SUCCESS = 'GET_USER_ROLE_SUCCESS';
export const GET_USER_ROLE_FAILURE = 'GET_USER_ROLE_FAILURE';

export const CLEAR_USER_STORE = 'CLEAR_USER_STORE';

export const getAllUsers = () => dispatch => {
  dispatch({ type: GET_ALL_USERS_REQUEST });
  userService
    .getAllUsers()
    .then(res => {
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: { users: res.data } });
    })
    .catch(error => {
      dispatch({ type: GET_ALL_USERS_FAILURE, payload: error.message });
    });
};

export const getCurrentUserRole = userId => dispatch => {
  userService
    .getRoleByID(userId)
    .then(res => {
      dispatch({ type: GET_CURRENT_USER_ROLE_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: GET_CURRENT_USER_ROLE_FAILURE, payload: error.message });
    });
};

export const getCurrentUser = () => dispatch => {
  dispatch({
    type: GET_CURRENT_USER_REQUEST,
  });

  userService
    .getCurrentUser()
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: {
          userData: {
            ...res.data,
            avatar: uniqueAvatarCreator(res.data.id),
          },
        },
      });
    })
    .catch(error => {
      dispatch({
        type: GET_CURRENT_USER_FAILURE,
        payload: error.message,
      });
    });
};

export const getRoleByID = userId => dispatch => {
  userService
    .getRoleByID(userId)
    .then(res => {
      dispatch({
        type: GET_USER_ROLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({ type: GET_USER_ROLE_FAILURE, payload: error.message });
    });
};

export const getUserById = userId => dispatch => {
  dispatch({ type: GET_USER_BY_ID_REQUEST });

  userService
    .getUserByID(userId)
    .then(res => {
      dispatch({
        type: GET_USER_BY_ID_SUCCESS,
        payload: {
          userData: {
            ...res.data,
            avatar: uniqueAvatarCreator(res.data.id),
          },
        },
      });
    })
    .catch(error => {
      dispatch({
        type: GET_USER_BY_ID_FAILURE,
        payload: error.message,
      });
    });
};

export const clearUserStore = () => dispatch => {
  dispatch({ type: CLEAR_USER_STORE });
};
