package com.chingu.ChinguBoard.service;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Comment;
import com.chingu.ChinguBoard.repository.CommentRepository;

@Service
public class CommentService {
    
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment getComment(String id) {
        return commentRepository.findById(id).orElseThrow();
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
