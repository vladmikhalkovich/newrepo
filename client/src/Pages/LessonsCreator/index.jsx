import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Breadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';
import { getCourseById, createLesson } from '../../_actions';

import DashboardArea from '../../components/DashboardArea';
import FormLessonCreator from '../../components/Lessons/FormLessonCreator';

class LessonsCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: props.match.params.courseId,
    };
  }
  componentDidMount() {
    this.props.getCourseById(this.state.courseId);
  }

  render() {
    const { courseData, createLesson } = this.props;
    const { courseId } = this.state;

    return (
      <DashboardArea>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to="/courses" component={NavLink}>
                {'All Courses'}
              </Link>
              <Link
                color="inherit"
                to={`/courses/${courseId}`}
                component={NavLink}
              >
                {courseData.courseName}
              </Link>
              <Typography color="textSecondary">{'Add lessons'}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Paper>
              <Box p={3}>
                <FormLessonCreator
                  courseId={courseId}
                  action={createLesson}
                  minDate={courseData.startDate}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DashboardArea>
    );
  }
}

const mapStateToProps = state => ({
  courseData: state.coursesReducer.singleCourseData,
});

const mapDispatchToProps = {
  getCourseById,
  createLesson,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsCreator);
