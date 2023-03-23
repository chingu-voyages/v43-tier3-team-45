package com.chingu.ChinguBoard.service;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Comment;
import com.chingu.ChinguBoard.repository.CommentRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final UserService userService;

    private final IssueService issueService;

    public CommentService(CommentRepository commentRepository, UserService userService,
            @Lazy IssueService issueService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.issueService = issueService;
    }

    public Comment getComment(String id) {
        Comment comment = commentRepository.findById(id).orElseThrow();
        comment.setCreatedBy(userService.getUser(comment.getCreatedById()));
        return comment;
    }

    public Comment createComment(Comment comment, String issueId) {
        Comment savedComment = commentRepository.save(comment);
        issueService.addComment(savedComment, issueId);
        return savedComment;
    }
}
