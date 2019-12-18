import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as NavLink } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Button } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

import {
  getCurrentUser,
  getLecturerCourses,
  getListenerCourses,
} from '../../_actions';
import DashboardArea from '../../components/DashboardArea';
import ProfileArea from '../../components/ProfileArea';
import CourseList from '../../components/CourseArea/CourseList';

function generateCourses(isLoading, courses, isForLecturer = false) {
  return (
    <Grid item xs={12}>
      <Box
        mt={1}
        mb={2}
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Typography variant="h4">
          {isForLecturer ? 'My created courses' : 'My courses'}
        </Typography>
        {isForLecturer ? (
          <Button
            to="/course/create"
            component={NavLink}
            startIcon={<AddCircleOutlineRoundedIcon/>}
          >
            {'Create new'}
          </Button>
        ) : (
          ''
        )}
      </Box>

      {isLoading ? (
        'Loading'
      ) : courses.length ? (
        <Paper>
          <CourseList courses={courses} />
        </Paper>
      ) : (
        <Typography>
          {isForLecturer
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
      isCurrentUser,
      isUserLoading,
      lecturerCourses,
      listenerCourses,
      isLecturerCoursesLoading,
      isListenerCoursesLoading,
    } = this.props;
    return (
      <DashboardArea>
        <Grid container spacing={3}>
          <Grid item xs>
            <ProfileArea user={userData} isLoading={isUserLoading} isCurrentUser={isCurrentUser} />
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
  isCurrentUser: PropTypes.bool.isRequired,
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
    isCurrentUser,
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
  mapDispatchToProps,
)(UserProfile);
