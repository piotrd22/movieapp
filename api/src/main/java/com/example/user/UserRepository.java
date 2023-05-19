package com.example.user;

import com.example.user.excpetion.UsernameTakenException;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Repository;

import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;

@Repository
public class UserRepository {

    private static final String realmName = "SpringReactKeycloak";

    private final Keycloak keycloak;

    public UserRepository(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    public UserRepresentation getUser(String id) {
        return keycloak.realm(realmName).users().get(id).toRepresentation();
    }

    public List<UserRepresentation> getUsers() {
        return keycloak.realm(realmName).users().list();
    }

    public List<UserRepresentation> getUserByUsername(String username) {
        return keycloak.realm(realmName).users().searchByUsername(username, true);
    }

    public void deleteUser(String id) {
        keycloak.realm(realmName).users().delete(id);
    }

    public UserRepresentation saveUser(UserRepresentation user) {
        if (user.getId() == null) {

            List<UserRepresentation> users = getUserByUsername(user.getUsername());

            if (users != null && !users.isEmpty()) {
                throw new UsernameTakenException(user.getUsername());
            }

            Response response = keycloak.realm(realmName).users().create(user);
            if (response.getStatus() == 201) {
                String createdUserId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
                UserResource userResource = keycloak.realm(realmName).users().get(createdUserId);
                RoleRepresentation userRealmRole = keycloak.realm(realmName).roles()
                        .get("app_user").toRepresentation();
                userResource.roles().realmLevel()
                        .add(Collections.singletonList(userRealmRole));
                return keycloak.realm(realmName).users().get(createdUserId).toRepresentation();

            } else {
                throw new RuntimeException();
            }

        } else {
            keycloak.realm(realmName).users().get(user.getId()).update(user);
            return keycloak.realm(realmName).users().get(user.getId()).toRepresentation();
        }
    }
}
