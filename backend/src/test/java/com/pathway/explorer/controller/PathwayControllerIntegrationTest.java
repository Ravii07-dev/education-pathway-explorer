package com.pathway.explorer.controller;

import com.pathway.explorer.dto.PagedResponse;
import com.pathway.explorer.model.Course;
import com.pathway.explorer.model.EducationLevel;
import com.pathway.explorer.security.CustomUserDetailsService;
import com.pathway.explorer.security.JwtAuthenticationEntryPoint;
import com.pathway.explorer.security.JwtTokenProvider;
import com.pathway.explorer.service.PathwayService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PathwayController.class)
@AutoConfigureMockMvc(addFilters = false)
class PathwayControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PathwayService pathwayService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Test
    @DisplayName("GET /api/health should return UP status and Spring Boot 3 details")
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/api/health"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.status").value("UP"))
            .andExpect(jsonPath("$.virtualThreads").value(true));
    }

    @Test
    @DisplayName("GET /api/levels should return list of educational levels")
    void testGetLevels() throws Exception {
        when(pathwayService.getLevels()).thenReturn(List.of(
            new EducationLevel("12th_pcm", "12th Science (PCM)", "Core Focus", "12th",
                               "Physics, Chemistry, Maths", "Description", "17-18", List.of(), List.of())
        ));

        mockMvc.perform(get("/api/levels"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value("12th_pcm"))
            .andExpect(jsonPath("$[0].name").value("12th Science (PCM)"));
    }

    @Test
    @DisplayName("GET /api/courses with pagination params should return paged response")
    void testGetCoursesPaged() throws Exception {
        Course course = new Course(
            "btech_cse", "B.Tech CSE", "Computer Science", "Degree", "4 Years", "10+2 PCM",
            "1L", "2L", List.of(), List.of(), List.of(), "Desc", List.of(), List.of("Technology"), true
        );
        PagedResponse<Course> paged = new PagedResponse<>(List.of(course), 0, 10, 1, 1, true);

        when(pathwayService.getCoursesPaged(any(), any(Integer.class), any(Integer.class), any(), any()))
            .thenReturn(paged);

        mockMvc.perform(get("/api/courses?page=0&size=10"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content[0].id").value("btech_cse"))
            .andExpect(jsonPath("$.totalElements").value(1))
            .andExpect(jsonPath("$.last").value(true));
    }
}
