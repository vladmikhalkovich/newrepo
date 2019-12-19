package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.Category;
import by.mikhalkovich.training_center_v2.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByLecturerId(Long id);

    @Query(value = "select c.* from course c join course_listener cl on c.id = cl.course_id where cl.listener_id = :id", nativeQuery = true)
    List<Course> getListenerCourses(Long id);

    List<Course> findByCategory(Category category);
}
