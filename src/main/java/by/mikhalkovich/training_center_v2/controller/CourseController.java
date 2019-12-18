package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.CourseDto;
import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.service.CourseService;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/course")
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;

    @Autowired
    public CourseController(CourseService courseService, UserService userService) {
        this.courseService = courseService;
        this.userService = userService;
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
    //subscribe on course
    @PostMapping("/course/{id}/subscribe")
    public String subscribe(Authentication authentication,
                            @PathVariable("id") Long id) {
        String username = authentication.getName();
        courseService.subscribe(username, id);
        return "Listener subscribed successfully.";
    }
    //unsubscribe
    @PostMapping("/course/{id}/unsubscribe")
    public String unsubscribe(Authentication authentication,
                              @PathVariable("id") Long id) {
        String username = authentication.getName();
        courseService.unsubscribe(username, id);
        return "Listener unsubscribed successfully.";
    }
    //get listeners of current course
    @GetMapping("/course/{id}/listeners")
    public List<UserProfile> getListenerOfCurrentCourse(@PathVariable("id") Long id) {
        return userService.findListenersOfCurrentCourse(id);
    }

}
