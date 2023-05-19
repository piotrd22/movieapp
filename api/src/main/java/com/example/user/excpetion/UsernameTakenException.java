package com.example.user.excpetion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameTakenException extends RuntimeException {
    public UsernameTakenException(String username) {
        super("User with username '%s' is already taken".formatted(username));
    }
}
