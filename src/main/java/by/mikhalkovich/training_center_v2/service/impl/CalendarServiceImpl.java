package by.mikhalkovich.training_center_v2.service.impl;

import by.mikhalkovich.training_center_v2.dto.CalendarDataDto;
import by.mikhalkovich.training_center_v2.dto.LessonDto;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.model.Role;
import by.mikhalkovich.training_center_v2.model.User;
import by.mikhalkovich.training_center_v2.repository.CourseRepository;
import by.mikhalkovich.training_center_v2.service.CalendarService;
import by.mikhalkovich.training_center_v2.service.LessonService;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalendarServiceImpl implements CalendarService {

    private final CourseRepository courseRepository;
    private final UserService userService;
    private final LessonService lessonService;

    @Autowired
    public CalendarServiceImpl(CourseRepository courseRepository, UserService userService, LessonService lessonService) {
        this.courseRepository = courseRepository;
        this.userService = userService;
        this.lessonService = lessonService;
    }

    @Override
    public List<CalendarDataDto> getDataForCalendar(String username, LocalDateTime start, LocalDateTime end) {
        List<CalendarDataDto> calendarDataList = new ArrayList<>();
        User user = userService.findByUsername(username);
        Long listenerId = user.getListener().getId();

        if (user.getRole() == Role.ROLE_LECTURER) {
            Long lecturerId = user.getLecturer().getId();
            List<Course> lecturerCourses = courseRepository.findByLecturerId(lecturerId);

            for (Course course : lecturerCourses) {
                List<LessonDto> lessons = lessonService.getLessonsByIdAndBetweenDates(course.getId(), start, end);
                CalendarDataDto calendarDataDto = CalendarDataDto.createCalendarDataDto(course, lessons);
                calendarDataList.add(calendarDataDto);
        }

            List<Course> listenerCourses = courseRepository.getListenerCourses(listenerId);

            for (Course course : listenerCourses) {
                List<LessonDto> lessons = lessonService.getLessonsByIdAndBetweenDates(course.getId(), start, end);
                CalendarDataDto calendarDataDto = CalendarDataDto.createCalendarDataDto(course, lessons);
                calendarDataList.add(calendarDataDto);
            }
        }

        if (user.getRole() == Role.ROLE_LISTENER) {
            List<Course> listenerCourses = courseRepository.getListenerCourses(listenerId);

            for (Course course : listenerCourses) {
                List<LessonDto> lessons = lessonService.getLessonsByIdAndBetweenDates(course.getId(), start, end);
                CalendarDataDto calendarDataDto = CalendarDataDto.createCalendarDataDto(course, lessons);
                calendarDataList.add(calendarDataDto);
            }
        }
        return calendarDataList;
    }


}
