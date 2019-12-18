import React from 'react';

import { Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

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

export const CheckBoxContainer = withStyles(styles, {
  name: 'CheckBoxContainer',
})(
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
