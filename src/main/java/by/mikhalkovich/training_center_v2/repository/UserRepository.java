package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.Role;
import by.mikhalkovich.training_center_v2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    Optional<User> findById(Long id);

    @Query(value = "select u.role from User u where u.id = :id")
    Role findRoleById(Long id);

    @Query(nativeQuery = true, value = "select u.* from user u join listener l on u.id = l.user_id join course_listener cl on l.id = cl.listener_id where course_id = :id")
    List<User> findListenersOfCurrentCourse(Long id);
}
