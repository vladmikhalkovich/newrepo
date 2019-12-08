package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.CourseDto;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/course")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }
    //get all courses
    @GetMapping("/course/all")
    public List<CourseDto> getAllCourses(){
        return courseService.findAll();
    }
    //get course by id
    @GetMapping("/course/{id}")
    public CourseDto getCourse(@PathVariable("id") Long id) {
        return courseService.findCourseById(id);
    }

}
