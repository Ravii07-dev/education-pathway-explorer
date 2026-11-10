package com.pathway.explorer.controller;

import com.pathway.explorer.dto.CourseRequest;
import com.pathway.explorer.dto.ExamRequest;
import com.pathway.explorer.model.Course;
import com.pathway.explorer.model.EntranceExam;
import com.pathway.explorer.repository.CareerRepository;
import com.pathway.explorer.repository.CourseRepository;
import com.pathway.explorer.repository.EntranceExamRepository;
import com.pathway.explorer.repository.UserRepository;
import com.pathway.explorer.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "BearerAuth")
@Tag(name = "Admin Management", description = "Privileged endpoints for managing courses, entrance exams, and system metrics (Requires ROLE_ADMIN)")
public class AdminController {

    private final AdminService adminService;
    private final CourseRepository courseRepository;
    private final EntranceExamRepository examRepository;
    private final CareerRepository careerRepository;
    private final UserRepository userRepository;

    public AdminController(
        AdminService adminService,
        CourseRepository courseRepository,
        EntranceExamRepository examRepository,
        CareerRepository careerRepository,
        UserRepository userRepository
    ) {
        this.adminService = adminService;
        this.courseRepository = courseRepository;
        this.examRepository = examRepository;
        this.careerRepository = careerRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    @Operation(summary = "Get system statistics across collections and users")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(Map.of(
            "totalUsers", userRepository.count(),
            "totalCourses", courseRepository.count(),
            "totalCareers", careerRepository.count(),
            "totalExams", examRepository.count()
        ));
    }

    @PostMapping("/courses")
    @Operation(summary = "Create a new undergraduate degree course")
    public ResponseEntity<Course> createCourse(@Valid @RequestBody CourseRequest request) {
        Course created = adminService.createCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/courses/{id}")
    @Operation(summary = "Update an existing course")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @Valid @RequestBody CourseRequest request) {
        Course updated = adminService.updateCourse(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/courses/{id}")
    @Operation(summary = "Delete a course")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        adminService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/exams")
    @Operation(summary = "Create a new competitive or entrance exam")
    public ResponseEntity<EntranceExam> createExam(@Valid @RequestBody ExamRequest request) {
        EntranceExam created = adminService.createExam(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/exams/{id}")
    @Operation(summary = "Update an existing entrance exam")
    public ResponseEntity<EntranceExam> updateExam(@PathVariable String id, @Valid @RequestBody ExamRequest request) {
        EntranceExam updated = adminService.updateExam(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/exams/{id}")
    @Operation(summary = "Delete an entrance exam")
    public ResponseEntity<Void> deleteExam(@PathVariable String id) {
        adminService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }
}
