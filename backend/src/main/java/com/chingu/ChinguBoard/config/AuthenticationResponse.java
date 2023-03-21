package com.chingu.ChinguBoard.config;

import com.chingu.ChinguBoard.dto.UserDTO;

public class AuthenticationResponse {
    
    private String token;

    private UserDTO userDTO;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String token, UserDTO userDTO) {
        this.token = token;
        this.userDTO = userDTO;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUserDTO() {
        return this.userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

}
