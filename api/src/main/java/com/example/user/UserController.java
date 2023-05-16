package com.example.user;

import com.example.user.dto.UserDto;
import org.keycloak.representations.idm.UserRepresentation;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

//    @PostMapping
//    public Response createUser(@RequestBody UserRepresentation userRepresentation) {
//        Response response = keycloak.realm("myrealm").users().create(userRepresentation);
//        URI location = UriBuilder.fromPath("/users/{id}").build(response.getLocation().getPath().split("/")[1]);
//        return Response.created(location).build();
//    }

//    @PutMapping("/{id}")
//    public void updateUser(@PathVariable("id") String id, @RequestBody UserRepresentation userRepresentation) {
//        keycloak.realm("myrealm").users().get(id).update(userRepresentation);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable("id") String id) {
//        keycloak.realm("myrealm").users().delete(id);
//    }

}
