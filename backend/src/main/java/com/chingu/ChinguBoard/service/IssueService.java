package com.chingu.ChinguBoard.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Comment;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.model.Status;
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

    // can look into data loader here
    public Issue populateLists(Issue issue) {

        // "data loader" to batch queries for N + 1 issue.
        List<Comment> comments = commentService.getComments(issue.getCommentIds());
        issue.setComments(comments);

        List<User> assignees = userService.getUsers(issue.getAssigneeIds());
        issue.setAssignees(assignees);

        return issue;
    }

    public Issue getIssue(String id) {
        Issue issue = issueRepository.findById(id).orElseThrow();
        issue.setCreatedBy(userService.getUser(issue.getCreatedById()));
        return populateLists(issue);
    }

    public List<Issue> getIssues(List<String> ids) {
        return issueRepository.findAllById(ids);
    }

    public List<Issue> getAllIssues() {
        List<Issue> issues = issueRepository.findAll();
        return issues.stream().map(this::populateLists).collect(Collectors.toList());
    }

    /**
     * Saves an issue to the database (to issues collection), ands it to the project
     * it belongs to and updates the project as well.
     */
    public Issue createIssue(Issue issue, String projectId) {
        issue.setCreatedAt(Instant.now());
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
        issue.setUpdatedAt(Instant.now());
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
        /**
         * copying over the list of issue IDs so the client doesn't have to send list of
         * CommentDTOs, no need for copying Comments since no need to display
         */
        issue.setCommentIds(dbIssue.getCommentIds());
        issue.setUpdatedAt(Instant.now());
        return issueRepository.save(issue);
    }

    public Issue updateIssueStatus(String id, String status) {
        Issue issue = getIssue(id);
        issue.setStatus(Status.valueOf(status));
        issue.setUpdatedAt(Instant.now());
        return issueRepository.save(issue);
    }

    /**
     * need 2 delete methods
     * - one for deleting the issue itself from the issue (will have to iterate
     * through the comments and delete those as well) and delete it's reference from
     * project
     * - one for deleting the issue as a result of deleting a project, no need to
     * delete it's reference from the project as the project will be deleted and it
     * is unnecessary DB access
     */

}
