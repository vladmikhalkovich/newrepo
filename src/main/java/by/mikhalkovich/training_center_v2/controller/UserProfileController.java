package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.PasswordDto;
import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.model.Role;
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

    //return role by user id
    @GetMapping("/user_profile/{id}/role")
    public Role getRoleById(@PathVariable("id") Long id) {
        return userService.findRoleById(id);
    }

//    @PutMapping("/user_profile/change_password")
//    public String changePassword(Authentication authentication,
//                                 @RequestBody PasswordDto passwordDto) {
//        String username = authentication.getName();
//    }

    @PutMapping("/user_profile/update")
    public String updateUserProfile(Authentication authentication,
                                    @RequestBody UserProfile userProfile) {
        String username = authentication.getName();
        userService.updateUserProfile(username, userProfile);
        return "User updated successfully.";
    }


}
