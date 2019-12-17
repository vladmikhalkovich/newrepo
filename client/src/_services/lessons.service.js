import { SECURE_API } from '../api/config';

const getLessonsCourse = courseId =>
  SECURE_API.get(`course/${courseId}/lessons`);

const getLessonInfo = lessonId => SECURE_API.get(`lesson/${lessonId}`);

const createLesson = (courseId, lessonData) =>
  SECURE_API.post(`course/${courseId}/create_lesson`, lessonData);
const updateLesson = (lessonId, lessonData) =>
  SECURE_API.put(`lesson/${lessonId}/update`, lessonData);

export const lessonService = {
  getLessonsCourse,
  getLessonInfo,
  createLesson,
  updateLesson,
};
