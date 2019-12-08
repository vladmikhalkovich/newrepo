package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.model.User;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserProfileController {

    private final UserService userService;

    @Autowired
    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    //return current user profile
    @GetMapping("/user_profile")
    public UserProfile getCurrentUserProfile(Authentication authentication){
        String username = authentication.getName();
        User currentUser = userService.findByUsername(username);
        UserProfile currentUserProfile = UserProfile.fromUser(currentUser);
        return currentUserProfile;
    }
    //return user profile
    @GetMapping("/user_profile/{id}")
    public UserProfile getUserProfile(@PathVariable("id") Long id) {
        return userService.findUserProfileById(id);
    }

}
