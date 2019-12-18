import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, Box, IconButton } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import { formatLessonStart, formatLessonTime } from '../../_utils/dateHelpers';
import { getLessonsByCourse, deleteLesson } from '../../_actions';

class LessonsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || 'Lessons',
    };
  }

  componentDidMount() {
    this.props.getLessonsByCourse(this.props.courseId);
  }

  render() {
    const { lessons, isForLecturer } = this.props;
    const formatedLessonDateTime = (dateTime, duration) =>
      formatLessonStart(dateTime) +
      ' at ' +
      formatLessonTime(dateTime, duration);

    return (
      <div>
        <Box mb={2}>
          <Typography variant="h5" component="h3">
            {this.state.title}
          </Typography>
        </Box>
        {!!lessons.length ? (
          lessons.map(({ id, lessonDuration, lessonTitle, startTime }) => (
            <Paper key={id + lessonTitle}>
              <Box
                p={2}
                mb={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box flexGrow={1}>
                  <Typography variant="h6" component="h4">
                    {lessonTitle}
                  </Typography>
                  <Typography variant="body2">
                    {formatedLessonDateTime(startTime, lessonDuration)}
                  </Typography>
                </Box>
                {isForLecturer ? (
                  <IconButton onClick={() => this.props.deleteLesson(id)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                ) : (
                  ''
                )}
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body2">{'No lessons created'}</Typography>
        )}
      </div>
    );
  }
}

LessonsList.propTypes = {
  title: PropTypes.string,
  courseId: PropTypes.string.isRequired,
  isForLecturer: PropTypes.bool.isRequired,
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      lessonDuration: PropTypes.number.isRequired,
      lessonTitle: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  getLessonsByCourse: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lessons: state.lessonReducer.lessons,
});

const mapDispatchToProps = {
  getLessonsByCourse,
  deleteLesson,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsList);
