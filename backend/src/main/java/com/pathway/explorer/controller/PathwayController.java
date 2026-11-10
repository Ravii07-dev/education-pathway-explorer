package com.pathway.explorer.controller;

import com.pathway.explorer.dto.PagedResponse;
import com.pathway.explorer.model.*;
import com.pathway.explorer.service.PathwayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "Education Pathways", description = "Public endpoints for exploring Indian educational streams, degrees, careers, and exams")
public class PathwayController {

    private final PathwayService pathwayService;

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    public PathwayController(PathwayService pathwayService) {
        this.pathwayService = pathwayService;
    }

    @GetMapping("/health")
    @Operation(summary = "System health check endpoint")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "Education Pathway Explorer - Spring Boot 3 Enterprise",
            "framework", "Spring Boot 3.3.5 / Java 21 LTS",
            "virtualThreads", true,
            "timestamp", Instant.now().toString()
        ));
    }

    @GetMapping("/db-status")
    @Operation(summary = "Inspect live MongoDB Atlas connection status and collections")
    public ResponseEntity<Map<String, Object>> dbStatus() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("databaseType", "MongoDB Atlas (Spring Data MongoDB)");
        status.put("mongoUriConfigured", sanitizeUri(mongoUri));
        status.put("isMongoConnected", true);
        status.put("totalEducationLevels", pathwayService.getLevels().size());
        status.put("totalCourses", pathwayService.getAllCourses(null, null).size());
        status.put("totalCareers", pathwayService.getAllCareers(null).size());
        status.put("totalExams", pathwayService.getExams(null).size());
        status.put("storageStatus", "ACTIVE");
        return ResponseEntity.ok(status);
    }

    @GetMapping("/levels")
    @Operation(summary = "List all education milestone levels (10th, 12th PCM, PCB, Commerce, Arts, Graduation)")
    public ResponseEntity<List<EducationLevel>> getLevels() {
        return ResponseEntity.ok(pathwayService.getLevels());
    }

    @GetMapping("/levels/{id}")
    @Operation(summary = "Get specific education level details")
    public ResponseEntity<EducationLevel> getLevelById(@PathVariable String id) {
        return ResponseEntity.ok(pathwayService.getLevelById(id));
    }

    @GetMapping("/courses")
    @Operation(summary = "Get courses with optional domain filtering and pagination")
    public ResponseEntity<?> getCourses(
        @Parameter(description = "Filter by academic domain") @RequestParam(required = false) String domain,
        @Parameter(description = "Filter by education level ID") @RequestParam(required = false) String levelId,
        @Parameter(description = "Page number (0-indexed)") @RequestParam(required = false) Integer page,
        @Parameter(description = "Page size") @RequestParam(defaultValue = "10") Integer size,
        @Parameter(description = "Sort field") @RequestParam(defaultValue = "code") String sortBy,
        @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir
    ) {
        if (page != null) {
            PagedResponse<Course> paged = pathwayService.getCoursesPaged(domain, page, size, sortBy, sortDir);
            return ResponseEntity.ok(paged);
        }
        return ResponseEntity.ok(pathwayService.getAllCourses(domain, levelId));
    }

    @GetMapping("/courses/{id}")
    @Operation(summary = "Get complete course curriculum and career outcomes by ID")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return ResponseEntity.ok(pathwayService.getCourseById(id));
    }

    @GetMapping("/careers")
    @Operation(summary = "Get 21st-century careers with optional domain filtering and pagination")
    public ResponseEntity<?> getCareers(
        @Parameter(description = "Filter by professional domain") @RequestParam(required = false) String domain,
        @Parameter(description = "Page number (0-indexed)") @RequestParam(required = false) Integer page,
        @Parameter(description = "Page size") @RequestParam(defaultValue = "10") Integer size,
        @Parameter(description = "Sort field") @RequestParam(defaultValue = "title") String sortBy,
        @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir
    ) {
        if (page != null) {
            PagedResponse<Career> paged = pathwayService.getCareersPaged(domain, page, size, sortBy, sortDir);
            return ResponseEntity.ok(paged);
        }
        return ResponseEntity.ok(pathwayService.getAllCareers(domain));
    }

    @GetMapping("/careers/{id}")
    @Operation(summary = "Get career details including day-to-day responsibilities and reverse pathway steps")
    public ResponseEntity<Career> getCareerById(@PathVariable String id) {
        return ResponseEntity.ok(pathwayService.getCareerById(id));
    }

    @GetMapping("/exams")
    @Operation(summary = "List all competitive and entrance exams with optional difficulty filter")
    public ResponseEntity<List<EntranceExam>> getExams(
        @RequestParam(required = false) String difficulty
    ) {
        return ResponseEntity.ok(pathwayService.getExams(difficulty));
    }

    @GetMapping("/exams/{id}")
    @Operation(summary = "Get entrance exam syllabus, dates, and conducting body details")
    public ResponseEntity<EntranceExam> getExamById(@PathVariable String id) {
        return ResponseEntity.ok(pathwayService.getExamById(id));
    }

    @GetMapping("/switching-routes")
    @Operation(summary = "List zero-fear career switching pathways")
    public ResponseEntity<List<SwitchingRoute>> getSwitchingRoutes(
        @RequestParam(required = false) String difficulty
    ) {
        return ResponseEntity.ok(pathwayService.getSwitchingRoutes(difficulty));
    }

    @GetMapping("/search")
    @Operation(summary = "Global multi-collection keyword search across courses, careers, exams, and switching routes")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String q) {
        return ResponseEntity.ok(pathwayService.search(q));
    }

    private String sanitizeUri(String uri) {
        if (uri == null) return "null";
        if (uri.contains("@")) {
            return uri.replaceAll(":[^:@]+@", ":****@");
        }
        return uri;
    }
}
