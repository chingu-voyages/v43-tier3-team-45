package com.chingu.ChinguBoard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chingu.ChinguBoard.dto.ProjectDTO;
import com.chingu.ChinguBoard.mapper.ProjectDTOMapper;
import com.chingu.ChinguBoard.model.Project;
import com.chingu.ChinguBoard.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    private final ProjectDTOMapper projectDTOMapper;

    public ProjectController(ProjectService projectService, ProjectDTOMapper projectDTOMapper) {
        this.projectService = projectService;
        this.projectDTOMapper = projectDTOMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable String id) {
        Project project = projectService.getProject(id);
        return ResponseEntity.ok(projectDTOMapper.toDTO(project));
    }

    @PostMapping("/create/{teamId}")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO, @PathVariable String teamId) {
        Project project = projectDTOMapper.toEntity(projectDTO);
        Project savedProject = projectService.createProject(project, teamId);
        return ResponseEntity.ok(projectDTOMapper.toDTO(savedProject));
    }

    @PutMapping("/update")
    public ResponseEntity<ProjectDTO> updateProject(@RequestBody ProjectDTO projectDTO) {
        Project project = projectDTOMapper.toEntity(projectDTO);
        Project updatedProject = projectService.updateProject(project);
        return ResponseEntity.ok(projectDTOMapper.toDTO(updatedProject));
    }

    // add DELETE method
}
