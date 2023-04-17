package com.chingu.ChinguBoard.service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
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

    // batch query to reduce number of queries
    public Project populateLists(Project project) {
        List<Issue> issues = issueService.getIssueList(project.getIssueIds());
        project.setIssues(issues);

        return project;
    }

    /**
     * There is no need to populate the issues list for individual project because
     * the porjects are only used for displaying project names
     * 
     * @param ids - list of project IDs from a Team object
     * @return list of Projects
     */
    public List<Project> getProjects(List<String> ids) {
        return projectRepository.findAllById(ids);
    }

    public Project getProject(String id) {
        Project project = projectRepository.findById(id).orElseThrow();
        return populateLists(project);
    }

    public Map<String, Project> getProjectMap(List<String> ids) {
        List<Project> projects = getProjects(ids);
        Map<String, Project> map = projects.stream().collect(Collectors.toMap(Project::getId, Function.identity()));
        return map;
    }

    public Project createProject(Project project, String teamId) {
        Project savedProject = projectRepository.save(project);
        teamService.addProject(savedProject, teamId);
        return savedProject;
    }

    public void addIssue(Issue issue, String projectId) {
        /**
         * best to use getProject since retrieving straight from DB
         * will be missing the list of objects but has the list of IDs, the resulting
         * object will have discrepencies
         */
        Project project = getProject(projectId);
        project.addIssue(issue);
        projectRepository.save(project);
    }

    public void removeIssue(String projectId, String issueId) {
        Project project = getProject(projectId);
        project.removeIssue(issueId);
        projectRepository.save(project);
    }

    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }
}
