package com.chingu.ChinguBoard.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.ProjectListDTO;
import com.chingu.ChinguBoard.dto.TeamDTO;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.Team;

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

        // List<User> members = teamDTO.members()
        // .stream()
        // .map(userDTOMapper::toEntity)
        // .collect(Collectors.toList());
        // team.setMembers(members);
        // members list MUST not be null
        teamDTO.members().stream().forEach(userDTO -> {
            team.addMember(userDTOMapper.toEntity(userDTO));
        });

        // List<Project> projects = teamDTO.projects()
        // .stream()
        // .map(projectListDTOMapper::toEntity)
        // .collect(Collectors.toList());
        // team.setProjects(projects);
        // projects list MUST not be null
        teamDTO.projects().stream().forEach(projectListDTO -> {
            team.addProject(projectListDTOMapper.toEntity(projectListDTO));
        });

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
