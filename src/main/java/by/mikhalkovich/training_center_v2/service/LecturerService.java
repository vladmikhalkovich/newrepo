package by.mikhalkovich.training_center_v2.service;

import by.mikhalkovich.training_center_v2.model.Lecturer;

public interface LecturerService {

    Lecturer save(Lecturer lecturer);
    Lecturer findByUserId(Long id);
}
