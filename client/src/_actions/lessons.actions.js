import { lessonService } from '../_services';

export const GET_LESSONS_BY_COURSE_REQUEST = 'GET_LESSONS_BY_COURSE_REQUEST';
export const GET_LESSONS_BY_COURSE_SUCCESS = 'GET_LESSONS_BY_COURSE_SUCCESS';
export const GET_LESSONS_BY_COURSE_FAILURE = 'GET_LESSONS_BY_COURSE_FAILURE';

export const GET_LESSON_INFO_REQUEST = 'GET_LESSON_INFO_REQUEST';
export const GET_LESSON_INFO_SUCCESS = 'GET_LESSON_INFO_SUCCESS';
export const GET_LESSON_INFO_FAILURE = 'GET_LESSON_INFO_FAILURE';

export const CREATE_LESSON_REQUEST = 'CREATE_LESSON_REQUEST';
export const CREATE_LESSON_SUCCESS = 'CREATE_LESSON_SUCCESS';
export const CREATE_LESSON_FAILURE = 'CREATE_LESSON_FAILURE';

export const UPDATE_LESSON_REQUEST = 'UPDATE_LESSON_REQUEST';
export const UPDATE_LESSON_SUCCESS = 'UPDATE_LESSON_SUCCESS';
export const UPDATE_LESSON_FAILURE = 'UPDATE_LESSON_FAILURE';

export const DELETE_LESSON_REQUEST = 'DELETE_LESSON_REQUEST';
export const DELETE_LESSON_SUCCESS = 'DELETE_LESSON_SUCCESS';
export const DELETE_LESSON_FAILURE = 'DELETE_LESSON_FAILURE';

export const CLEAR_LESSON_CREATED_STATE = 'CLEAR_LESSON_CREATED_STATE';

export const getLessonsByCourse = courseId => dispatch => {
  dispatch({ type: GET_LESSONS_BY_COURSE_REQUEST });

  lessonService
    .getLessonsCourse(courseId)
    .then(res => {
      dispatch({
        type: GET_LESSONS_BY_COURSE_SUCCESS,
        payload: { lessons: res.data },
      });
    })
    .catch(error => {
      dispatch({
        type: GET_LESSONS_BY_COURSE_FAILURE,
        payload: error.message,
      });
    });
};

export const getLessonInfo = lessonId => dispatch => {
  dispatch({ type: GET_LESSON_INFO_REQUEST });

  lessonService
    .getLessonInfo(lessonId)
    .then(res => {
      dispatch({
        type: GET_LESSON_INFO_REQUEST,
        payload: { lessonInfo: res.data },
      });
    })
    .catch(error => {
      dispatch({ type: GET_LESSON_INFO_FAILURE, payload: error.message });
    });
};

export const createLesson = (courseId, lessonData) => dispatch => {
  dispatch({ type: CREATE_LESSON_REQUEST });

  lessonService
    .createLesson(courseId, lessonData)
    .then(res => {
      dispatch({ type: CREATE_LESSON_SUCCESS });
    })
    .then(() => {
      dispatch({ type: CLEAR_LESSON_CREATED_STATE });
    })
    .catch(error => {
      dispatch({ type: CREATE_LESSON_FAILURE, payload: error.message });
    });
};

export const updateLesson = (lessonId, lessonData) => dispatch => {
  dispatch({ type: UPDATE_LESSON_REQUEST });

  lessonService
    .updateLesson(lessonId, lessonData)
    .then(res => {
      dispatch({ type: UPDATE_LESSON_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: UPDATE_LESSON_FAILURE, payload: error.message });
    });
};

export const deleteLesson = lessonId => dispatch => {
  dispatch({ type: DELETE_LESSON_REQUEST });

  lessonService
    .deleteLesson(lessonId)
    .then(() => {
      dispatch({ type: DELETE_LESSON_SUCCESS, payload: { deletedLessonId: lessonId } });
    })
    .catch(error => {
      dispatch({ type: DELETE_LESSON_FAILURE, payload: error.message });
    });
};
