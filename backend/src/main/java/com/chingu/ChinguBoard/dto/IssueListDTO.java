package com.chingu.ChinguBoard.dto;

/**
 * DTO used as part of the ProjectDTO to only include information required to
 * render the issue cards,
 * which excludes description, comments, and times.
 */
public record IssueListDTO(
        String id,
        String title,
        UserDTO createdBy,
        String issueType,
        String priority,
        String status) {

}
