package com.chingu.ChinguBoard.mapper;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.ProjectListDTO;
import com.chingu.ChinguBoard.dto.TeamDTO;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.Team;

@Service
public class TeamDTOMapper implements Function<Team, TeamDTO> {

    private final UserDTOMapper userDTOMapper;

    private final ProjectListMapper projectListMapper;

    public TeamDTOMapper(UserDTOMapper userDTOMapper, ProjectListMapper projectListMapper) {
        this.userDTOMapper = userDTOMapper;
        this.projectListMapper = projectListMapper;
    }

    @Override
    public TeamDTO apply(Team team) {
        List<UserDTO> members = team.getMembers()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
        List<ProjectListDTO> projects = team.getProjects()
                .stream()
                .map(projectListMapper)
                .collect(Collectors.toList());
        return new TeamDTO(team.getId(), team.getName(), members, projects);
    }

}
