package com.chingu.ChinguBoard.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.IssueListDTO;
import com.chingu.ChinguBoard.dto.ProjectDTO;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.model.Project;

@Service
public class ProjectDTOMapper {
    
    private final IssueListDTOMapper issueListDTOMapper;

    public ProjectDTOMapper(IssueListDTOMapper issueListDTOMapper) {
        this.issueListDTOMapper = issueListDTOMapper;
    }

    public Project toEntity(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setId(projectDTO.id());
        project.setName(projectDTO.name());
        project.setDescription(projectDTO.description());

        List<Issue> issues = projectDTO.issues()
                .stream()
                .map(issueListDTOMapper::toEntity)
                .collect(Collectors.toList());
        
        project.setIssues(issues);
        return project;
    }

    public ProjectDTO toDTO(Project project) {
        // map each Issue to IssueListDTO
        List<IssueListDTO> issues = project.getIssues()
                .stream()
                .map(issueListDTOMapper::toDTO)
                .collect(Collectors.toList());
        
        return new ProjectDTO(project.getId(), project.getName(), project.getDescription(), issues);
    }
}
