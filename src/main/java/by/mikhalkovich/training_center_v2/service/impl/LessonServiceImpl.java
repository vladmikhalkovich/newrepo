package by.mikhalkovich.training_center_v2.service.impl;

import by.mikhalkovich.training_center_v2.dto.LessonDto;
import by.mikhalkovich.training_center_v2.model.Course;
import by.mikhalkovich.training_center_v2.model.Lesson;
import by.mikhalkovich.training_center_v2.repository.LessonRepository;
import by.mikhalkovich.training_center_v2.service.CourseService;
import by.mikhalkovich.training_center_v2.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final CourseService courseService;

    @Autowired
    public LessonServiceImpl(LessonRepository lessonRepository, CourseService courseService) {
        this.lessonRepository = lessonRepository;
        this.courseService = courseService;
    }

    @Override
    public List<LessonDto> findByCourseId(Long id) {
        List<Lesson> lessons = lessonRepository.findByCourseId(id);
        List<LessonDto> lessonsDto = new ArrayList<>(lessons.size());
        for (Lesson lesson : lessons) {
            lessonsDto.add(LessonDto.fromLesson(lesson));
        }
        lessonsDto.sort(Comparator.comparing(LessonDto::getStartTime));
        return lessonsDto;
    }

    @Override
    public LessonDto findById(Long id) {
        Optional<Lesson> lesson = lessonRepository.findById(id);
        if(lesson.isPresent()) { return LessonDto.fromLesson(lesson.get()); }
        else { throw new IllegalArgumentException("Lesson not found"); }
    }

    @Override
    public Lesson save(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    @Override
    public Lesson createLesson(Long id, Lesson newLesson) {
        Course course = courseService.findById(id);
        newLesson.setCourse(course);
        lessonRepository.save(newLesson);
        int duration = course.getCourseDuration() + newLesson.getLessonDuration();
        course.setCourseDuration(duration);
        courseService.save(course);
        return newLesson;
    }

    @Override
    public void deleteById(Long id) {
        Optional<Lesson> optionalLesson = lessonRepository.findById(id);
        Lesson lesson = optionalLesson.get();
        Course course = lesson.getCourse();
        course.setCourseDuration(course.getCourseDuration() - lesson.getLessonDuration());
        courseService.save(course);
        lessonRepository.deleteById(id);
    }
}
