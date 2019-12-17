package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.LessonDto;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.model.Lesson;
import by.mikhalkovich.training_center_v2.service.CourseService;
import by.mikhalkovich.training_center_v2.service.LessonService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LessonController {

    private final LessonService lessonService;
    private final CourseService courseService;

    @Autowired
    public LessonController(LessonService lessonService, CourseService courseService) {
        this.lessonService = lessonService;
        this.courseService = courseService;
    }
    //get lessons of current course
    @GetMapping("/course/{id}/lessons")
    public List<LessonDto> getAllLessonsOfCurrentCourse(@PathVariable("id") Long id) {
        return lessonService.findByCourseId(id);
    }
    //get lesson
    @GetMapping("/lesson/{id}")
    public LessonDto getLesson(@PathVariable("id") Long id) {
        return lessonService.findById(id);
    }
    //create lesson
    @PostMapping("/course/{id}/create_lesson")
    public String createLesson(@PathVariable("id") Long id,
                               @RequestBody Lesson newLesson) {
        lessonService.createLesson(id, newLesson);
        return "Lesson added successfully.";
    }
    //update lesson
    @PutMapping("/lesson/{id}/update")
    public String updateLesson(@PathVariable("id") Lesson lessonFromDb,
                               @RequestBody Lesson lesson) {
        if (lessonFromDb.getLessonDuration() != lesson.getLessonDuration()) {
            Course course = lessonFromDb.getCourse();
            course.setCourseDuration(course.getCourseDuration() - lessonFromDb.getLessonDuration() + lesson.getLessonDuration());
            courseService.save(course);
        }
        BeanUtils.copyProperties(lesson, lessonFromDb, "id", "course");
        lessonService.save(lessonFromDb);
        return "Lesson updated successfully.";
    }

    @DeleteMapping("/lesson/{id}/delete")
    public void deleteLesson(@PathVariable("id") Long id){
        lessonService.deleteById(id);
    }
}
