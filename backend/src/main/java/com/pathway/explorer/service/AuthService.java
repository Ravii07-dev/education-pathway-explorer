package com.pathway.explorer.service;

import com.pathway.explorer.dto.AuthRequest;
import com.pathway.explorer.dto.AuthResponse;
import com.pathway.explorer.dto.SignUpRequest;
import com.pathway.explorer.exception.DuplicateResourceException;
import com.pathway.explorer.model.User;
import com.pathway.explorer.repository.UserRepository;
import com.pathway.explorer.security.JwtTokenProvider;
import com.pathway.explorer.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse register(SignUpRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new DuplicateResourceException("Username '" + request.username() + "' is already taken");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email '" + request.email() + "' is already registered");
        }

        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");
        // Auto-grant admin to admin username
        if ("admin".equalsIgnoreCase(request.username())) {
            roles.add("ROLE_ADMIN");
        }

        User user = new User(
            request.username(),
            request.email(),
            passwordEncoder.encode(request.password()),
            request.fullName() != null ? request.fullName() : request.username(),
            roles
        );

        User savedUser = userRepository.save(user);

        List<String> roleList = roles.stream().toList();
        String token = tokenProvider.generateTokenForUser(savedUser.getUsername(), savedUser.getId(), savedUser.getEmail(), roleList);

        return new AuthResponse(
            token,
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            savedUser.getFullName(),
            savedUser.getRoles()
        );
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String token = tokenProvider.generateToken(authentication);

        Set<String> roles = principal.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toSet());

        return new AuthResponse(
            token,
            principal.getId(),
            principal.getUsername(),
            principal.getEmail(),
            principal.getFullName(),
            roles
        );
    }

    public AuthResponse getProfile(UserPrincipal principal) {
        Set<String> roles = principal.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toSet());

        return new AuthResponse(
            "",
            principal.getId(),
            principal.getUsername(),
            principal.getEmail(),
            principal.getFullName(),
            roles
        );
    }
}
