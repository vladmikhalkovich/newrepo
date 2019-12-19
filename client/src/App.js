import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import 'typeface-roboto';
import { CssBaseline } from '@material-ui/core';
import { history } from './_utils/history';

import { PrivateRoute } from './components/PrivateRoute';
import Notfound from './notfound';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserProfile from './Pages/UserProfile';
import Courses from './Pages/Courses';
import Calendar from './Pages/Calendar';
import CourseInfo from './components/CourseArea/CourseInfo';
import CourseCreator from './Pages/CourseCreator';
import CourseUpdater from './Pages/CourseUpdater';
import LessonsCreator from './Pages/LessonsCreator';
import AdminPage from './Pages/Admin/AdminPage';

const App = () => {
  return (
    <Router history={history}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/admin/users" component={AdminPage} />
        <PrivateRoute exact path="/profile" component={UserProfile} />
        <PrivateRoute exact path="/courses" component={Courses} />
        <PrivateRoute exact path="/courses/:courseId" component={CourseInfo} />
        <PrivateRoute
          exact
          path="/courses/:courseId/add_lesson"
          component={LessonsCreator}
        />
        <PrivateRoute exact path="/course/create" component={CourseCreator} />
        <PrivateRoute
          exact
          path="/course/edit/:courseId"
          component={CourseUpdater}
        />
        <PrivateRoute exact path="/calendar" component={Calendar} />
        <Route component={Notfound} />
      </Switch>
    </Router>
  );
};

export default App;
