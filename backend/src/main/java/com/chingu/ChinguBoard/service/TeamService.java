package com.chingu.ChinguBoard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Team;
import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.TeamRepository;

@Service
public class TeamService {
    
    private final TeamRepository teamRepository;

    private final UserService userService;

    public TeamService(TeamRepository teamRepository, UserService userService) {
        this.teamRepository = teamRepository;
        this.userService = userService;
    }
    
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team getTeam(String id) {
        return teamRepository.findById(id).orElseThrow();
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
}