package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
