package com.pathway.explorer.service;

import com.pathway.explorer.dto.PagedResponse;
import com.pathway.explorer.exception.ResourceNotFoundException;
import com.pathway.explorer.model.Course;
import com.pathway.explorer.model.EducationLevel;
import com.pathway.explorer.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PathwayServiceTest {

    @Mock
    private EducationLevelRepository levelRepository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private CareerRepository careerRepository;

    @Mock
    private EntranceExamRepository examRepository;

    @Mock
    private SwitchingRouteRepository switchingRouteRepository;

    @InjectMocks
    private PathwayService pathwayService;

    private Course sampleCourse;

    @BeforeEach
    void setUp() {
        sampleCourse = new Course(
            "btech_cse", "B.Tech CSE", "Computer Science and Engineering", "Undergraduate Degree",
            "4 Years", "10+2 with PCM (Physics, Chemistry, Maths)", "₹40K - ₹1.5L / year",
            "₹1.5L - ₹4.5L / year", List.of("jee_main", "jee_advanced"),
            List.of("software_engineer", "ai_engineer"), List.of("M.Tech", "MS"),
            "Flagship engineering degree focusing on software development and computing systems.",
            List.of("Algorithms", "Systems Programming", "Distributed Systems"),
            List.of("Computer Science & Software", "Technology"), true
        );
    }

    @Test
    @DisplayName("Should return all education levels")
    void testGetLevels() {
        when(levelRepository.findAll()).thenReturn(List.of(
            new EducationLevel("12th_pcm", "12th Science (PCM)", "Core Focus", "12th",
                               "Physics, Chemistry, Maths", "Description", "17-18", List.of(), List.of())
        ));

        List<EducationLevel> levels = pathwayService.getLevels();

        assertNotNull(levels);
        assertEquals(1, levels.size());
        assertEquals("12th_pcm", levels.get(0).id());
        verify(levelRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should find course by ID when exists")
    void testGetCourseByIdSuccess() {
        when(courseRepository.findById("btech_cse")).thenReturn(Optional.of(sampleCourse));

        Course course = pathwayService.getCourseById("btech_cse");

        assertNotNull(course);
        assertEquals("btech_cse", course.id());
        assertEquals("B.Tech CSE", course.code());
        verify(courseRepository, times(1)).findById("btech_cse");
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when course does not exist")
    void testGetCourseByIdNotFound() {
        when(courseRepository.findById("invalid_id")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> pathwayService.getCourseById("invalid_id"));
    }

    @Test
    @DisplayName("Should return paginated courses")
    void testGetCoursesPaged() {
        when(courseRepository.findAll(any(Pageable.class)))
            .thenReturn(new PageImpl<>(List.of(sampleCourse)));

        PagedResponse<Course> response = pathwayService.getCoursesPaged(null, 0, 10, "code", "asc");

        assertNotNull(response);
        assertEquals(1, response.content().size());
        assertEquals(0, response.page());
        assertTrue(response.last());
    }

    @Test
    @DisplayName("Should filter courses by academic domain")
    void testGetCoursesByDomain() {
        when(courseRepository.findByDomainsContaining("Technology"))
            .thenReturn(List.of(sampleCourse));

        List<Course> results = pathwayService.getAllCourses("Technology", null);

        assertEquals(1, results.size());
        assertEquals("btech_cse", results.get(0).id());
        verify(courseRepository, times(1)).findByDomainsContaining("Technology");
    }
}
