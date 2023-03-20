package com.chingu.ChinguBoard.config;

import com.chingu.ChinguBoard.model.User;

public class AuthenticationResponse {
    
    private String token;

    private User user;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String token, User user) {
        this.token = token;
        // would have to blank out the password
        this.user = user;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
