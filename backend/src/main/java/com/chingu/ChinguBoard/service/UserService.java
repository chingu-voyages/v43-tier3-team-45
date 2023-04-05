package com.chingu.ChinguBoard.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.chingu.ChinguBoard.config.RegisterRequest;
import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final S3Service s3Service;

    public UserService(UserRepository userRepository, S3Service s3Service) {
        this.userRepository = userRepository;
        this.s3Service = s3Service;
    }

    public User getUser(String id) {
        // can add custom exception instead
        return userRepository.findById(id).orElseThrow();
    }

    public List<User> getUsers(List<String> ids) {
        return userRepository.findAllById(ids);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserWithEmail(String email) {
        // can add custom exception instead
        return userRepository.findByEmail(email).orElseThrow();
    }

    public boolean checkUniqueEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    /**
     * used for updating user information except for user's profile image. Use
     * updateUserProfileImage for that instead
     * currently email is used as unique identifier for user so not sure about being
     * able to change this
     * looking at better way to reset password than chaning it in a profile page
     */
    public User updateUser(RegisterRequest request, String id) {
        User user = getUser(id);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        return userRepository.save(user);
    }

    public String updateUserProfileImage(MultipartFile image, String id) {
        User user = getUser(id);
        // delete original image first
        s3Service.deleteImage(user.getAvatarUrl());
        String avatarUrl = s3Service.uploadImage(image);
        user.setAvatarUrl(avatarUrl);
        // save change to image url to db
        userRepository.save(user);
        return avatarUrl;
    }

}
