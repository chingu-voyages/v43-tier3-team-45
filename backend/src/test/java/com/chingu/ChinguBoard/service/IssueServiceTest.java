package com.chingu.ChinguBoard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.chingu.ChinguBoard.model.Comment;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.IssueRepository;

@ExtendWith(MockitoExtension.class)
public class IssueServiceTest {

    @Mock
    IssueRepository issueRepository;

    @Mock
    ProjectService projectService;

    @Mock
    CommentService commentService;

    @Mock
    UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetIssue() {
        // given
        User mockUser1 = mock(User.class);
        mockUser1.setId("userId1");
        User mockUser2 = mock(User.class);
        mockUser2.setId("userId2");
        Comment mockComment1 = mock(Comment.class);
        mockComment1.setId("commentId1");
        Comment mockComment2 = mock(Comment.class);
        mockComment2.setId("commentId2");
        Issue testIssue = new Issue();
        testIssue.setId("id");
        testIssue.setTitle("title");
        testIssue.setDescription("description");
        testIssue.setCreatedById("userId1");
        testIssue.setAssigneeIds(List.of("userId1", "userId2"));
        testIssue.setCommentIds(List.of("commentId1", "commentId2"));

        when(issueRepository.findById("id")).thenReturn(Optional.of(testIssue));
        when(userService.getUser("userId1")).thenReturn(mockUser1);
        when(userService.getUsers(testIssue.getAssigneeIds())).thenReturn(List.of(mockUser1, mockUser2));
        when(commentService.getComments(testIssue.getCommentIds())).thenReturn(List.of(mockComment1, mockComment2));

        IssueService issueService = new IssueService(issueRepository, projectService, commentService, userService);

        // when
        Issue actualIssue = issueService.getIssue("id");

        // then
        assertEquals(testIssue, actualIssue);
    }
}
