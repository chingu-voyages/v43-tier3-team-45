package com.chingu.ChinguBoard.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

    /**
     * used to populate lists for Comments and Users since Issue from DB will only
     * have IDs
     */
    public Issue populateLists(Issue issue) {

        // "data loader" to batch queries for N + 1 issue.
        List<Comment> comments = commentService.getComments(issue.getCommentIds());
        issue.setComments(comments);

        List<User> assignees = userService.getUsers(issue.getAssigneeIds());
        issue.setAssignees(assignees);

        issue.setCreatedBy(userService.getUser(issue.getCreatedById()));

        return issue;
    }

    public Issue populateListForDisplay(Issue issue) {
        issue.setCreatedBy(userService.getUser(issue.getCreatedById()));
        return issue;
    }

    public Issue getIssue(String id) {
        Issue issue = issueRepository.findById(id).orElseThrow();
        return populateLists(issue);
    }

    public List<Issue> getIssues(List<String> ids) {
        List<Issue> issues = issueRepository.findAllById(ids);
        return issues.stream().map(this::populateLists).collect(Collectors.toList());
    }

    /**
     * method used to get Issue to create IssueListDTO when viewing project
     */
    public List<Issue> getIssueList(List<String> ids) {
        List<Issue> issues = issueRepository.findAllById(ids);
        List<String> userIds = new ArrayList<>();
        for (int i = 0; i < issues.size(); i++) {
            userIds.add(issues.get(i).getCreatedById());
        }
        Map<String, User> userMap = userService.getUserMap(userIds);
        for (int i = 0; i < issues.size(); i++) {
            issues.get(i).setCreatedBy(userMap.get(userIds.get(i)));
        }
        return issues;

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
     * project (done)
     * - one for deleting the issue as a result of deleting a project, no need to
     * delete it's reference from the project as the project will be deleted and it
     * is unnecessary DB access (will implement if needed)
     */

    public void deleteIssue(String issueId, String projectId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow();
        // delete all comments on this issue
        List<String> commentIds = issue.getCommentIds();
        commentService.deleteComments(commentIds);

        // remove issue reference from its project
        projectService.removeIssue(projectId, issueId);

        // delete issue itself
        issueRepository.deleteById(issueId);
    }

    public void removeComment(String issueId, String commentId) {
        Issue issue = getIssue(issueId);
        issue.removeComment(commentId);
        issueRepository.save(issue);
    }

}
