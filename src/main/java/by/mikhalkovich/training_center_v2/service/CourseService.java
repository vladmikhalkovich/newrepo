package by.mikhalkovich.training_center_v2.service;

import by.mikhalkovich.training_center_v2.dto.CourseDto;
import by.mikhalkovich.training_center_v2.model.Course;

import java.util.List;

public interface CourseService {

    List<CourseDto> findAll();

    CourseDto findCourseById(Long id);

    Course save(Course course);
}
