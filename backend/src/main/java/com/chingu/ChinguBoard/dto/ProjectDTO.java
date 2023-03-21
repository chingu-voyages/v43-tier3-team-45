package com.chingu.ChinguBoard.dto;

import java.util.List;

public record ProjectDTO(
    String id,
    String name,
    String temaId, // not too sure about this field
    List<IssueDTO> issues // could make something like IssueListDTO that only has information likw title, type, priority, assignees
) {
    
}
