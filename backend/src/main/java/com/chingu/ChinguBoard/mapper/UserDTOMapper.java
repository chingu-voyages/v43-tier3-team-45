package com.chingu.ChinguBoard.mapper;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.Role;
import com.chingu.ChinguBoard.model.User;

@Service
public class UserDTOMapper {

    public User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.id());
        user.setEmail(userDTO.email());
        user.setFirstName(userDTO.firstName());
        user.setLastName(userDTO.lastName());
        user.setRole(Role.valueOf(userDTO.role()));
        return user;
    }

    public UserDTO toDTO(User user) {
        return new UserDTO(user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().name(),
                user.getAvatarUrl());
    }

}
