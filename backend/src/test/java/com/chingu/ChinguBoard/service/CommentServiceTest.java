package com.chingu.ChinguBoard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.chingu.ChinguBoard.model.Comment;
import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.CommentRepository;

@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private UserService userService;

    @Mock
    private IssueService issueService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetComment() {
        // given
        User mockUser = mock(User.class);
        Comment testComment = new Comment();
        testComment.setId("id");
        testComment.setText("text");
        testComment.setCreatedAt(Instant.now());
        testComment.setCreatedById("userId");
        when(commentRepository.findById("id")).thenReturn(Optional.of(testComment));
        when(userService.getUser("userId")).thenReturn(mockUser);

        CommentService commentService = new CommentService(commentRepository, userService, issueService);

        // when
        Comment actualComment = commentService.getComment("id");

        // then
        assertEquals(testComment, actualComment);
        assertEquals(mockUser, testComment.getCreatedBy());
    }

    @Test
    public void testGetComments() {
        List<String> ids = new ArrayList<>();
        ids.add("id1");
        ids.add("id2");

        // given
        Comment testComment1 = new Comment();
        testComment1.setId("id1");
        testComment1.setText("text1");
        testComment1.setCreatedAt(Instant.now());
        testComment1.setCreatedById("userId1");
        Comment testComment2 = new Comment();
        testComment2.setId("id2");
        testComment2.setText("text2");
        testComment2.setCreatedAt(Instant.now());
        testComment2.setCreatedById("userId2");
        List<Comment> testComments = new ArrayList<>();
        testComments.add(testComment1);
        testComments.add(testComment2);

        when(commentRepository.findAllById(ids)).thenReturn(testComments);

        CommentService commentService = new CommentService(commentRepository, userService, issueService);

        // when
        List<Comment> actualComments = commentService.getComments(ids);

        assertEquals(testComments, actualComments);
    }

    @Test
    public void testCreateComment() {
        Comment testComment = new Comment();
        testComment.setId("id");
        testComment.setText("text");
        testComment.setCreatedAt(Instant.now());
        testComment.setCreatedById("userId");
        when(commentRepository.save(testComment)).thenReturn(testComment);
        Mockito.doNothing().when(issueService).addComment(testComment, "anyId");

        CommentService commentService = new CommentService(commentRepository, userService, issueService);

        // when
        Comment comment = commentService.createComment(testComment, "anyId");

        // then
        assertEquals(testComment, comment);
    }

}
