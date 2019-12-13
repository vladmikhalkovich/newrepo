package by.mikhalkovich.training_center_v2.dto;

import by.mikhalkovich.training_center_v2.model.Category;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.model.Lecturer;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class CourseDto {

    private Long id, lecturerId;
    private String courseName;
    private String courseDescription;
    private int courseDuration;
    private LocalDate startDate;
    private Category category;
    private List<UserProfile> listeners = new ArrayList<>();

    public static CourseDto fromCourse(Course course){
        CourseDto courseDto = new CourseDto();
        courseDto.setId(course.getId());
        courseDto.setCourseName(course.getCourseName());
        courseDto.setCourseDescription(course.getCourseDescription());
        courseDto.setCourseDuration(course.getCourseDuration());
        courseDto.setStartDate(course.getStartDate());
        courseDto.setCategory(course.getCategory());
        courseDto.setLecturerId(course.getLecturer().getUser().getId());
        return courseDto;
    }
}
