package by.mikhalkovich.training_center_v2.controller;

import by.mikhalkovich.training_center_v2.dto.UserProfile;
import by.mikhalkovich.training_center_v2.model.Lecturer;
import by.mikhalkovich.training_center_v2.model.Listener;
import by.mikhalkovich.training_center_v2.model.Role;
import by.mikhalkovich.training_center_v2.model.User;
import by.mikhalkovich.training_center_v2.repository.UserRepository;
import by.mikhalkovich.training_center_v2.service.LecturerService;
import by.mikhalkovich.training_center_v2.service.ListenerService;
import by.mikhalkovich.training_center_v2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController("/admin")
public class AdminController {


    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final LecturerService lecturerService;
    private final ListenerService listenerService;

    @Autowired
    public AdminController(UserService userService,
                           BCryptPasswordEncoder passwordEncoder,
                           LecturerService lecturerService,
                           ListenerService listenerService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.lecturerService = lecturerService;
        this.listenerService = listenerService;
    }
    // add user
    @PostMapping("/admin/add_user")
    public String addUser(@RequestBody User user){
        String password = user.getPassword();
        String encryptPassword = passwordEncoder.encode(password);
        user.setPassword(encryptPassword);
        userService.save(user);
        if(user.getRole() == Role.ROLE_LECTURER){
            Lecturer lecturer = new Lecturer();
            lecturer.setUser(user);
            lecturerService.save(lecturer);
            Listener listener = new Listener();
            listener.setUser(user);
            listenerService.save(listener);
        }
        if(user.getRole() == Role.ROLE_LISTENER){
            Listener listener = new Listener();
            listener.setUser(user);
            listenerService.save(listener);
        }
        return "User added successfully.";
    }

    @PutMapping("/admin/{id}/update_user")
    public void updateUserProfileByAdmin(@PathVariable("id") Long id,
                                         @RequestBody UserProfile userProfile) {
        userService.updateUserProfileByAdmin(id, userProfile);
    }


}
