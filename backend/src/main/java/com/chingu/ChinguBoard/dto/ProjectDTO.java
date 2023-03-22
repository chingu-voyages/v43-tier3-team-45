package com.chingu.ChinguBoard.dto;

import java.util.List;

public record ProjectDTO(
    String id,
    String name,
    String description, 
    List<IssueListDTO> issues
) {
    
}
