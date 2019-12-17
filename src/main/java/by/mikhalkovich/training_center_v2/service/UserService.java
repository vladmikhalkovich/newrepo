package by.mikhalkovich.training_center_v2.service;

import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.model.Role;
import by.mikhalkovich.training_center_v2.model.User;

import java.util.List;

public interface UserService {

    User findByUsername(String username);

    UserProfile findUserProfileById(Long id);

    User save(User user);

    Role findRoleById(Long id);

    List<UserProfile> findListenersOfCurrentCourse(Long id);

    UserProfile updateUserProfile(String username, UserProfile userProfile);

    List<UserProfile> getAllUsers();

    void updateUserProfileByAdmin(Long id, UserProfile userProfile);

}
