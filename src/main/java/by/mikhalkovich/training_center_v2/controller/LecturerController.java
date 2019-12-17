package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.CourseDto;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.model.Lecturer;
import by.mikhalkovich.training_center_v2.service.CourseService;
import by.mikhalkovich.training_center_v2.service.LecturerService;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LecturerController {

    private final UserService userService;
    private final LecturerService lecturerService;
    private final CourseService courseService;

    @Autowired
    public LecturerController(UserService userService, LecturerService lecturerService, CourseService courseService) {
        this.userService = userService;
        this.lecturerService = lecturerService;
        this.courseService = courseService;
    }
    //creating new course by current lecturer
    @PostMapping("/course/create")
    public String createCourse(Authentication authentication,
                               @RequestBody Course newCourse) {
        String username = authentication.getName();
        Lecturer currentLecturer = lecturerService.findByUserId(userService.findByUsername(username).getId());
        newCourse.setLecturer(currentLecturer);
        courseService.save(newCourse);
        return "Course added successfully.";
    }
    //get current lecturer courses
    @GetMapping("/lecturer/my_courses")
    public List<CourseDto> getCurrentLecturerCourses(Authentication authentication) {
        String username = authentication.getName();
        Lecturer currentLecturer = lecturerService.findByUserId(userService.findByUsername(username).getId());
        return courseService.findCoursesByLecturerId(currentLecturer.getId());
    }
    //update course
    @PutMapping("/course/{id}/update")
    public String updateCourse(@PathVariable("id") Course courseFromDb,
                               @RequestBody Course course) {
        BeanUtils.copyProperties(course, courseFromDb, "id", "courseDuration",
                "lecturer", "listener", "lesson");
        courseService.save(courseFromDb);
        return "Course updated successfully.";
    }
}
