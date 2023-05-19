package com.example.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {
    @Size(min = 1, message = "First name must be higher than 0 characters")
    private String firstName;

    @Size(min = 1, message = "Last name must be higher than 0 characters")
    private String lastName;

    @Size(min = 8, message = "Password must be higher than 7 characters")
    private String password;

    @Email(message = "Wrong email")
    private String email;
}
