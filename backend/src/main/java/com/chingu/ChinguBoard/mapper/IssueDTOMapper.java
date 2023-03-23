package com.chingu.ChinguBoard.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.CommentDTO;
import com.chingu.ChinguBoard.dto.IssueDTO;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.model.IssueType;
import com.chingu.ChinguBoard.model.Priority;
import com.chingu.ChinguBoard.model.Status;

@Service
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
        issue.setCreatedById(issueDTO.createdBy().id());
        issue.setCreatedBy(userDTOMapper.toEntity(issueDTO.createdBy()));

        // mapping each UserDTO to User and adding the User and id
        issueDTO.assignees().stream().forEach(userDTO -> {
                issue.addAssignee(userDTOMapper.toEntity(userDTO));
        });

        issueDTO.comments().stream().forEach(commentDTO -> {
                issue.addComment(commentDTOMapper.toEntity(commentDTO));
        });

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
