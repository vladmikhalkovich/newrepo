import {
  GET_ALL_COURSES_REQUEST,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAILURE,
  GET_COURSE_BY_ID_REQUEST,
  GET_COURSE_BY_ID_SUCCESS,
  GET_COURSE_BY_ID_FAILURE,
  ENROLL_COURSE_REQUEST,
  ENROLL_COURSE_SUCCESS,
  ENROLL_COURSE_FAILURE,
  LEAVE_COURSE_REQUEST,
  LEAVE_COURSE_SUCCESS,
  LEAVE_COURSE_FAILURE,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE,
  GET_LECTURER_COURSES_REQUEST,
  GET_LECTURER_COURSES_SUCCESS,
  GET_LECTURER_COURSES_FAILURE,
  GET_LISTENER_COURSES_REQUEST,
  GET_LISTENER_COURSES_SUCCESS,
  GET_LISTENER_COURSES_FAILURE,
} from '../_actions/coursesActionTypes';
import createReducer from '../_utils/createReducer';

const DEFAULT_COURSE = {
  id: '',
  courseName: '',
  courseDescription: '',
  courseDuration: '',
  startDate: '',
  category: '',
  lecturerId: '',
  listeners: [],
  imageUrl: 'https://picsum.photos/id/0/600/500',
};

const defaultState = {
  isRequestProcessing: false,
  isGettingCourseProcessing: false,
  isGettingLecturerCourses: false,
  isGettingListenerCourses: false,

  isSubscribeProcessing: false,
  isSubscribedUser: false,

  isCourseCreationProgress: false,
  isCourseCreated: false,

  isCourseUpdatingProgress: false,
  isCourseUpdated: false,

  courses: [],
  lecturerCourses: [],
  listenerCourses: [],
  errorMessage: null,
  singleCourseData: DEFAULT_COURSE,
};

export default createReducer(defaultState, (state, action) => ({
  [GET_ALL_COURSES_REQUEST]: () => ({
    ...state,
    isRequestProcessing: true,
  }),
  [GET_ALL_COURSES_SUCCESS]: () => ({
    ...state,
    isRequestProcessing: false,
    courses: action.payload.courses,
  }),
  [GET_ALL_COURSES_FAILURE]: () => ({
    ...state,
    isRequestProcessing: false,
    errorMessage: action.payload.error,
  }),

  [GET_COURSE_BY_ID_REQUEST]: () => ({
    ...state,
    isGettingCourseProcessing: true,
  }),
  [GET_COURSE_BY_ID_SUCCESS]: () => ({
    ...state,
    isGettingCourseProcessing: false,
    singleCourseData: action.payload.courseData,
  }),
  [GET_COURSE_BY_ID_FAILURE]: () => ({
    ...state,
    isGettingCourseProcessing: false,
    errorMessage: action.payload.error,
  }),

  // subscribe to course
  [ENROLL_COURSE_REQUEST]: () => ({
    ...state,
    isSubscribeProcessing: true,
  }),
  [ENROLL_COURSE_SUCCESS]: () => ({
    ...state,
    isSubscribeProcessing: false,
    isSubscribedUser: true,
  }),
  [ENROLL_COURSE_FAILURE]: () => ({
    ...state,
    isSubscribeProcessing: false,
    isSubscribedUser: false,
    errorMessage: action.payload.error,
  }),

  // unsubscribe
  [LEAVE_COURSE_REQUEST]: () => ({
    ...state,
    isSubscribeProcessing: true,
  }),
  [LEAVE_COURSE_SUCCESS]: () => ({
    ...state,
    isSubscribeProcessing: false,
    isSubscribedUser: false,
  }),
  [LEAVE_COURSE_FAILURE]: () => ({
    ...state,
    isSubscribeProcessing: false,
    isSubscribedUser: true,
    errorMessage: action.payload.error,
  }),

  // create new course
  [CREATE_COURSE_REQUEST]: () => ({
    ...state,
    isCourseCreationProgress: true,
  }),
  [CREATE_COURSE_SUCCESS]: () => ({
    ...state,
    isCourseCreationProgress: false,
    isCourseCreated: true,
  }),
  [CREATE_COURSE_FAILURE]: () => ({
    ...state,
    isCourseCreationProgress: false,
    isCourseCreated: false,
    errorMessage: action.payload.error,
  }),

  // update course info
  [UPDATE_COURSE_REQUEST]: () => ({
    ...state,
    isCourseUpdatingProgress: true,
  }),
  [UPDATE_COURSE_SUCCESS]: () => ({
    ...state,
    isCourseUpdatingProgress: false,
    isCourseUpdated: true,
  }),
  [UPDATE_COURSE_FAILURE]: () => ({
    ...state,
    isCourseUpdatingProgress: false,
    isCourseUpdated: false,
    errorMessage: action.payload.error,
  }),

  [GET_LECTURER_COURSES_REQUEST]: () => ({
    ...state,
    isGettingLecturerCourses: true,
  }),
  [GET_LECTURER_COURSES_SUCCESS]: () => ({
    ...state,
    isGettingLecturerCourses: false,
    lecturerCourses: action.payload.courses,
  }),
  [GET_LECTURER_COURSES_FAILURE]: () => ({
    ...state,
    isGettingLecturerCourses: false,
    errorMessage: action.payload.error,
  }),
  [GET_LISTENER_COURSES_REQUEST]: () => ({
    ...state,
    isGettingListenerCourses: true,
  }),
  [GET_LISTENER_COURSES_SUCCESS]: () => ({
    ...state,
    isGettingListenerCourses: false,
    listenerCourses: action.payload.courses,
  }),
  [GET_LISTENER_COURSES_FAILURE]: () => ({
    ...state,
    isGettingListenerCourses: false,
    errorMessage: action.payload.error,
  }),
}));
