package com.chingu.ChinguBoard.service;

import java.time.Instant;
import java.util.List;

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

    public List<Comment> getComments(List<String> ids) {
        List<Comment> comments = commentRepository.findAllById(ids);
        comments.stream().forEach(comment -> {
            comment.setCreatedBy(userService.getUser(comment.getCreatedById()));
        });
        return comments;
    }

    public Comment createComment(Comment comment, String issueId) {
        comment.setCreatedAt(Instant.now());
        Comment savedComment = commentRepository.save(comment);
        issueService.addComment(savedComment, issueId);
        return savedComment;
    }

    public Comment editComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteComments(List<String> ids) {
        commentRepository.deleteAllById(ids);
    }

    public void deleteComment(String id, String issueId) {
        // delete the comment from DB
        commentRepository.deleteById(issueId);

        // delete comment reference from the issue it was from
        issueService.removeComment(issueId, id);
    }
}
