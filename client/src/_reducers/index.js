import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import coursesReducer from './courses.reducer';
import lessonReducer from './lessons.reducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  coursesReducer,
  lessonReducer,
});

export default rootReducer;
