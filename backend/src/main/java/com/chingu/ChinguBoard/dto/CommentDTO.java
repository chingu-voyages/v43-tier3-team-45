package com.chingu.ChinguBoard.dto;

import java.time.Instant;

public record CommentDTO(
    String id,
    String text,
    Instant createdAt,
    UserDTO createdBy
) {
    
}
