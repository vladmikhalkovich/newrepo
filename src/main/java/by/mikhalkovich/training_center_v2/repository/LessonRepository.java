package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
