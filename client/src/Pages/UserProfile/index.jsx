import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Box, Paper, Typography, Button } from '@material-ui/core';

import {
  getCurrentUser,
  getLecturerCourses,
  getListenerCourses,
} from '../../_actions';
import DashboardArea from '../../components/DashboardArea';
import ProfileArea from '../../components/ProfileArea';
import CourseList from '../../components/CourseArea/CourseList';

function generateCourses(isLoading, courses, isForLector = false) {
  return (
    <Grid item xs={12}>
      <Box display="flex" justifyContent="space-between">
      <Typography variant="h4">
        {isForLector ? 'My created courses' : 'My courses'}
      </Typography>
      {isForLector ? <Button to={'/course/create'} component={Link}>Create new course</Button> : ''}
      </Box>
      {isLoading ? (
        'Loading'
      ) : courses.length ? (
        <Paper>
          <CourseList courses={courses} />
        </Paper>
      ) : (
        <Typography>
          {isForLector
            ? 'You have not created any course yet'
            : 'You are not sibscribe to any course yet'}
        </Typography>
      )}
    </Grid>
  );
}

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.getLecturerCourses();
    this.props.getListenerCourses();
  }

  render() {
    const {
      userData,
      isUserLoading,
      lecturerCourses,
      listenerCourses,
      isLecturerCoursesLoading,
      isListenerCoursesLoading,
    } = this.props;
    return (
      <DashboardArea pageTitle="My profile">
        <Grid container spacing={3}>
          <Grid item xs>
            <ProfileArea user={userData} isLoading={isUserLoading} />
          </Grid>
          {userData.role === 'ROLE_LECTURER' &&
            generateCourses(isLecturerCoursesLoading, lecturerCourses, true)}
          {generateCourses(isListenerCoursesLoading, listenerCourses)}
        </Grid>
      </DashboardArea>
    );
  }
}

UserProfile.propTypes = {
  userData: PropTypes.object.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  lecturerCourses: PropTypes.array.isRequired,
  listenerCourses: PropTypes.array.isRequired,

  getCurrentUser: PropTypes.func.isRequired,
  getLecturerCourses: PropTypes.func.isRequired,
  getListenerCourses: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const userReducer = state.userReducer;
  const coursesReducer = state.coursesReducer;
  const isCurrentUser = userReducer.isCurrentUser;

  const userData = isCurrentUser
    ? userReducer.currentUser
    : userReducer.userData;
  return {
    userData,
    isUserLoading: userReducer.isRequestProcessing,
    lecturerCourses: coursesReducer.lecturerCourses,
    listenerCourses: coursesReducer.listenerCourses,
    isLecturerCoursesLoading: coursesReducer.isGettingLecturerCourses,
    isListenerCoursesLoading: coursesReducer.isGettingListenerCourses,
  };
};

const mapDispatchToProps = {
  getCurrentUser,
  getLecturerCourses,
  getListenerCourses,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
