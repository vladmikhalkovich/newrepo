package by.mikhalkovich.training_center_v2.service.impl;

import by.mikhalkovich.training_center_v2.model.Lecturer;
import by.mikhalkovich.training_center_v2.repository.LecturerRepository;
import by.mikhalkovich.training_center_v2.service.LecturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LecturerServiceImpl implements LecturerService {

    private final LecturerRepository lecturerRepository;

    @Autowired
    public LecturerServiceImpl(LecturerRepository lecturerRepository) {
        this.lecturerRepository = lecturerRepository;
    }

    @Override
    public Lecturer save(Lecturer lecturer) {
        return lecturerRepository.save(lecturer);
    }

    @Override
    public Lecturer findByUserId(Long id) { return lecturerRepository.findByUserId(id); }
}
