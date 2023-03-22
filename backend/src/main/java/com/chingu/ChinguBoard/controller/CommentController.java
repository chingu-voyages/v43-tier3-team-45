package com.chingu.ChinguBoard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chingu.ChinguBoard.dto.CommentDTO;
import com.chingu.ChinguBoard.mapper.CommentDTOMapper;
import com.chingu.ChinguBoard.model.Comment;
import com.chingu.ChinguBoard.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    
    private final CommentService commentService;

    private final CommentDTOMapper commentDTOMapper;

    public CommentController(CommentService commentService, CommentDTOMapper commentDTOMapper) {
        this.commentService = commentService;
        this.commentDTOMapper = commentDTOMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> getComment(@PathVariable String id) {
        Comment comment = commentService.getComment(id);
        return ResponseEntity.ok(commentDTOMapper.toDTO(comment));
    }

    // TODO: change to DTO
    @PostMapping()
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment savedComment = commentService.createComment(comment);
        return ResponseEntity.ok(savedComment);
    }
}
