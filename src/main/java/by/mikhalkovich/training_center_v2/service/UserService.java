package by.mikhalkovich.training_center_v2.service;

import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.model.User;

public interface UserService {

    User findByUsername(String username);

    UserProfile findUserProfileById(Long id);

    User save(User user);

}
