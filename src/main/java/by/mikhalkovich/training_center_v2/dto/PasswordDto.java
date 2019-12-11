package by.mikhalkovich.training_center_v2.dto;

import lombok.Data;

@Data
public class PasswordDto {

    private String oldPassword;
    private String newPassword;
}
