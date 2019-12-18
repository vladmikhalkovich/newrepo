import React from 'react';
import { connect } from 'react-redux';
import { addHours } from 'date-fns';
import { getUserLessonsByDate } from '../../_actions';

import DashboardArea from '../../components/DashboardArea';
import Schedule from '../../components/Schedule';

class Calendar extends React.Component {
  render() {
    const { calendarLessons, isGettingLessons, getUserLessonsByDate } = this.props;
    const mapData = calendarLessons.flatMap(({ id: courseId, courseName: title, lessons }) =>
      lessons.map(({ lessonTitle, startTime: startDate, lessonDuration: duration }) => ({
        courseId,
        title,
        lessonTitle,
        startDate,
        endDate: addHours(new Date(startDate), duration),
      }))
    );

    return (
      <DashboardArea>
        <Schedule
          appointments={mapData}
          isLoading={isGettingLessons}
          getData={getUserLessonsByDate}
        />
      </DashboardArea>
    );
  }
}

const mapStateToProps = state => ({
  calendarLessons: state.calendarReducer.calendarLessons,
  isGettingLessons: state.calendarReducer.isGettingLessons,
});

const mapDispatchToProps = {
  getUserLessonsByDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
