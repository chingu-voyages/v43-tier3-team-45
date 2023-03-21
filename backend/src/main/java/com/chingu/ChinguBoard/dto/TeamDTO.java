package com.chingu.ChinguBoard.dto;

import java.util.List;

public record TeamDTO(
    String id,
    String name,
    List<UserDTO> members,
    List<ProjectListDTO> projects
) {
    
}
