package com.chingu.ChinguBoard.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.chingu.ChinguBoard.config.RegisterRequest;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.mapper.UserDTOMapper;
import com.chingu.ChinguBoard.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // adding mapper to controller and not the service since services can be used
    // elsewhere, not just to serve to frontend
    private final UserDTOMapper userDTOMapper;

    public UserController(UserService userService, UserDTOMapper userDTOMapper) {
        this.userService = userService;
        this.userDTOMapper = userDTOMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String id) {
        UserDTO userDTO = userDTOMapper.toDTO(userService.getUser(id));
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> list = userService.getAllUsers()
                .stream()
                .map(userDTOMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    /**
     * @param request - using RegisterRequest since all fields would be between
     *                creating and editing a profile. name can change later
     * @param id      - ID of the user under edit
     * @return newly updated UserDTO
     */
    @PatchMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String id, @ModelAttribute RegisterRequest request) {
        UserDTO userDTO = userDTOMapper.toDTO(userService.updateUser(request, id));
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/image/{id}")
    public ResponseEntity<String> updateProfileImage(@PathVariable String id,
            @RequestParam MultipartFile profileImage) {
        return ResponseEntity.ok(userService.updateUserProfileImage(profileImage, id));
    }
}
