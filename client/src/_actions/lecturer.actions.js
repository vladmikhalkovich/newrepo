import lecturerService from '../_services';

export const GET_LECTURER_COURSES_REQUEST = 'GET_LECTURER_COURSES_REQUEST';
export const GET_LECTURER_COURSES_SUCCESS = 'GET_LECTURER_COURSES_SUCCESS';
export const GET_LECTURER_COURSES_FAILURE = 'GET_LECTURER_COURSES_FAILURE';

export const getLecturerCourses = () => dispatch => {
  dispatch({
    type: GET_LECTURER_COURSES_REQUEST,
  });

  lecturerService
    .getLecturerCourses()
    .then(res => {
      dispatch({
        type: GET_LECTURER_COURSES_SUCCESS,
        payload: res.data,
      });
    })
    .cath(error => {
      dispatch({
        type: GET_LECTURER_COURSES_FAILURE,
        payload: error.message,
      });
    });
};
