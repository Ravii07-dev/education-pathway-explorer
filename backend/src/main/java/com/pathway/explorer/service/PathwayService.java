package com.pathway.explorer.service;

import com.pathway.explorer.dto.PagedResponse;
import com.pathway.explorer.exception.ResourceNotFoundException;
import com.pathway.explorer.model.*;
import com.pathway.explorer.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PathwayService {

    private final EducationLevelRepository levelRepository;
    private final CourseRepository courseRepository;
    private final CareerRepository careerRepository;
    private final EntranceExamRepository examRepository;
    private final SwitchingRouteRepository switchingRouteRepository;

    public PathwayService(
        EducationLevelRepository levelRepository,
        CourseRepository courseRepository,
        CareerRepository careerRepository,
        EntranceExamRepository examRepository,
        SwitchingRouteRepository switchingRouteRepository
    ) {
        this.levelRepository = levelRepository;
        this.courseRepository = courseRepository;
        this.careerRepository = careerRepository;
        this.examRepository = examRepository;
        this.switchingRouteRepository = switchingRouteRepository;
    }

    public List<EducationLevel> getLevels() {
        return levelRepository.findAll();
    }

    public EducationLevel getLevelById(String id) {
        return levelRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Education level not found: " + id));
    }

    public List<Course> getAllCourses(String domain, String levelId) {
        List<Course> list;
        if (domain != null && !domain.isBlank() && !"All".equalsIgnoreCase(domain)) {
            list = courseRepository.findByDomainsContaining(domain);
        } else {
            list = courseRepository.findAll();
        }

        if (levelId != null && !levelId.isBlank()) {
            levelRepository.findById(levelId).ifPresent(level -> {
                Set<String> allowedIds = new HashSet<>(level.courseIds());
                list.removeIf(c -> !allowedIds.contains(c.id()));
            });
        }
        return list;
    }

    public PagedResponse<Course> getCoursesPaged(String domain, int page, int size, String sortBy, String sortDir) {
        Sort.Direction direction = "desc".equalsIgnoreCase(sortDir) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy != null ? sortBy : "code"));

        Page<Course> coursePage;
        if (domain != null && !domain.isBlank() && !"All".equalsIgnoreCase(domain)) {
            coursePage = courseRepository.findByDomainsContaining(domain, pageable);
        } else {
            coursePage = courseRepository.findAll(pageable);
        }
        return PagedResponse.from(coursePage);
    }

    public Course getCourseById(String id) {
        return courseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + id));
    }

    public List<Career> getAllCareers(String domain) {
        if (domain != null && !domain.isBlank() && !"All".equalsIgnoreCase(domain)) {
            return careerRepository.findByDomainIgnoreCase(domain);
        }
        return careerRepository.findAll();
    }

    public PagedResponse<Career> getCareersPaged(String domain, int page, int size, String sortBy, String sortDir) {
        Sort.Direction direction = "desc".equalsIgnoreCase(sortDir) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy != null ? sortBy : "title"));

        Page<Career> careerPage;
        if (domain != null && !domain.isBlank() && !"All".equalsIgnoreCase(domain)) {
            careerPage = careerRepository.findByDomainIgnoreCase(domain, pageable);
        } else {
            careerPage = careerRepository.findAll(pageable);
        }
        return PagedResponse.from(careerPage);
    }

    public Career getCareerById(String id) {
        return careerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Career not found: " + id));
    }

    public List<EntranceExam> getExams(String difficulty) {
        if (difficulty != null && !difficulty.isBlank() && !"All".equalsIgnoreCase(difficulty)) {
            return examRepository.findByDifficultyIgnoreCase(difficulty);
        }
        return examRepository.findAll();
    }

    public EntranceExam getExamById(String id) {
        return examRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Entrance exam not found: " + id));
    }

    public List<SwitchingRoute> getSwitchingRoutes(String difficulty) {
        if (difficulty != null && !difficulty.isBlank() && !"All".equalsIgnoreCase(difficulty)) {
            return switchingRouteRepository.findByDifficultyIgnoreCase(difficulty);
        }
        return switchingRouteRepository.findAll();
    }

    public Map<String, Object> search(String query) {
        if (query == null || query.isBlank()) {
            return Map.of("courses", List.of(), "careers", List.of(), "exams", List.of(), "switchingRoutes", List.of());
        }
        String q = query.trim();

        List<Course> courses = courseRepository.searchCourses(q).stream().limit(6).toList();
        List<Career> careers = careerRepository.searchCareers(q).stream().limit(6).toList();
        List<EntranceExam> exams = examRepository.searchExams(q).stream().limit(6).toList();
        List<SwitchingRoute> routes = switchingRouteRepository.searchSwitchingRoutes(q).stream().limit(6).toList();

        return Map.of(
            "courses", courses,
            "careers", careers,
            "exams", exams,
            "switchingRoutes", routes
        );
    }
}
