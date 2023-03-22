package com.chingu.ChinguBoard.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Project;
import com.chingu.ChinguBoard.model.Team;
import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.TeamRepository;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    private final UserService userService;

    private final ProjectService projectService;

    public TeamService(TeamRepository teamRepository, UserService userService, @Lazy ProjectService projectService) {
        this.teamRepository = teamRepository;
        this.userService = userService;
        this.projectService = projectService;
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team getTeam(String id) {
        Team team = teamRepository.findById(id).orElseThrow();

        List<Project> projects = team.getProjectIds()
                .stream()
                .map(projectService::getProject)
                .collect(Collectors.toList());
        team.setProjects(projects);

        List<User> members = team.getMemberIds()
                .stream()
                .map(userService::getUser)
                .collect(Collectors.toList());
        team.setMembers(members);

        return team;
    }

    public Team createTeam(Team team, String userId) {
        User user = userService.getUser(userId);
        team.addMember(user);
        return teamRepository.save(team);
    }

    public Team updateTeam(Team team) {
        return teamRepository.save(team);
    }

    public Team addMember(String teamId, String userId) {
        Team team = teamRepository.findById(teamId).orElseThrow();
        User user = userService.getUser(userId);
        team.addMember(user);
        return teamRepository.save(team);
    }

    public void addProject(Project project, String teamId) {
        Team team = getTeam(teamId);
        team.addProject(project);
        teamRepository.save(team);
    }

}