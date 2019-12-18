import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { addHours, startOfWeek, startOfMonth } from 'date-fns';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  Scheduler,
  WeekView,
  MonthView,
  Toolbar,
  Resources,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Grid, Paper } from '@material-ui/core';

import Api from '../../api/config';
import { currentDate } from '../../_utils/dateHelpers';

import { CheckBoxContainer } from './CheckBoxContainer';
import { ToolbarWithLoading } from './Toolbar';

const mapData = data =>
  data.flatMap(({ id: courseId, courseName: title, lessons }) =>
    lessons.map(({ lessonTitle, startTime: startDate, lessonDuration: duration }) => ({
      courseId,
      title,
      lessonTitle,
      startDate,
      endDate: addHours(new Date(startDate), duration),
    }))
  );

const formatQueryString = (currentDate, currentViewName) => {
  const format = 'YYYY-MM-DDTHH:mm';
  const start = moment(currentDate).startOf(currentViewName.toLowerCase());
  const end = start.clone().endOf(currentViewName.toLowerCase());
  return `start=${start.format(format)}&end=${end.format(format)}`;
};

class Schedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      shadePreviousCells: true,
      shadePreviousAppointments: true,
      updateInterval: 10000,
      currentDate: currentDate,
      currentViewName: 'Month',
    };
    this.loadData = this.loadData.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.currentDateChange = currentDate => {
      this.setState({ currentDate, loading: true });
    };
    this.currentViewNameChange = currentViewName => {
      this.setState({ currentViewName, loading: true });
    };
  }

  handleCheckboxChange(stateField) {
    const { [stateField]: fieldToChange } = this.state;
    this.setState({
      [stateField]: !fieldToChange,
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { currentDate, currentViewName, loading } = this.state;
    const query = formatQueryString(currentDate, currentViewName);
    if (query === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    Api()
      .get(`calendar?${query}`)
      .then(({ data }) => {
        this.setState({
          data,
          loading: false,
        });
      })
      .catch(error => {
        console.warn(error);
        this.setState({
          loading: false,
        });
      });
    this.lastQuery = query;
  }

  render() {
    const {
      data,
      loading,
      currentDate,
      currentViewName,
      shadePreviousCells,
      shadePreviousAppointments,
    } = this.state;

    const formattedData = data ? mapData(data) : [];

    return (
      <>
        <Grid container>
          <CheckBoxContainer
            shadePreviousCells={shadePreviousCells}
            shadePreviousAppointments={shadePreviousAppointments}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        </Grid>

        <Paper>
          <Scheduler data={formattedData}>
            <ViewState
              currentDate={currentDate}
              currentViewName={currentViewName}
              onCurrentViewNameChange={this.currentViewNameChange}
              onCurrentDateChange={this.currentDateChange}
            />

            <WeekView startDayHour={8} endDayHour={20} />
            <MonthView startDayHour={8} endDayHour={20} />

            <Toolbar {...(loading ? { rootComponent: ToolbarWithLoading } : null)} />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip />

            <CurrentTimeIndicator
              shadePreviousCells={shadePreviousCells}
              shadePreviousAppointments={shadePreviousAppointments}
            />
          </Scheduler>
        </Paper>
      </>
    );
  }
}

export default Schedule;
