package by.mikhalkovich.training_center_v2.dto;

import by.mikhalkovich.training_center_v2.model.Role;
import by.mikhalkovich.training_center_v2.model.User;
import lombok.Data;

@Data
public class UserProfile {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String skype;
    private Role role;

    public static UserProfile fromUser(User user){
        UserProfile userProfile = new UserProfile();
        userProfile.setId(user.getId());
        userProfile.setEmail(user.getUsername());
        userProfile.setFirstName(user.getFirstName());
        userProfile.setLastName(user.getLastName());
        userProfile.setSkype(user.getSkype());
        userProfile.setRole(user.getRole());
        return userProfile;
    }
}
