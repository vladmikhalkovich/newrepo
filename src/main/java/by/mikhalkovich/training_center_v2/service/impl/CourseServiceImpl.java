package by.mikhalkovich.training_center_v2.service.impl;

import by.mikhalkovich.training_center_v2.dto.CourseDto;
import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.model.Listener;
import by.mikhalkovich.training_center_v2.model.User;
import by.mikhalkovich.training_center_v2.repository.CourseRepository;
import by.mikhalkovich.training_center_v2.repository.ListenerRepository;
import by.mikhalkovich.training_center_v2.service.CourseService;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final ListenerRepository listenerRepository;
    private final UserService userService;

    @Autowired
    public CourseServiceImpl(CourseRepository courseRepository, ListenerRepository listenerRepository,
                             UserService userService) {
        this.courseRepository = courseRepository;
        this.listenerRepository = listenerRepository;
        this.userService = userService;
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
        Optional<Course> optionalCourse = courseRepository.findById(id);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            List<UserProfile> listeners = userService.findListenersOfCurrentCourse(course.getId());
            CourseDto courseDto = CourseDto.fromCourse(course);
            courseDto.setListeners(listeners);
            return courseDto;
        }
        else { throw new IllegalArgumentException("Course not found."); }
    }

    @Override
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course subscribe(String username, Long courseId) {
        User currentUser = userService.findByUsername(username);
        Course course = courseRepository.findById(courseId).get();
        Listener listener = listenerRepository.findByUserId(currentUser.getId());
        course.getListener().add(listener);
        courseRepository.save(course);
        return course;
    }

    @Override
    public Course unsubscribe(String username, Long courseId) {
        User currentUser = userService.findByUsername(username);
        Course course = courseRepository.findById(courseId).get();
        Listener listener = listenerRepository.findByUserId(currentUser.getId());
        course.getListener().remove(listener);
        courseRepository.save(course);
        return course;
    }

    @Override
    public List<CourseDto> findCoursesByLecturerId(Long id) {
        List<Course> courses = courseRepository.findByLecturerId(id);
        List<CourseDto> coursesDto = new ArrayList<>(courses.size());
        for (Course course : courses){
            coursesDto.add(CourseDto.fromCourse(course));
        }
        return coursesDto;
    }

    @Override
    public List<CourseDto> getListenerCourses(Long id) {
        List<Course> courses = courseRepository.getListenerCourses(id);
        List<CourseDto> coursesDto = new ArrayList<>(courses.size());
        for (Course course : courses) {
            coursesDto.add(CourseDto.fromCourse(course));
        }
        return coursesDto;
    }

    public Course findById(Long id){
        Optional<Course> course = courseRepository.findById(id);
        if(course.isPresent()) { return course.get(); }
        else { throw new IllegalArgumentException("Course not found"); }
    }


}
