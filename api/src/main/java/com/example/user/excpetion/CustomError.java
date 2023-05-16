package com.example.user.excpetion;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public record CustomError(
        int statusCode, HttpStatus status, String message, LocalDateTime timestamp) {
}
