import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import { addDays, format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import clsx from 'clsx';

import {
  Button,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { createCourse } from '../../_actions';
import { fields } from '../../constants/courseCreatorFields';
import { categories } from '../../constants/categories';
import { useStyles } from './styles';

const FormCourseCreator = ({
  isCourseCreationProgress,
  isCourseCreated,
  createCourse,
}) => {
  const { handleSubmit, register, getValues, setValue } = useForm({
    mode: 'onBlur',
  });
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 7));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(isCourseCreationProgress);
    setSuccess(isCourseCreated);

    register({ name: 'category', type: 'text', required: true });
    register({ name: 'startDate', type: 'text', required: true });
  }, [isCourseCreationProgress, isCourseCreated, register]);

  const handleSelectChange = category => {
    setValue('category', category.target.value);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setValue('startDate', format(new Date(date), 'yyyy-MM-dd'));
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const values = getValues();

  const onSubmit = () => {
    setLoading(true);
    createCourse(values);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.courseCreatorForm}
    >
      <Typography variant="h5" component="h2">
        Create new course
      </Typography>
      <TextField
        {...fields.CourseNameProps}
        inputRef={register({
          required: 'Required',
        })}
        margin="normal"
      />
      <TextField
        {...fields.CourseDescriptionProps}
        inputRef={register({
          required: 'Required',
        })}
        margin="normal"
        multiline
      />
      <TextField
        {...fields.CourseCategoryProps}
        defaultValue={categories[0].key}
        onChange={handleSelectChange}
        margin="normal"
        select
        helperText="Please select course category"
      >
        {categories.map(item => (
          <MenuItem key={item.key + item.name} value={item.key}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          {...fields.StartDateProps}
          value={selectedDate}
          onChange={handleDateChange}
          disablePast
          disableToolbar
          variant="inline"
          margin="normal"
          KeyboardButtonProps={{
            'aria-label': 'Select course start date',
          }}
        />
      </MuiPickersUtilsProvider>
      <div className={classes.btnWrapper}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          className={buttonClassname}
        >
          {'Create & Publish'}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </form>
  );
};

FormCourseCreator.propTypes = {
  isCourseCreationProgress: PropTypes.bool.isRequired,
  isCourseCreated: PropTypes.bool.isRequired,
  createCourse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCourseCreationProgress: state.coursesReducer.isCourseCreationProgress,
  isCourseCreated: state.coursesReducer.isCourseCreated,
});

const mapDispatchToProps = {
  createCourse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCourseCreator);
