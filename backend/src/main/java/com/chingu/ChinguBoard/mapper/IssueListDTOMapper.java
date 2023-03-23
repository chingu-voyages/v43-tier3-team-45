package com.chingu.ChinguBoard.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.IssueListDTO;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.model.IssueType;
import com.chingu.ChinguBoard.model.Priority;
import com.chingu.ChinguBoard.model.Status;

@Service
public class IssueListDTOMapper {
    
    private final UserDTOMapper userDTOMapper;

    public IssueListDTOMapper(UserDTOMapper userDTOMapper) {
        this.userDTOMapper = userDTOMapper;
    }

    public Issue toEntity(IssueListDTO issueListDTO) {
        Issue issue = new Issue();
        issue.setId(issueListDTO.id());
        issue.setTitle(issueListDTO.title());
        issue.setCreatedBy(userDTOMapper.toEntity(issueListDTO.createdBy()));
        
        // map each UserDTO to User
        // List<User> assignees = issueListDTO.assignees()
        //         .stream()
        //         .map(userDTOMapper::toEntity)
        //         .collect(Collectors.toList());
        // issue.setAssignees(assignees);

        issueListDTO.assignees().stream().forEach(userDTO -> {
            issue.addAssignee(userDTOMapper.toEntity(userDTO));
        });

        issue.setIssueType(IssueType.valueOf(issueListDTO.issueType()));
        issue.setPriority(Priority.valueOf(issueListDTO.priority()));
        issue.setStatus(Status.valueOf(issueListDTO.status()));
        return issue;
    }

    public IssueListDTO toDTO(Issue issue) {
        // map each User to UserDTO
        List<UserDTO> assignees = issue.getAssignees()
                .stream()
                .map(userDTOMapper::toDTO)
                .collect(Collectors.toList());
        
        return new IssueListDTO(issue.getId(), 
                issue.getTitle(), 
                userDTOMapper.toDTO(issue.getCreatedBy()), 
                assignees, issue.getIssueType().name(), 
                issue.getPriority().name(), 
                issue.getStatus().name());
    }
}
