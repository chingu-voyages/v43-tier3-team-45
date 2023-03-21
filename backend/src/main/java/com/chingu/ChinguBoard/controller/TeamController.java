package com.chingu.ChinguBoard.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chingu.ChinguBoard.dto.TeamDTO;
import com.chingu.ChinguBoard.mapper.TeamDTOMapper;
import com.chingu.ChinguBoard.model.Team;
import com.chingu.ChinguBoard.service.TeamService;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    private final TeamDTOMapper teamDTOMapper;

    public TeamController(TeamService teamService, TeamDTOMapper teamDTOMapper) {
        this.teamService = teamService;
        this.teamDTOMapper = teamDTOMapper;
    }

    @GetMapping()
    public ResponseEntity<List<TeamDTO>> getAllTeams() {
        List<TeamDTO> list = teamService.getAllTeams()
                .stream()
                .map(teamDTOMapper)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeam(@PathVariable String id) {
        Team team = teamService.getTeam(id);
        /**
         * could instead do:
         * return ResponseEntity.ok(teamService.getTeam(id).map(teamDTOMapper).orElseThrow()
         * where the optional error handling is done in the controller and not in ther service
         * 
         * applies to all single object mappings
         */
        return ResponseEntity.ok(teamDTOMapper.apply(team));
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<TeamDTO> createTeam(@RequestBody TeamDTO teamDTO, @PathVariable String userId) {
        Team team = new Team(teamDTO.name());
        Team savedTeam = teamService.createTeam(team, userId);
        return ResponseEntity.ok(teamDTOMapper.apply(savedTeam));
    }

    // TODO: update Team to TeamDTO
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
