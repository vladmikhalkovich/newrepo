import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format, addHours } from 'date-fns';
import { Typography, Paper, Box } from '@material-ui/core';

import { getLessonsByCourse } from '../../_actions';

class LessonsShedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getLessonsByCourse(this.props.courseId);
  }
  render() {
    const { lessons } = this.props;
    const formatLessonDate = date =>
      format(new Date(date), 'EEEE, MMMM dd, yyyy');
    const formatLessonTime = (time, duration) => {
      return (
        format(new Date(time), 'p') +
        ' - ' +
        format(addHours(new Date(time), duration), 'p')
      );
    };

    return (
      <div>
        {!!lessons.length && (
          <Typography variant="h5" component="h3">
            {'Lessons'}
          </Typography>
        )}
        {lessons &&
          lessons.map(
            ({
              id,
              lessonDescription,
              lessonDuration,
              lessonTitle,
              startTime,
            }) => (
              <Paper key="id">
                <Box p={2} mb={1}>
                  <Typography variant="h6" component="h4">
                    {lessonTitle}
                  </Typography>
                  {formatLessonDate(startTime) +
                    ' at ' +
                    formatLessonTime(startTime, lessonDuration)}
                  <br />
                </Box>
              </Paper>
            )
          )}
      </div>
    );
  }
}

LessonsShedule.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      lessonDescription: PropTypes.string.isRequired,
      lessonDuration: PropTypes.number.isRequired,
      lessonTitle: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = state => ({
  lessons: state.lessonReducer.lessons,
});

const mapDispatchToProps = {
  getLessonsByCourse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsShedule);
