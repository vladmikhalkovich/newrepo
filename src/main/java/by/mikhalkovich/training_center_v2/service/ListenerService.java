package by.mikhalkovich.training_center_v2.service;

import by.mikhalkovich.training_center_v2.model.Listener;

public interface ListenerService {

    Listener save(Listener listener);

    Listener findByUserId(Long id);
}
