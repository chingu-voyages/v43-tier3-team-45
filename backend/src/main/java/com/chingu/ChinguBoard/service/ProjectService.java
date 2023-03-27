package com.chingu.ChinguBoard.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.model.Project;
import com.chingu.ChinguBoard.repository.ProjectRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    private final TeamService teamService;

    private final IssueService issueService;

    public ProjectService(ProjectRepository projectRepository, TeamService teamService,
            @Lazy IssueService issueService) {
        this.projectRepository = projectRepository;
        this.teamService = teamService;
        this.issueService = issueService;
    }

    public Project getProject(String id) {
        Project project = projectRepository.findById(id).orElseThrow();

        /**
         * Project from DB only has a list of issue IDs
         * this list is used to make a List<Issue>
         */
        List<Issue> issues = project.getIssueIds()
                .stream()
                .map(issueService::getIssue)
                .collect(Collectors.toList());
        project.setIssues(issues);

        return project;
    }

    public Project createProject(Project project, String teamId) {
        Project savedProject = projectRepository.save(project);
        teamService.addProject(savedProject, teamId);
        return savedProject;
    }

    public void addIssue(Issue issue, String projectId) {
        /**
         * don't necessarily need to use getProject to populate project's list of
         * issues, the list of object not needed to be updated, only the list of IDs
         * 
         * actually, might be best to use getProject since retrieving straight from DB
         * will be missing the list of objects but has the list of IDs, the resulting
         * object will have discrepencies
         */
        Project project = getProject(projectId);
        project.addIssue(issue);
        projectRepository.save(project);
    }
}
