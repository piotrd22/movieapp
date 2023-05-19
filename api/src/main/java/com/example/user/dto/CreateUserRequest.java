package com.example.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserRequest {
    @NotNull(message = "Username cannot be null")
    @Size(min = 1, message = "Username must be higher than 0 characters")
    private String username;

    @NotNull(message = "First name cannot be null")
    @Size(min = 1, message = "First name must be higher than 0 characters")
    private String firstName;

    @NotNull(message = "Last name cannot be null")
    @Size(min = 1, message = "Last name must be higher than 0 characters")
    private String lastName;

    @NotNull(message = "Password name cannot be null")
    @Size(min = 8, message = "Password must be higher than 7 characters")
    private String password;

    @NotNull(message = "Password name cannot be null")
    @Email(message = "Wrong email")
    private String email;
}
