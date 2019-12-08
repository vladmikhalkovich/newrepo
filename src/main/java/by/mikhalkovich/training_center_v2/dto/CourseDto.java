package by.mikhalkovich.training_center_v2.dto;

import by.mikhalkovich.training_center_v2.model.Category;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.model.Lecturer;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CourseDto {

    private Long id;
    private String courseName;
    private String courseDescription;
    private int courseDuration;
    private LocalDate startDate;
    private Category category;
    private Lecturer lecturer;

    public static CourseDto fromCourse(Course course){
        CourseDto courseDto = new CourseDto();
        courseDto.setId(course.getId());
        courseDto.setCourseName(course.getCourseName());
        courseDto.setCourseDescription(course.getCourseDescription());
        courseDto.setCourseDuration(course.getCourseDuration());
        courseDto.setStartDate(course.getStartDate());
        courseDto.setCategory(course.getCategory());
        courseDto.setLecturer(course.getLecturer());
        return courseDto;
    }
}
