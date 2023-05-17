package com.example.user;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Repository;

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
}
