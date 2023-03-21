package com.chingu.ChinguBoard.mapper;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.chingu.ChinguBoard.dto.IssueDTO;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.Issue;

public class IssueDTOMapper implements Function<Issue, IssueDTO> {

    private final UserDTOMapper userDTOMapper;

    public IssueDTOMapper(UserDTOMapper userDTOMapper) {
        this.userDTOMapper = userDTOMapper;
    }

    @Override
    public IssueDTO apply(Issue issue) {
        UserDTO createdBy = userDTOMapper.apply(issue.getCreatedBy());
        List<UserDTO> assignees = issue.getAssignees()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
        return new IssueDTO(issue.getId(),
                issue.getTitle(),
                issue.getDescription(),
                createdBy,
                assignees,
                issue.getIssueType().name(),
                issue.getPriority().name(),
                issue.getStatus().name(),
                issue.getCreatedAt(),
                issue.getUpdatedAt(),
                issue.getDueAt());
    }

}
