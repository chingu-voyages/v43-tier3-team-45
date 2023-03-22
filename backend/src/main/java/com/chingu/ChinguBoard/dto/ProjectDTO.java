package com.chingu.ChinguBoard.dto;

import java.util.List;

public record ProjectDTO(
    String id,
    String name,
    String description, // not too sure about this field
    List<IssueListDTO> issues
) {
    
}
