import { format, addHours } from 'date-fns';

export const currentDate = new Date();

export const formatDateForFields = date => format(new Date(date), 'yyyy-MM-dd');

export const formatDateTimeForFields = date =>
  format(new Date(date), 'yyyy-MM-dd HH:mm');

export const formatCourseStart = date => format(new Date(date), 'MMM do, yyyy');

export const formatLessonStart = date =>
  format(new Date(date), 'EEEE, MMMM dd, yyyy');

export const formatLessonTime = (time, duration) => {
  return (
    format(new Date(time), 'p') +
    ' - ' +
    format(addHours(new Date(time), duration), 'p')
  );
};
