package com.example.user.excpetion;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class UserExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {javax.ws.rs.NotFoundException.class})
    protected ResponseEntity<Object> handleNotFoundRequest(RuntimeException exception, WebRequest request) {
        CustomError error = new CustomError(404, HttpStatus.NOT_FOUND, exception.getMessage(), LocalDateTime.now());
        return handleExceptionInternal(exception, error, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(value = {javax.ws.rs.NotAuthorizedException.class})
    protected ResponseEntity<Object> handleUnauthorizedRequest(RuntimeException exception, WebRequest request) {
        CustomError error = new CustomError(401, HttpStatus.UNAUTHORIZED, exception.getMessage(), LocalDateTime.now());
        return handleExceptionInternal(exception, error, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(value = {javax.ws.rs.ForbiddenException.class})
    protected ResponseEntity<Object> handleForbiddenRequest(RuntimeException exception, WebRequest request) {
        CustomError error = new CustomError(403, HttpStatus.FORBIDDEN, exception.getMessage(), LocalDateTime.now());
        return handleExceptionInternal(exception, error, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }

    @ExceptionHandler(value = {javax.ws.rs.InternalServerErrorException.class})
    protected ResponseEntity<Object> handleInternalServerErrorRequest(RuntimeException exception, WebRequest request) {
        CustomError error = new CustomError(500, HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage(), LocalDateTime.now());
        return handleExceptionInternal(exception, error, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
