package com.chingu.ChinguBoard.config;

import com.chingu.ChinguBoard.dto.UserDTO;

public class AuthenticationResponse {

    private String token;

    private UserDTO user;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String token, UserDTO userDTO) {
        this.token = token;
        this.user = userDTO;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUser() {
        return this.user;
    }

    public void setUser(UserDTO userDTO) {
        this.user = userDTO;
    }

}
