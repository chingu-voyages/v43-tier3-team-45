package com.chingu.ChinguBoard.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.model.User;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {

    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
            user.getId(), 
            user.getEmail(), 
            user.getFirstName(), 
            user.getLastName(), 
            user.getRole().name());
    }

}
