package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.CourseDto;
import by.mikhalkovich.training_center_v2.model.Listener;
import by.mikhalkovich.training_center_v2.service.CourseService;
import by.mikhalkovich.training_center_v2.service.ListenerService;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ListenerController {

    private final ListenerService listenerService;
    private final UserService userService;
    private final CourseService courseService;

    @Autowired
    public ListenerController(ListenerService listenerService, UserService userService, CourseService courseService) {
        this.listenerService = listenerService;
        this.userService = userService;
        this.courseService = courseService;
    }

    //get current listeners courses
    @GetMapping("/listener/courses")
    public List<CourseDto> getCurrentListenerCourses(Authentication authentication) {
        String username = authentication.getName();
        Listener currentListener = listenerService.findByUserId(userService.findByUsername(username).getId());
        return courseService.getListenerCourses(currentListener.getId());
    }
}
