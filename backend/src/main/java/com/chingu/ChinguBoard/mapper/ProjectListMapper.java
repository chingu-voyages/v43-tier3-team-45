package com.chingu.ChinguBoard.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.ProjectListDTO;
import com.chingu.ChinguBoard.model.Project;

@Service
public class ProjectListMapper implements Function<Project, ProjectListDTO> {

    @Override
    public ProjectListDTO apply(Project project) {
        return new ProjectListDTO(project.getId(), project.getName());
    }
    
}
