package com.chingu.ChinguBoard.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.ProjectListDTO;
import com.chingu.ChinguBoard.dto.TeamDTO;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.Project;
import com.chingu.ChinguBoard.model.Team;
import com.chingu.ChinguBoard.model.User;

@Service
public class TeamDTOMapper {

    private final UserDTOMapper userDTOMapper;

    private final ProjectListDTOMapper projectListDTOMapper;

    public TeamDTOMapper(UserDTOMapper userDTOMapper, ProjectListDTOMapper projectListDTOMapper) {
        this.userDTOMapper = userDTOMapper;
        this.projectListDTOMapper = projectListDTOMapper;
    }

    public Team toEntity(TeamDTO teamDTO) {
        Team team = new Team();
        team.setId(teamDTO.id());
        team.setName(teamDTO.name());

        List<User> members = teamDTO.members()
                .stream()
                .map(userDTOMapper::toEntity)
                .collect(Collectors.toList());
        team.setMembers(members);

        List<Project> projects = teamDTO.projects()
                .stream()
                .map(projectListDTOMapper::toEntity)
                .collect(Collectors.toList());
        team.setProjects(projects);
        return team;
    }
    
    public TeamDTO toDTO(Team team) {
        List<UserDTO> members = team.getMembers()
                .stream()
                .map(userDTOMapper::toDTO)
                .collect(Collectors.toList());
        List<ProjectListDTO> projects = team.getProjects()
                .stream()
                .map(projectListDTOMapper::toDTO)
                .collect(Collectors.toList());
        return new TeamDTO(team.getId(), team.getName(), members, projects);
    }
}
