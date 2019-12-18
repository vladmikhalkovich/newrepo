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
