package com.chingu.ChinguBoard.mapper;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.ProjectListDTO;
import com.chingu.ChinguBoard.model.Project;

@Service
public class ProjectListDTOMapper {
    
    public Project toEntity(ProjectListDTO projectListDTO) {
        Project project = new Project();
        project.setId(projectListDTO.id());
        project.setName(projectListDTO.name());
        return project;
    }

    public ProjectListDTO toDTO(Project project) {
        return new ProjectListDTO(project.getId(), project.getName());
    }
}
