package com.chingu.ChinguBoard.service;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.repository.ProjectRepository;

@Service
public class ProjectService {
    
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
}
