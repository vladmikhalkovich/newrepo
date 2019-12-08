package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LecturerRepository extends JpaRepository<Lecturer, Long> {

    Lecturer findByUserId(Long id);
}
