package by.mikhalkovich.training_center_v2.service.impl;

import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.model.User;
import by.mikhalkovich.training_center_v2.repository.UserRepository;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserProfile findUserProfileById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) { return UserProfile.fromUser(user.get()); }
        else { throw new IllegalArgumentException("User not found"); }
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }


}
