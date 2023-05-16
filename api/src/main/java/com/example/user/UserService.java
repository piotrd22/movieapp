package com.example.user;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

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
}
