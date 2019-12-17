package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByCourseId(Long id);

    @Override
    Optional<Lesson> findById(Long aLong);


}
