package com.chingu.ChinguBoard.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Comment;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.IssueRepository;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    private final ProjectService projectService;

    private final CommentService commentService;

    private final UserService userService;

    public IssueService(IssueRepository issueRepository, ProjectService projectService,
            @Lazy CommentService commentService, @Lazy UserService userService) {
        this.issueRepository = issueRepository;
        this.projectService = projectService;
        this.commentService = commentService;
        this.userService = userService;
    }

    public Issue getIssue(String id) {
        Issue issue = issueRepository.findById(id).orElseThrow();

        /**
         * Issue from DB will only have a list of comment IDs and user IDs
         * from these lists, lists of User and Comment are
         */
        List<Comment> comments = issue.getCommentIds()
                .stream()
                .map(commentService::getComment)
                .collect(Collectors.toList());
        issue.setComments(comments);

        List<User> assignees = issue.getAssigneeIds()
                .stream()
                .map(userService::getUser)
                .collect(Collectors.toList());
        issue.setAssignees(assignees);

        issue.setCreatedBy(userService.getUser(issue.getCreatedById()));

        return issue;
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    /**
     * Saves an issue to the database (to issues collection), ands it to the project
     * it belongs to and updates the project as well.
     */
    public Issue createIssue(Issue issue, String projectId) {
        Issue savedIssue = issueRepository.save(issue);
        projectService.addIssue(savedIssue, projectId);
        return savedIssue;
    }

    public void addComment(Comment comment, String issueId) {
        /**
         * not necessary to get the Issue object with all fields filled (especially the
         * lists of objects since you just have to add the ID of the comment), could
         * just use issueRepository
         */
        Issue issue = getIssue(issueId);
        issue.addComment(comment);
        issueRepository.save(issue);
    }

    public void addAssignee(User assignee, String issueId) {
        /**
         * same comment as the one above
         */
        Issue issue = getIssue(issueId);
        issue.addAssignee(assignee);
        issueRepository.save(issue);
    }

    public Issue updateIssue(Issue issue) {
        Issue dbIssue = getIssue(issue.getId());
        // copying over the list of issue IDs so the client doesn't have to send list of
        // CommentDTOs, no need for copying Comments since no need to display
        issue.setCommentIds(dbIssue.getCommentIds());
        return issueRepository.save(issue);
    }

}
