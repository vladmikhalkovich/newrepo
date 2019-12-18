package by.mikhalkovich.training_center_v2.service;

import by.mikhalkovich.training_center_v2.dto.LessonDto;
import by.mikhalkovich.training_center_v2.model.Lesson;

import java.time.LocalDateTime;
import java.util.List;

public interface LessonService {

    List<LessonDto> findByCourseId(Long id);

    LessonDto findById(Long id);

    Lesson save(Lesson lesson);

    Lesson createLesson(Long id, Lesson newLesson);

    void deleteById(Long id);

    List<LessonDto> getLessonsByIdAndBetweenDates(Long id, LocalDateTime start, LocalDateTime end);

}
