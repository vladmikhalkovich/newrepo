package by.mikhalkovich.training_center_v2.service;

import by.mikhalkovich.training_center_v2.dto.CourseDto;
import by.mikhalkovich.training_center_v2.model.Course;

import java.util.List;

public interface CourseService {

    List<CourseDto> findAll();

    CourseDto findCourseById(Long id);

    Course save(Course course);

    Course subscribe(String username, Long courseId);

    List<CourseDto> findCoursesByLecturerId(Long id);

    List<CourseDto> getListenerCourses(Long id);

    Course findById(Long id);

    Course unsubscribe(String username, Long courseId);
}
