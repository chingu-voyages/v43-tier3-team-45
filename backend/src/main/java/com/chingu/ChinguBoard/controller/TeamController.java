package com.chingu.ChinguBoard.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chingu.ChinguBoard.model.Team;
import com.chingu.ChinguBoard.service.TeamService;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
    
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping()
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeam(@PathVariable String id) {
        Team team = teamService.getTeam(id);
        return ResponseEntity.ok(team);
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<Team> createTeam(@RequestBody Team team, @PathVariable String userId) {
        Team savedTeam = teamService.createTeam(team, userId);
        return ResponseEntity.ok(savedTeam);
    }

    @PutMapping("/update")
    public ResponseEntity<Team> updateTeam(@RequestBody Team team) {
        Team updatedTeam = teamService.updateTeam(team);
        return ResponseEntity.ok(updatedTeam);
    }

    @PutMapping("/{id}/{userId}")
    public void addMemberToTeam(@PathVariable String id, @PathVariable String userId) {
        teamService.addMember(id, userId);
    }
}
