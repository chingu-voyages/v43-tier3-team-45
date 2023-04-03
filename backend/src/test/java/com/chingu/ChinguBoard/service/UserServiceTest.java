package com.chingu.ChinguBoard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.chingu.ChinguBoard.config.RegisterRequest;
import com.chingu.ChinguBoard.model.Role;
import com.chingu.ChinguBoard.model.User;
import com.chingu.ChinguBoard.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private S3Service s3Service;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetUser() {
        // given
        User testUser = new User("id", "test@gmail.com", "password", "Jason", "Smith", Role.ROLE_USER,
                "imageUrl");
        when(userRepository.findById("id")).thenReturn(Optional.of(testUser));

        UserService userService = new UserService(userRepository, s3Service, passwordEncoder);

        // when
        User actualUser = userService.getUser("id");

        // then
        verify(userRepository).findById("id");
        assertEquals(testUser, actualUser);
    }

    @Test
    public void testGetUsers() {
        List<String> ids = new ArrayList<>();
        ids.add("id1");
        ids.add("id2");

        // given
        User user1 = new User("id1", "test1@gmail.com", "password1", "firstName1", "lastName1", Role.ROLE_USER,
                "imagUrl1");
        User user2 = new User("id2", "test2@gmail.com", "password2", "firstName2", "lastName2", Role.ROLE_USER,
                "imagUrl2");

        List<User> testUsers = new ArrayList<>();
        testUsers.add(user1);
        testUsers.add(user2);

        when(userRepository.findAllById(ids)).thenReturn(testUsers);

        // when
        UserService userService = new UserService(userRepository, s3Service, passwordEncoder);

        List<User> actualUsers = userService.getUsers(ids);

        // then
        assertEquals(testUsers, actualUsers);
    }

    @Test
    public void testGetAllUsers() {

        List<String> ids = new ArrayList<>();
        ids.add("id1");
        ids.add("id2");
        ids.add("id3");

        // given
        User user1 = new User("id1", "test1@gmail.com", "password1", "firstName1", "lastName1", Role.ROLE_USER,
                "imagUrl1");
        User user2 = new User("id2", "test2@gmail.com", "password2", "firstName2", "lastName2", Role.ROLE_USER,
                "imagUrl2");
        User user3 = new User("id3", "test3@gmail.com", "password3", "firstName3", "lastName3", Role.ROLE_USER,
                "imagUrl3");

        List<User> testUsers = new ArrayList<>();
        testUsers.add(user1);
        testUsers.add(user2);
        testUsers.add(user3);

        when(userRepository.findAll()).thenReturn(testUsers);

        // when
        UserService userService = new UserService(userRepository, s3Service, passwordEncoder);

        List<User> actualUsers = userService.getAllUsers();

        // then
        assertEquals(testUsers, actualUsers);
    }

    @Test
    void testGetUserWithEmail() {
        // given
        User user1 = new User("id1", "test1@gmail.com", "password1", "firstName1", "lastName1", Role.ROLE_USER,
                "imagUrl1");
        User user2 = new User("id2", "test2@gmail.com", "password2", "firstName2", "lastName2", Role.ROLE_USER,
                "imagUrl2");

        when(userRepository.findByEmail("test1@gmail.com")).thenReturn(Optional.of(user1));

        UserService userService = new UserService(userRepository, s3Service, passwordEncoder);

        // when
        User actualUser = userService.getUserWithEmail("test1@gmail.com");

        // then
        assertEquals(user1, actualUser);
        assertNotEquals(user2, actualUser);
    }

    @Test
    public void testUpdateUser() {
        // given
        String userId = "user123";
        String firstName = "John";
        String lastName = "Doe";
        String password = "password";
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setFirstName(firstName);
        registerRequest.setLastName(lastName);
        registerRequest.setPassword(password);

        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(password)).thenReturn("password");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        UserService userService = new UserService(userRepository, s3Service, passwordEncoder);

        // when
        User updatedUser = userService.updateUser(registerRequest, userId);

        // then
        verify(userRepository).findById(userId);
        verify(userRepository).save(user);

        assertEquals(userId, updatedUser.getId());
        assertEquals(firstName, updatedUser.getFirstName());
        assertEquals(lastName, updatedUser.getLastName());
        assertEquals(password, updatedUser.getPassword());
    }

    @Test
    public void testUpdateUserProfileImage() throws Exception {
        // given
        String userId = "id";
        String avatarUrl = "https://example.com/avatar.jpg";
        MultipartFile image = mock(MultipartFile.class);
        User user = new User();
        user.setId(userId);
        user.setAvatarUrl(avatarUrl);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(s3Service.uploadImage(image)).thenReturn("https://example.com/new_avatar.jpg");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        UserService userService = new UserService(userRepository, s3Service, passwordEncoder);

        // when
        String newAvatarUrl = userService.updateUserProfileImage(image, userId);

        // then
        verify(userRepository).findById(userId);
        verify(s3Service).deleteImage(avatarUrl);
        verify(userRepository).save(user);

        assert !newAvatarUrl.equals(avatarUrl);
        assert newAvatarUrl.equals(user.getAvatarUrl());
    }
}
