package com.chingu.ChinguBoard.service;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Project;
import com.chingu.ChinguBoard.repository.ProjectRepository;

@Service
public class ProjectService {
    
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project getProject(String id) {
        return projectRepository.findById(id).orElseThrow();
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
}
