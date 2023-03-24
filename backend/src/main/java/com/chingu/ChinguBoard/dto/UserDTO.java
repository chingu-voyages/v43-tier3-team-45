package com.chingu.ChinguBoard.dto;

public record UserDTO(
    String id,
    String email,
    String firstName,
    String lastName,
    String role
) {
    
}
