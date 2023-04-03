package com.chingu.ChinguBoard.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.config.RegisterRequest;
import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    private final S3Service s3Service;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, S3Service s3Service, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.passwordEncoder = passwordEncoder;
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

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(RegisterRequest request, String id) {
        User user = getUser(id);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        String avatarUrl = s3Service.uploadImage(request.getProfileImage());
        user.setAvatarUrl(avatarUrl);
        return updateUser(user);
    }

}
