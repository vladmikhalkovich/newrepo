package by.mikhalkovich.training_center_v2.service.impl;

import by.mikhalkovich.training_center_v2.dto.CourseDto;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.repository.CourseRepository;
import by.mikhalkovich.training_center_v2.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<CourseDto> findAll() {
        List<Course> courses = courseRepository.findAll();
        List<CourseDto> coursesDto = new ArrayList<>(courses.size());
        for(Course course : courses){
            coursesDto.add(CourseDto.fromCourse(course));
        }
        return coursesDto;
    }

    @Override
    public CourseDto findCourseById(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) { return CourseDto.fromCourse(course.get()); }
        else { throw new IllegalArgumentException("Course not found."); }
    }

    @Override
    public Course save(Course course) {
        return courseRepository.save(course);
    }
}
