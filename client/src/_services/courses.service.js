import Api from '../api/config';

const API_PREFIX = 'course';

const getAllCourses = () => Api().get(`${API_PREFIX}/all`);

const getCourseById = courseId => Api().get(`${API_PREFIX}/${courseId}`);

const enrollCourse = courseId =>
  Api().post(`${API_PREFIX}/${courseId}/subscribe`);
const leaveCourse = courseId =>
  Api().post(`${API_PREFIX}/${courseId}/unsubscribe`);

const createCourse = courseData =>
  Api().post(`${API_PREFIX}/create`, courseData);
const updateCourse = (courseId, courseData) =>
  Api().put(`${API_PREFIX}/${courseId}/update`, courseData);

const getLecturerCourses = () => Api().get(`lecturer/my_courses`);
const getListenerCourses = () => Api().get(`listener/my_courses`);

export const coursesService = {
  getAllCourses,
  getCourseById,
  enrollCourse,
  leaveCourse,
  createCourse,
  updateCourse,
  getLecturerCourses,
  getListenerCourses,
};
