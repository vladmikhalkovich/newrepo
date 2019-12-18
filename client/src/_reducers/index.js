import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import coursesReducer from './courses.reducer';
import lessonReducer from './lessons.reducer';
import calendarReducer from './calendar.reducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  coursesReducer,
  lessonReducer,
  calendarReducer,
});

export default rootReducer;
