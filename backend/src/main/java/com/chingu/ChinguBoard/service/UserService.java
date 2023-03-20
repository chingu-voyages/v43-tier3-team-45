package com.chingu.ChinguBoard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(String id) {
        // can add custom exception instead
        return userRepository.findById(id).orElseThrow();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserWithEmail(String email) {
        // can add custom exception instead
        return userRepository.findByEmail(email).orElseThrow();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

}
