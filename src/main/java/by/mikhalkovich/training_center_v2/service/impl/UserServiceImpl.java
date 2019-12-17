package by.mikhalkovich.training_center_v2.service.impl;

import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.model.Role;
import by.mikhalkovich.training_center_v2.model.User;
import by.mikhalkovich.training_center_v2.repository.UserRepository;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

    @Override
    public Role findRoleById(Long id) {
        return userRepository.findRoleById(id);
    }

    @Override
    public List<UserProfile> findListenersOfCurrentCourse(Long id) {
        List<User> users = userRepository.findListenersOfCurrentCourse(id);
        List<UserProfile> userProfiles = new ArrayList<>(users.size());
        for(User user : users){
            userProfiles.add(UserProfile.fromUser(user));
        }
        return userProfiles;
    }

    @Override
    public UserProfile updateUserProfile(String username, UserProfile userProfile) {
        User user = userRepository.findByUsername(username);
        user.setUsername(userProfile.getEmail());
        user.setFirstName(userProfile.getFirstName());
        user.setLastName(userProfile.getLastName());
        user.setSkype(userProfile.getSkype());
        userRepository.save(user);
        return userProfile;
    }

    @Override
    public List<UserProfile> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserProfile> userProfiles = new ArrayList<>(users.size());
        for (User user : users) {
            userProfiles.add(UserProfile.fromUser(user));
        }
        return userProfiles;
    }

    @Override
    public void updateUserProfileByAdmin(Long id, UserProfile userProfile) {
        Optional<User> optionalUser = userRepository.findById(id);
        User user = optionalUser.get();
        user.setSkype(userProfile.getSkype());
        user.setLastName(userProfile.getLastName());
        user.setFirstName(userProfile.getFirstName());
        user.setUsername(userProfile.getEmail());
        user.setRole(userProfile.getRole());
        userRepository.save(user);
    }


}
