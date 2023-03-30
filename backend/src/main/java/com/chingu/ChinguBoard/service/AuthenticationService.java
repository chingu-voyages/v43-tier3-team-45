package com.chingu.ChinguBoard.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.config.AuthenticationResponse;
import com.chingu.ChinguBoard.config.LoginRequest;
import com.chingu.ChinguBoard.config.RegisterRequest;
import com.chingu.ChinguBoard.dto.UserDTO;
import com.chingu.ChinguBoard.mapper.UserDTOMapper;
import com.chingu.ChinguBoard.model.Role;
import com.chingu.ChinguBoard.model.User;

@Service
public class AuthenticationService {

    private final UserService userService;

    private final S3Service s3Service;

    private final UserDTOMapper userDTOMapper;

    private final JwtEncoder encoder;

    private final AuthenticationManager authManager;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserService userService, S3Service s3Service, UserDTOMapper userDTOMapper,
            JwtEncoder encoder, AuthenticationManager authManager, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.s3Service = s3Service;
        this.userDTOMapper = userDTOMapper;
        this.encoder = encoder;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
    }

    public String generateToken(UserDetails userDetails) {
        Instant now = Instant.now();
        String scope = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(24, ChronoUnit.HOURS))
                .subject(userDetails.getPassword())
                .claim("scope", scope)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public AuthenticationResponse login(LoginRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userService.getUserWithEmail(request.getEmail());
        UserDTO userDTO = userDTOMapper.toDTO(user);
        String token = generateToken(user);
        return new AuthenticationResponse(token, userDTO);
    }

    public AuthenticationResponse register(RegisterRequest request) {
        String avatarUrl = s3Service.upload(request.getProfileImage());
        User user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getFirstName(),
                request.getLastName(),
                Role.ROLE_USER,
                avatarUrl);
        user = userService.addUser(user);
        UserDTO userDTO = userDTOMapper.toDTO(user);
        String token = generateToken(user);
        return new AuthenticationResponse(token, userDTO);
    }

}
