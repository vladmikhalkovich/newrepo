package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByCourseId(Long id);

    @Override
    Optional<Lesson> findById(Long aLong);

    @Query(value = "select l.* from Lesson l where l.course_id = :id and start_time between :start and :end", nativeQuery = true)
    List<Lesson> getLessonsByIdAndBetweenDates(Long id, LocalDateTime start, LocalDateTime end);
}
