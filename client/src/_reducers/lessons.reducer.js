import {
  GET_LESSONS_BY_COURSE_REQUEST,
  GET_LESSONS_BY_COURSE_SUCCESS,
  GET_LESSONS_BY_COURSE_FAILURE,
  GET_LESSON_INFO_REQUEST,
  GET_LESSON_INFO_SUCCESS,
  GET_LESSON_INFO_FAILURE,
  CREATE_LESSON_REQUEST,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAILURE,
  UPDATE_LESSON_REQUEST,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAILURE,
  DELETE_LESSON_REQUEST,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAILURE,
  CLEAR_LESSON_CREATED_STATE,
} from '../_actions';
import createReducer from '../_utils/createReducer';

const defaultState = {
  isRequestProcessing: false,
  isGettingLessonProcessing: false,

  isLessonCreationProgress: false,
  isLessonCreated: false,

  isLessonUpdatingProgress: false,
  isLessonUpdated: false,

  isLessonDeleteRequest: false,
  isLessonDeleted: false,

  lessons: [],
  lessonInfo: {},
  errorMessage: null,
};

export default createReducer(defaultState, (state, action) => ({
  [GET_LESSONS_BY_COURSE_REQUEST]: () => ({
    ...state,
    isRequestProcessing: true,
  }),
  [GET_LESSONS_BY_COURSE_SUCCESS]: () => ({
    ...state,
    isRequestProcessing: false,
    lessons: action.payload.lessons,
  }),
  [GET_LESSONS_BY_COURSE_FAILURE]: () => ({
    ...state,
    isRequestProcessing: false,
    errorMessage: action.payload,
  }),

  [GET_LESSON_INFO_REQUEST]: () => ({
    ...state,
    isGettingLessonProcessing: true,
    lessonInfo: action.payload.lessonInfo,
  }),
  [GET_LESSON_INFO_SUCCESS]: () => ({
    ...state,
    isGettingLessonProcessing: false,
  }),
  [GET_LESSON_INFO_FAILURE]: () => ({
    ...state,
    isGettingLessonProcessing: false,
    errorMessage: action.payload,
  }),

  [CREATE_LESSON_REQUEST]: () => ({
    ...state,
    isLessonCreationProgress: true,
  }),
  [CREATE_LESSON_SUCCESS]: () => ({
    ...state,
    isLessonCreationProgress: false,
    isLessonCreated: true,
  }),
  [CREATE_LESSON_FAILURE]: () => ({
    ...state,
    isLessonCreationProgress: false,
    isLessonCreated: false,
    errorMessage: action.payload,
  }),
  [CLEAR_LESSON_CREATED_STATE]: () => ({
    ...state,
    isLessonCreated: false,
  }),

  [UPDATE_LESSON_REQUEST]: () => ({
    ...state,
    isLessonUpdatingProgress: true,
  }),
  [UPDATE_LESSON_SUCCESS]: () => ({
    ...state,
    isLessonUpdatingProgress: false,
    isLessonUpdated: true,
  }),
  [UPDATE_LESSON_FAILURE]: () => ({
    ...state,
    isLessonUpdatingProgress: false,
    isLessonUpdated: false,
    errorMessage: action.payload,
  }),

  [DELETE_LESSON_REQUEST]: () => ({
    ...state,
    isLessonDeleteRequest: true,
  }),
  [DELETE_LESSON_SUCCESS]: () => ({
    ...state,
    isLessonDeleteRequest: false,
    lessons: state.lessons.filter(lesson => lesson.id !== action.payload.deletedLessonId),
    isLessonDeleted: true,
  }),
  [DELETE_LESSON_FAILURE]: () => ({
    ...state,
    isLessonDeleteRequest: false,
    isLessonDeleted: false,
    errorMessage: action.payload,
  }),
}));
