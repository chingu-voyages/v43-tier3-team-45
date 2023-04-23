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
import com.chingu.ChinguBoard.dto.ProjectListDTO;
import com.chingu.ChinguBoard.mapper.ProjectDTOMapper;
import com.chingu.ChinguBoard.mapper.ProjectListDTOMapper;
import com.chingu.ChinguBoard.model.Project;
import com.chingu.ChinguBoard.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    private final ProjectDTOMapper projectDTOMapper;

    private final ProjectListDTOMapper projectListDTOMapper;

    public ProjectController(ProjectService projectService, ProjectDTOMapper projectDTOMapper,
            ProjectListDTOMapper projectListDTOMapper) {
        this.projectService = projectService;
        this.projectDTOMapper = projectDTOMapper;
        this.projectListDTOMapper = projectListDTOMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable String id) {
        Project project = projectService.getProject(id);
        return ResponseEntity.ok(projectDTOMapper.toDTO(project));
    }

    @PostMapping("/create/{teamId}")
    public ResponseEntity<ProjectListDTO> createProject(@RequestBody ProjectDTO projectDTO,
            @PathVariable String teamId) {
        Project project = projectDTOMapper.toEntity(projectDTO);
        Project savedProject = projectService.createProject(project, teamId);
        return ResponseEntity.ok(projectListDTOMapper.toDTO(savedProject));
    }

    @PutMapping("/update")
    public ResponseEntity<ProjectListDTO> updateProject(@RequestBody ProjectDTO projectDTO) {
        Project project = projectDTOMapper.toEntity(projectDTO);
        Project updatedProject = projectService.updateProject(project);
        return ResponseEntity.ok(projectListDTOMapper.toDTO(updatedProject));
    }

    // add DELETE method
}
