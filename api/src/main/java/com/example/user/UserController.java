package com.example.user;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final Keycloak keycloak;


    public UserController(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    @GetMapping("/{id}")
    public UserRepresentation getUser(@PathVariable("id") String id) {
        return keycloak.realm("SpringReactKeycloak").users().get(id).toRepresentation();
    }

    @GetMapping
    public List<UserRepresentation> getAllUsers() {
        return keycloak.realm("SpringReactKeycloak").users().list();
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
