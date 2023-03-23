package com.chingu.ChinguBoard.dto;

import java.time.Instant;
import java.util.List;

public record IssueDTO(
    String id,
    String title,
    String description,
    UserDTO createdBy,
    List<UserDTO> assignees,
    List<CommentDTO> comments,
    String issueType,
    String priority,
    String status,
    // Data type can change for time fields
    Instant createdAt,
    Instant updatedAt,
    Instant dueAt
) {

}
