import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import useForm from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { addDays } from 'date-fns';

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
import { formatDateForFields } from '../../_utils/dateHelpers';
import { fields } from '../../constants/courseFields';
import { categories } from '../../constants/categories';
import { useStyles } from './styles';
import { history } from '../../_utils/history';

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

  const {
    courseCreatorForm,
    btnWrapper,
    buttonSuccess,
    buttonProgress
  } = useStyles();


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
    setValue('startDate', formatDateForFields(date));
  };

  const buttonClassname = clsx({
    [buttonSuccess]: success,
  });

  const values = getValues();

  const onSubmit = () => {
    setLoading(true);
    createCourse(values);
    if (isCourseCreated) {
      history.push('/courses')
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={courseCreatorForm}
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
      <div className={btnWrapper}>
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
          <CircularProgress size={24} className={buttonProgress} />
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
