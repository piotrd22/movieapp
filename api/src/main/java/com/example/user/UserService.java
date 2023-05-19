package com.example.user;

import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.NotFoundException;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserRepresentation getUser(String id) {
        return userRepository.getUser(id);
    }

    public List<UserRepresentation> getUsers() {
        return userRepository.getUsers();
    }

    public UserRepresentation getUserByUsername(String username) {
        List<UserRepresentation> users = userRepository.getUserByUsername(username);

        if (users != null && !users.isEmpty()) {
            return users.get(0);
        }

        throw new NotFoundException("User with username '%s' not found".formatted(username));
    }

    public UserRepresentation saveUser(UserRepresentation user) {
        return userRepository.saveUser(user);
    }

    public UserRepresentation updateUser(UserRepresentation user, String password) {
        String username = getUserNameFromContext();

        if (!username.equals(user.getUsername())) {
            throw new NotAuthorizedException("You can update only your account");
        }

        if (password != null) {
            CredentialRepresentation passwordCredential = new CredentialRepresentation();
            passwordCredential.setType(CredentialRepresentation.PASSWORD);
            passwordCredential.setValue(password);
            passwordCredential.setTemporary(false);
            user.setCredentials(List.of(passwordCredential));
        }

        return saveUser(user);
    }

    public void deleteUser(UserRepresentation user) {
        String username = getUserNameFromContext();
        boolean isAdmin = getIsAdminFromContext();

        if (username.equals(user.getUsername()) || isAdmin) {
            userRepository.deleteUser(user.getId());
            return;
        }

        throw new NotAuthorizedException("You can delete only your account");
    }

    private String getUserNameFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    private boolean getIsAdminFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_admin"));
    }
}
