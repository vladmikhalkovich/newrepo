package by.mikhalkovich.training_center_v2.repository;

import by.mikhalkovich.training_center_v2.model.Listener;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListenerRepository extends JpaRepository<Listener, Long> {

    Listener findByUserId(Long id);
}
