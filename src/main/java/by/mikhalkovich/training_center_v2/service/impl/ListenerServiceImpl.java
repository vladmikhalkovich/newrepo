package by.mikhalkovich.training_center_v2.service.impl;

import by.mikhalkovich.training_center_v2.model.Listener;
import by.mikhalkovich.training_center_v2.repository.ListenerRepository;
import by.mikhalkovich.training_center_v2.service.ListenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListenerServiceImpl implements ListenerService {

    private final ListenerRepository listenerRepository;

    @Autowired
    public ListenerServiceImpl(ListenerRepository listenerRepository) {
        this.listenerRepository = listenerRepository;
    }

    @Override
    public Listener save(Listener listener) {
        return listenerRepository.save(listener);
    }

    @Override
    public Listener findByUserId(Long id) {
        return listenerRepository.findByUserId(id);
    }
}
