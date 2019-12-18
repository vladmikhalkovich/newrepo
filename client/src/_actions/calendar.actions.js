import { lessonService } from '../_services';

export const GET_LESSONS_DATE_REQUEST = 'GET_LESSONS_DATE_REQUEST';
export const GET_LESSONS_DATE_SUCCESS = 'GET_LESSONS_DATE_SUCCESS';
export const GET_LESSONS_DATE_FAILURE = 'GET_LESSONS_DATE_FAILURE';

export const getUserLessonsByDate = query => dispatch => {
  dispatch({
    type: GET_LESSONS_DATE_REQUEST,
  });

  lessonService
    .getUserLessonsByDate(query)
    .then(res => {
      dispatch({
        type: GET_LESSONS_DATE_SUCCESS,
        payload: { lessons: res.data },
      });
    })
    .catch(error => {
      dispatch({
        type: GET_LESSONS_DATE_FAILURE,
        payload: error.message,
      });
    });
};
