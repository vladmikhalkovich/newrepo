import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  CircularProgress,
  Breadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';
import { getCourseById, updateCourse } from '../../_actions';
import DashboardArea from '../../components/DashboardArea';
import FormCourseUpdater from '../../components/CourseArea/FormCourseUpdater';

class CourseUpdater extends React.Component {
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
    const { courseData, loading, updateCourse } = this.props;

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
                to={`/courses/${this.state.courseId}`}
                component={NavLink}
              >
                {courseData.courseName}
              </Link>
              <Typography color="textSecondary">{'Editing course'}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Paper>
              <Box p={3}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <FormCourseUpdater
                    courseId={this.state.courseId}
                    courseData={courseData}
                    updateCourse={updateCourse}
                  />
                )}
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
  loading: state.coursesReducer.isGettingCourseProcessing,
});

const mapDispatchToProps = {
  getCourseById,
  updateCourse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseUpdater);
