package com.example.user;

import com.example.user.dto.CreateUserRequest;
import com.example.user.dto.UpdateUserRequest;
import com.example.user.dto.UserDto;
import jakarta.validation.Valid;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable("id") String id) {
        UserRepresentation user = userService.getUser(id);
        return modelMapper.map(user, UserDto.class);
    }

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getUsers().stream().map(user -> modelMapper.map(user, UserDto.class)).toList();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public UserDto createUser(@Valid @RequestBody CreateUserRequest createUserRequest) {
        UserRepresentation newUser = new UserRepresentation();
        newUser.setUsername(createUserRequest.getUsername());
        newUser.setEnabled(true);
        newUser.setFirstName(createUserRequest.getFirstName());
        newUser.setLastName(createUserRequest.getLastName());
        newUser.setEmail(createUserRequest.getEmail());

        CredentialRepresentation passwordCredential = new CredentialRepresentation();
        passwordCredential.setType(CredentialRepresentation.PASSWORD);
        passwordCredential.setValue(createUserRequest.getPassword());
        passwordCredential.setTemporary(false);
        newUser.setCredentials(List.of(passwordCredential));

        newUser = userService.saveUser(newUser);
        return modelMapper.map(newUser, UserDto.class);
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable String id, @Valid @RequestBody UpdateUserRequest updateUserRequest) {
        UserRepresentation user = userService.getUser(id);
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(updateUserRequest, user);
        user = userService.updateUser(user, updateUserRequest.getPassword());
        return modelMapper.map(user, UserDto.class);
    }

    @DeleteMapping("/{id}")
    public UserDto deleteUser(@PathVariable String id) {
        UserRepresentation user = userService.getUser(id);
        userService.deleteUser(user);
        return modelMapper.map(user, UserDto.class);
    }


    @GetMapping("/username/{username}")
    public UserDto getUserByUsername(@PathVariable("username") String username) {
        UserRepresentation user = userService.getUserByUsername(username);
        return modelMapper.map(user, UserDto.class);
    }
}
