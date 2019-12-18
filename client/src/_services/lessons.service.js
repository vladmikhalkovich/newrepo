import Api from '../api/config';

const API_PREFIX = 'lesson';

const getLessonsCourse = courseId => Api().get(`course/${courseId}/lessons`);

const getLessonInfo = lessonId => Api().get(`${API_PREFIX}/${lessonId}`);

const createLesson = (courseId, lessonData) =>
  Api().post(`course/${courseId}/create_lesson`, lessonData);

const updateLesson = (lessonId, lessonData) =>
  Api().put(`${API_PREFIX}/${lessonId}/update`, lessonData);

const deleteLesson = lessonId =>
  Api().delete(`${API_PREFIX}/${lessonId}/delete`);

const getUserLessonsByDate = queryString =>
  Api().get(`calendar?${queryString}`);

export const lessonService = {
  getLessonsCourse,
  getLessonInfo,
  createLesson,
  updateLesson,
  deleteLesson,
  getUserLessonsByDate,
};
