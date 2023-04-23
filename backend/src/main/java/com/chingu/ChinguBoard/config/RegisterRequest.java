package com.chingu.ChinguBoard.config;

import org.springframework.web.multipart.MultipartFile;

public class RegisterRequest {
    
    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private MultipartFile profileImage;

    public RegisterRequest() {
    }

    public RegisterRequest(String email, String password, String firstName, String lastName, MultipartFile profileImage) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImage = profileImage;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public MultipartFile getProfileImage() {
        return this.profileImage;
    }

    public void setProfileImage(MultipartFile profileImage) {
        this.profileImage = profileImage;
    }
    
}
