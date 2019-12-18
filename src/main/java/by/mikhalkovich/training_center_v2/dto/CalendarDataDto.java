package by.mikhalkovich.training_center_v2.dto;

import by.mikhalkovich.training_center_v2.model.Course;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CalendarDataDto {

    private Long id;
    private String courseName;
    private LocalDate startDate;
    private List<LessonDto> lessons;

    public static CalendarDataDto createCalendarDataDto(Course course, List<LessonDto> lessons) {
        CalendarDataDto calendarDataDto = new CalendarDataDto();
        calendarDataDto.setId(course.getId());
        calendarDataDto.setCourseName(course.getCourseName());
        calendarDataDto.setLessons(lessons);
        return calendarDataDto;
    }
}
