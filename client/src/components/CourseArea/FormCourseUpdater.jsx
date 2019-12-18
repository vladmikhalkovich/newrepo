import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import { addDays, addYears } from 'date-fns';
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

import { formatDateForFields } from '../../_utils/dateHelpers';
import { fields } from '../../constants/courseCreatorFields';
import { categories } from '../../constants/categories';
import { useStyles } from './styles';

const FormCourseUpdater = ({
  courseId,
  courseData,
  updateCourse,
  isCourseUpdatingProgress,
  isCourseCreated,
}) => {
  const { courseName, courseDescription, startDate, category } = courseData;
  const { handleSubmit, register, getValues, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      courseName: courseName,
      courseDescription: courseDescription,
      category: category,
      startDate: startDate,
    },
  });
  const [courseCategory, setCourseCategory] = useState(category);
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setLoading(isCourseUpdatingProgress);
    setSuccess(isCourseCreated);

    register({ name: 'category', type: 'text', required: true });
    register({ name: 'startDate', type: 'text', required: true });
  }, [
    isCourseUpdatingProgress,
    isCourseCreated,
    register,
    courseId,
    courseData,
    setValue,
  ]);

  const handleSelectChange = e => {
    setCourseCategory(e.target.value);
    setValue('category', e.target.value);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setValue('startDate', formatDateForFields(date));
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const onSubmit = () => {
    setLoading(true);
    updateCourse(courseId, getValues());
  };

  return (
    courseData && (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.courseCreatorForm}
      >
        <Typography variant="h5" component="h2">
          {'Update course'}
        </Typography>
        <TextField
          {...fields.CourseNameProps}
          inputRef={register({
            required: 'Required',
          })}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          {...fields.CourseDescriptionProps}
          inputRef={register({
            required: 'Required',
          })}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          multiline
        />
        <TextField
          {...fields.CourseCategoryProps}
          InputLabelProps={{ shrink: true }}
          defaultValue={courseCategory}
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
            minDate={addDays(new Date(), 7)}
            maxDate={addYears(new Date(), 2)}
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
            {'Update & Publish'}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
    )
  );
};

FormCourseUpdater.propTypes = {
  courseId: PropTypes.string.isRequired,
  courseData: PropTypes.object.isRequired,
  isCourseUpdatingProgress: PropTypes.bool.isRequired,
  isCourseUpdated: PropTypes.bool.isRequired,
  updateCourse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCourseUpdatingProgress: state.coursesReducer.isCourseUpdatingProgress,
  isCourseUpdated: state.coursesReducer.isCourseUpdated,
});

export default connect(
  mapStateToProps,
  {}
)(FormCourseUpdater);
