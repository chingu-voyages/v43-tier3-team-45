package com.chingu.ChinguBoard.config;

import com.chingu.ChinguBoard.dto.UserDTO;

public class AuthenticationResponse {

    private String token;

    // should probably change the variable name to user so when this object is
    // serialized to JSON, it has user not userDTO
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
