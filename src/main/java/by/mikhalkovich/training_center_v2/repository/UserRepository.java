package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    Optional<User> findById(Long id);
}
