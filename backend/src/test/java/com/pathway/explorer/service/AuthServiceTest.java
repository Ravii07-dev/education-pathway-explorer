package com.pathway.explorer.service;

import com.pathway.explorer.dto.AuthRequest;
import com.pathway.explorer.dto.AuthResponse;
import com.pathway.explorer.dto.SignUpRequest;
import com.pathway.explorer.exception.DuplicateResourceException;
import com.pathway.explorer.model.User;
import com.pathway.explorer.repository.UserRepository;
import com.pathway.explorer.security.JwtTokenProvider;
import com.pathway.explorer.security.UserPrincipal;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    @Test
    @DisplayName("Should successfully register a new user and generate JWT token")
    void testRegisterSuccess() {
        SignUpRequest request = new SignUpRequest("aarav", "aarav@test.com", "Password@123", "Aarav Sharma");

        when(userRepository.existsByUsername("aarav")).thenReturn(false);
        when(userRepository.existsByEmail("aarav@test.com")).thenReturn(false);
        when(passwordEncoder.encode("Password@123")).thenReturn("hashed_password");

        User savedUser = new User("aarav", "aarav@test.com", "hashed_password", "Aarav Sharma", Set.of("ROLE_USER"));
        savedUser.setId("user_123");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(tokenProvider.generateTokenForUser(eq("aarav"), eq("user_123"), eq("aarav@test.com"), anyList()))
            .thenReturn("mock_jwt_token");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("mock_jwt_token", response.token());
        assertEquals("aarav", response.username());
        assertEquals("aarav@test.com", response.email());
        assertTrue(response.roles().contains("ROLE_USER"));
    }

    @Test
    @DisplayName("Should reject registration when username is already taken")
    void testRegisterDuplicateUsername() {
        SignUpRequest request = new SignUpRequest("existinguser", "new@test.com", "Password@123", "User");
        when(userRepository.existsByUsername("existinguser")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should successfully authenticate user on valid login")
    void testLoginSuccess() {
        AuthRequest request = new AuthRequest("aarav", "Password@123");

        UserPrincipal principal = new UserPrincipal("user_123", "aarav", "aarav@test.com", "hash", "Aarav", List.of());
        Authentication auth = mock(Authentication.class);
        when(auth.getPrincipal()).thenReturn(principal);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(auth);
        when(tokenProvider.generateToken(auth)).thenReturn("jwt_access_token");

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("jwt_access_token", response.token());
        assertEquals("aarav", response.username());
    }
}
