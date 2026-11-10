package com.pathway.explorer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathway.explorer.dto.AuthRequest;
import com.pathway.explorer.dto.AuthResponse;
import com.pathway.explorer.dto.SignUpRequest;
import com.pathway.explorer.security.CustomUserDetailsService;
import com.pathway.explorer.security.JwtAuthenticationEntryPoint;
import com.pathway.explorer.security.JwtTokenProvider;
import com.pathway.explorer.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Test
    @DisplayName("POST /api/auth/signup should create user and return 201 Created with JWT")
    void testSignUpSuccess() throws Exception {
        SignUpRequest request = new SignUpRequest("priya", "priya@example.com", "Secret@123", "Priya Verma");
        AuthResponse response = new AuthResponse("mock_token_jwt", "user_456", "priya", "priya@example.com", "Priya Verma", Set.of("ROLE_USER"));

        when(authService.register(any(SignUpRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.token").value("mock_token_jwt"))
            .andExpect(jsonPath("$.username").value("priya"))
            .andExpect(jsonPath("$.tokenType").value("Bearer"));
    }

    @Test
    @DisplayName("POST /api/auth/signup with invalid email should return 400 Bad Request")
    void testSignUpValidationError() throws Exception {
        SignUpRequest badRequest = new SignUpRequest("pr", "not-an-email", "123", "Priya");

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(badRequest)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.status").value(400))
            .andExpect(jsonPath("$.error").value("Validation Failed"));
    }

    @Test
    @DisplayName("POST /api/auth/login should authenticate and return 200 OK with token")
    void testLoginSuccess() throws Exception {
        AuthRequest request = new AuthRequest("priya", "Secret@123");
        AuthResponse response = new AuthResponse("auth_token_789", "user_456", "priya", "priya@example.com", "Priya Verma", Set.of("ROLE_USER"));

        when(authService.login(any(AuthRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value("auth_token_789"))
            .andExpect(jsonPath("$.username").value("priya"));
    }
}
