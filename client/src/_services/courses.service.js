import { SECURE_API } from '../api/config';

const API_URL = 'course';

const getAllCourses = () => SECURE_API.get(`${API_URL}/all`);

const getCourseById = courseId => SECURE_API.get(`${API_URL}/${courseId}`);

const enrollCourse = courseId =>
  SECURE_API.post(`${API_URL}/${courseId}/subscribe`);
const leaveCourse = courseId =>
  SECURE_API.post(`${API_URL}/${courseId}/unsubscribe`);

const createCourse = courseData =>
  SECURE_API.post(`${API_URL}/create`, courseData);
const updateCourse = (courseId, courseData) =>
  SECURE_API.put(`${API_URL}/${courseId}/update`, courseData);

const getLecturerCourses = () => SECURE_API.get(`lecturer/my_courses`);
const getListenerCourses = () => SECURE_API.get(`listener/my_courses`);

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
