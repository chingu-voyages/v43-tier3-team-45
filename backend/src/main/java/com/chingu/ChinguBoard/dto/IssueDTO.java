package com.chingu.ChinguBoard.dto;

import java.time.Instant;
import java.util.List;

public record IssueDTO(
    String id,
    String title,
    String description,
    UserDTO createdBy,
    List<UserDTO> asignees,
    String issueType,
    String priority,
    String status,
    // Data type can change
    Instant createdAt,
    Instant updatedAt,
    Instant dueAt
    // add List<CommentDTO> comments
) {

}
