package by.mikhalkovich.training_center_v2.dto;

import by.mikhalkovich.training_center_v2.model.Lesson;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LessonDto {

    private Long id;
    private LocalDateTime startTime;
    private int lessonDuration;
    private String lessonTitle;

    public static LessonDto fromLesson(Lesson lesson){
        LessonDto lessonDto = new LessonDto();
        lessonDto.setId(lesson.getId());
        lessonDto.setStartTime(lesson.getStartTime());
        lessonDto.setLessonDuration(lesson.getLessonDuration());
        lessonDto.setLessonTitle(lesson.getLessonTitle());
        return lessonDto;
    }
}
