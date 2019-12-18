import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import { Button, TextField } from '@material-ui/core';
import { formatDateTimeForFields } from '../../_utils/dateHelpers';
import { getLessonsByCourse } from '../../_actions';

const FormLessonCreator = ({
  courseId,
  action,
  minDate,
  getLessonsByCourse,
  isLessonCreated,
}) => {
  const { handleSubmit, register, setValue, getValues, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      lessonDuration: 1,
      startTime: minDate,
    },
  });
  const [selectedDate, setSelectedDate] = useState(minDate);

  const handleDateTimeChange = value => {
    setSelectedDate(value);
    setValue('startTime', formatDateTimeForFields(value));
  };

  useEffect(() => {
    setSelectedDate(minDate);
    register({ name: 'startTime', type: 'text', required: true });

    if (isLessonCreated) {
      getLessonsByCourse(courseId);
      reset();
    }
  }, [courseId, getLessonsByCourse, isLessonCreated, minDate, register, reset]);

  const onSubmit = () => {
    setValue('startTime', formatDateTimeForFields(selectedDate));

    action(courseId, getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="lessonTitle"
        name="lessonTitle"
        label="Lesson Title"
        type="text"
        margin="normal"
        fullWidth
        inputRef={register({
          required: true,
        })}
      />
      <TextField
        id="lessonDuration"
        name="lessonDuration"
        label="Lesson Duration"
        type="number"
        margin="normal"
        fullWidth
        inputRef={register({
          required: true,
        })}
      />
      {selectedDate && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            name="startTime"
            id="startTime"
            variant="inline"
            ampm={false}
            label="Start time"
            value={selectedDate}
            minDate={minDate}
            minutesStep={5}
            onChange={handleDateTimeChange}
            margin="normal"
            fullWidth
            disablePast
            InputLabelProps={{ shrink: true }}
            format="yyyy-MM-dd HH:mm"
            autoOk
          />
        </MuiPickersUtilsProvider>
      )}

      <Button
        type="submit"
        size="large"
        fullWidth
        variant="contained"
        color="primary"
      >
        {'Create'}
      </Button>
    </form>
  );
};

const mapStateToProps = state => ({
  isLessonCreated: state.lessonReducer.isLessonCreated,
});

const mapDispatchToProps = {
  getLessonsByCourse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormLessonCreator);
