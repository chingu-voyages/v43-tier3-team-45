package com.chingu.ChinguBoard.dto;

// used within TeamDTO to contain basic information about a project (ID and project name)
public record ProjectListDTO(
    String id,
    String name
) {
    
}
