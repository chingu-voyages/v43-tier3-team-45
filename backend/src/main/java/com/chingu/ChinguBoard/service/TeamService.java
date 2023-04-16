package com.chingu.ChinguBoard.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    public Team populateLists(Team team) {
        /**
         * team from DB doesn't contain the actual Project and User objects, just their
         * IDs
         * the ID lists are used to make the objects
         */

        /**
         * Old method of populating project list; using data loader method below to make
         * less queries
         * List<Project> projects = team.getProjectIds()
         * .stream()
         * .map(projectService::getProject)
         * .collect(Collectors.toList());
         */

        List<Project> projects = projectService.getProjects(team.getProjectIds());
        team.setProjects(projects);

        /**
         * List<User> members = team.getMemberIds()
         * .stream()
         * .map(userService::getUser)
         * .collect(Collectors.toList());
         */
        List<User> members = userService.getUsers(team.getMemberIds());
        team.setMembers(members);

        return team;
    }

    public List<Team> getAllTeams() {
        List<Team> teams = teamRepository.findAll();
        List<String> allProjectIds = new ArrayList<>();
        for (int i = 0; i < teams.size(); i++) {
            allProjectIds.addAll(teams.get(i).getProjectIds());
        }
        // making one query instead of one per team.
        Map<String, Project> projectMap = projectService.getProjectMap(allProjectIds);
        for (int i = 0; i < teams.size(); i++) {
            List<Project> projects = new ArrayList<>();
            List<String> projectIds = teams.get(i).getProjectIds();
            for (int j = 0; j < projectIds.size(); j++) {
                projects.add(projectMap.get(projectIds.get(j)));
            }
            teams.get(i).setProjects(projects);
        }

        List<String> allMemberIds = new ArrayList<>();
        for (int i = 0; i < teams.size(); i++) {
            allMemberIds.addAll(teams.get(i).getMemberIds());
        }
        // making one query instead of one per team.
        Map<String, User> userMap = userService.getUserMap(allMemberIds);
        for (int i = 0; i < teams.size(); i++) {
            List<User> members = new ArrayList<>();
            List<String> memberIds = teams.get(i).getMemberIds();
            for (int j = 0; j < memberIds.size(); j++) {
                members.add(userMap.get(memberIds.get(j)));
            }
            teams.get(i).setMembers(members);
        }
        return teams;
    }

    public Team getTeam(String id) {
        Team team = teamRepository.findById(id).orElseThrow();
        return populateLists(team);
    }

    public Team createTeam(Team team, String userId) {
        User user = userService.getUser(userId);
        team.addMember(user);
        return teamRepository.save(team);
    }

    public Team updateTeam(Team team) {
        return teamRepository.save(team);
    }

    public User addMember(String teamId, String userId) {
        Team team = getTeam(teamId);
        User user = userService.getUser(userId);
        team.addMember(user);
        teamRepository.save(team);
        return user;
    }

    /**
     * @param teamId
     * @param userId
     * @return list of users in team after removal
     */
    public List<User> removeMember(String teamId, String userId) {
        Team team = getTeam(teamId);
        List<User> membersAfterRemove = team.removeMember(userId);
        teamRepository.save(team);
        return membersAfterRemove;
    }

    public void addProject(Project project, String teamId) {
        Team team = getTeam(teamId);
        team.addProject(project);
        teamRepository.save(team);
    }

}