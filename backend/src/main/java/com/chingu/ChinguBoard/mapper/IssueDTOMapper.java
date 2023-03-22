package com.chingu.ChinguBoard.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.chingu.ChinguBoard.dto.CommentDTO;
import com.chingu.ChinguBoard.dto.IssueDTO;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.Comment;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.model.IssueType;
import com.chingu.ChinguBoard.model.Priority;
import com.chingu.ChinguBoard.model.Status;
import com.chingu.ChinguBoard.model.User;

public class IssueDTOMapper {

    private final UserDTOMapper userDTOMapper;

    private final CommentDTOMapper commentDTOMapper;

    public IssueDTOMapper(UserDTOMapper userDTOMapper, CommentDTOMapper commentDTOMapper) {
        this.userDTOMapper = userDTOMapper;
        this.commentDTOMapper = commentDTOMapper;
    }

    public Issue toEntity(IssueDTO issueDTO) {
        Issue issue = new Issue();
        issue.setId(issueDTO.id());
        issue.setTitle(issueDTO.title());
        issue.setDescription(issueDTO.description());
        issue.setCreatedBy(userDTOMapper.toEntity(issueDTO.createdBy()));

        // map each UserDTO to User
        List<User> assignees = issueDTO.assignees()
                .stream()
                .map(userDTOMapper::toEntity)
                .collect(Collectors.toList());
        issue.setAssignees(assignees);

        // map each CommentDTO to Comment
        List<Comment> comments = issueDTO.comments()
                .stream()
                .map(commentDTOMapper::toEntity)
                .collect(Collectors.toList());
        issue.setComments(comments);

        issue.setIssueType(IssueType.valueOf(issueDTO.issueType()));
        issue.setPriority(Priority.valueOf(issueDTO.priority()));
        issue.setStatus(Status.valueOf(issueDTO.status()));
        issue.setCreatedAt(issueDTO.createdAt());
        issue.setUpdatedAt(issueDTO.updatedAt());
        issue.setDueAt(issueDTO.dueAt());
        return issue;
    }

    public IssueDTO toDTO(Issue issue) {
        // map each User to UserDTO
        List<UserDTO> assignees = issue.getAssignees()
                .stream()
                .map(userDTOMapper::toDTO)
                .collect(Collectors.toList());
        
        // map each Comment to CommentDTO
        List<CommentDTO> comments = issue.getComments()
                .stream()
                .map(commentDTOMapper::toDTO)
                .collect(Collectors.toList());
                
        return new IssueDTO(issue.getId(), 
                issue.getTitle(), 
                issue.getDescription(), 
                userDTOMapper.toDTO(issue.getCreatedBy()), 
                assignees, 
                comments, 
                issue.getIssueType().name(), 
                issue.getPriority().name(), 
                issue.getStatus().name(), 
                issue.getCreatedAt(), 
                issue.getUpdatedAt(), 
                issue.getDueAt());
    }

}
