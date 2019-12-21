const CourseNameProps = {
  id: 'courseName',
  label: 'Course Name',
  name: 'courseName',
  type: 'text',
};

const CourseDescriptionProps = {
  id: 'courseDescription',
  label: 'Course Description',
  name: 'courseDescription',
  rows: 4,
};

const CourseCategoryProps = {
  id: 'category',
  label: 'Category',
  name: 'category',
  helperText: 'Please select course category',
};

const StartDateProps = {
  id: 'startDate',
  label: 'Start Date',
  name: 'startDate',
  format: 'yyyy-MM-dd',
};

export const fields = {
  CourseNameProps,
  CourseDescriptionProps,
  CourseCategoryProps,
  StartDateProps,
};
