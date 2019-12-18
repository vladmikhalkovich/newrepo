import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink, useParams, useRouteMatch } from 'react-router-dom';

import {
  Breadcrumbs,
  Grid,
  Link,
  CircularProgress,
  Box,
  Chip,
  Avatar,
  Paper,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';

import {
  getCurrentUser,
  getCourseById,
  enrollCourse,
  leaveCourse,
  findUserInListeners,
} from '../../_actions';
import { formatCategory } from '../../_utils/stringFormatter';
import { formatCourseStart } from '../../_utils/dateHelpers';
import DashboardArea from '../DashboardArea';
import LessonsList from '../Lessons/LessonsList';

import { useStyles } from './styles';

const CourseInfo = ({
  currentUserId,
  courseData,
  isLoading,
  isSubscribing,
  isSubscribedUser,
  isSubscribed,
  getCurrentUser,
  getCourseById,
  enrollCourse,
  leaveCourse,
}) => {
  const classes = useStyles();
  const { courseId } = useParams();
  const { url } = useRouteMatch();
  const {
    id,
    courseName,
    courseDescription,
    courseDuration,
    startDate,
    category,
    lecturerId,
    listeners,
  } = courseData;

  const isStartDateAfterNow =
    new Date(startDate).getTime() > new Date().getTime();
  const isCurrentUserLector = lecturerId === currentUserId;

  const handleEnrollClick = () => {
    enrollCourse(id);
  };

  const handleLeaveClick = () => {
    leaveCourse(id);
  };

  useEffect(() => {
    getCourseById(courseId);
    getCurrentUser();
  }, [courseId, getCourseById, getCurrentUser, isSubscribedUser]);

  function coursePrimaryInfo() {
    return (
      <>
        <Typography gutterBottom variant="h4" component="h2">
          {courseName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {courseDescription}
        </Typography>
        <Divider />
        {courseDuration > 0 && <Typography>{courseDuration} hours</Typography>}
        <Typography>
          {'Category: '}
          {formatCategory(category)}
        </Typography>
        <Typography>
          {'Start Date: '}
          {startDate && formatCourseStart(startDate)}
        </Typography>
      </>
    );
  }

  function courseListeners() {
    return (
      <div className={classes.listeners}>
        {listeners.map(({ id, firstName, lastName }) => (
          <Chip
            key={id + 'listener'}
            className={classes.courseListener}
            avatar={
              <Avatar
                alt=""
                aria-hidden
                src={`https://i.pravatar.cc/150?u=${id}`}
              />
            }
            label={`${firstName} ${lastName}`}
            variant="outlined"
          />
        ))}
      </div>
    );
  }

  return (
    <DashboardArea>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/courses" component={RouterLink}>
              Courses
            </Link>
            <Link
              color="inherit"
              to={`/courses/${courseId}`}
              component={RouterLink}
            >
              {courseName}
            </Link>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          {isLoading && !id.length ? (
            <CircularProgress size={24} />
          ) : (
            <Paper>
              <Box p={3}>
                {coursePrimaryInfo()}
                {courseListeners()}
                {isStartDateAfterNow ? (
                  isCurrentUserLector ? (
                    <div className={classes.btnWrapper}>
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        to={`/course/edit/${courseId}`}
                        disabled={isSubscribing}
                        component={RouterLink}
                      >
                        {'Edit course'}
                      </Button>
                      <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        to={`${url}/add_lesson`}
                        disabled={isSubscribing}
                        component={RouterLink}
                      >
                        {'Add lessons'}
                      </Button>
                    </div>
                  ) : (
                    <div className={classes.btnWrapper}>
                      {isSubscribed ? 'Changed your mind?' : null}
                      <Button
                        size="large"
                        variant={isSubscribed ? 'outlined' : 'contained'}
                        color="secondary"
                        disabled={isSubscribing}
                        onClick={
                          isSubscribed ? handleLeaveClick : handleEnrollClick
                        }
                      >
                        {isSubscribed ? 'Unsubscribe' : 'Enroll'}
                      </Button>
                      {isSubscribing && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  )
                ) : (
                  'Course is already started or ended'
                )}
              </Box>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12}>
          {!isLoading && (
            <LessonsList
              courseId={courseId}
              isForLecturer={isCurrentUserLector}
            />
          )}
        </Grid>
      </Grid>
    </DashboardArea>
  );
};

CourseInfo.propTypes = {
  courseData: PropTypes.object.isRequired,
  currentUserId: PropTypes.any.isRequired,

  isLoading: PropTypes.bool.isRequired,
  isSubscribing: PropTypes.bool.isRequired,
  isSubscribedUser: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired,

  getCurrentUser: PropTypes.func.isRequired,
  getCourseById: PropTypes.func.isRequired,
  enrollCourse: PropTypes.func.isRequired,
  leaveCourse: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const coursesReducer = state.coursesReducer;
  const currentUserId = state.userReducer.currentUserId;
  const courseData = coursesReducer.singleCourseData;

  const isCurrentUserSubscribed = findUserInListeners(
    courseData.listeners,
    currentUserId
  );

  return {
    currentUserId,
    courseData,
    isLoading: coursesReducer.isGettingCourseProcessing,
    isSubscribing: coursesReducer.isSubscribeProcessing,
    isSubscribedUser: coursesReducer.isSubscribedUser,
    isSubscribed: isCurrentUserSubscribed || false,
  };
};

const mapDispatchToProps = {
  getCurrentUser,
  getCourseById,
  enrollCourse,
  leaveCourse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseInfo);
