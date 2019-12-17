import * as React from 'react';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  Scheduler,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';

import {
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import DashboardArea from '../../components/DashboardArea';
import { appointments, currentDate } from './data';

const styles = ({ spacing }) => ({
  checkBoxContainer: {
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    paddingLeft: spacing(4),
    marginTop: -1 * spacing(3),
  },
  textField: {
    marginRight: spacing(4),
    marginLeft: spacing(1),
    width: '120px',
  },
});

const ShadeCellsCheckBox = ({ shadePreviousCells, handleChange }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={shadePreviousCells}
        onChange={() => handleChange('shadePreviousCells')}
        color="primary"
      />
    }
    label="Shade previous cells"
  />
);

const ShadePreviousAppointmentsCheckBox = ({
  shadePreviousAppointments,
  handleChange,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={shadePreviousAppointments}
        onChange={() => handleChange('shadePreviousAppointments')}
        color="primary"
      />
    }
    label="Shade previous appointments"
  />
);
const CheckBoxContainer = withStyles(styles, { name: 'CheckBoxContainer' })(
  ({
    shadePreviousCells,
    shadePreviousAppointments,
    handleCheckboxChange,
    classes,
  }) => (
    <Grid
      item
      container
      direction="row"
      className={classes.checkBoxContainer}
      xs
    >
      <ShadeCellsCheckBox
        shadePreviousCells={shadePreviousCells}
        handleChange={handleCheckboxChange}
      />
      <ShadePreviousAppointmentsCheckBox
        shadePreviousAppointments={shadePreviousAppointments}
        handleChange={handleCheckboxChange}
      />
    </Grid>
  )
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      defaultDate: currentDate,
      shadePreviousCells: true,
      shadePreviousAppointments: true,
      updateInterval: 10000,
    };

    this.onCommitChanges = this.commitChanges.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState(state => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  handleCheckboxChange(stateField) {
    const { [stateField]: fieldToChange } = this.state;
    this.setState({
      [stateField]: !fieldToChange,
    });
  }

  render() {
    const {
      data,
      shadePreviousCells,
      shadePreviousAppointments,
    } = this.state;

    return (
      <DashboardArea>
        <Grid container>
          <CheckBoxContainer
            shadePreviousCells={shadePreviousCells}
            shadePreviousAppointments={shadePreviousAppointments}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        </Grid>

        <Paper>
          <Scheduler data={data} >
            <ViewState defaultCurrentDate={currentDate} />
            <EditingState onCommitChanges={this.onCommitChanges} />

            <WeekView startDayHour={9} endDayHour={19} />
            <MonthView startDayHour={9} endDayHour={19} />

            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />

            <CurrentTimeIndicator
              shadePreviousCells={shadePreviousCells}
              shadePreviousAppointments={shadePreviousAppointments}
            />
          </Scheduler>
        </Paper>
      </DashboardArea>
    );
  }
}
