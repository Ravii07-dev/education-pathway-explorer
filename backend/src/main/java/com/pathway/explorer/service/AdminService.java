package com.pathway.explorer.service;

import com.pathway.explorer.dto.CourseRequest;
import com.pathway.explorer.dto.ExamRequest;
import com.pathway.explorer.exception.DuplicateResourceException;
import com.pathway.explorer.exception.ResourceNotFoundException;
import com.pathway.explorer.model.Course;
import com.pathway.explorer.model.EntranceExam;
import com.pathway.explorer.repository.CourseRepository;
import com.pathway.explorer.repository.EntranceExamRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class AdminService {

    private final CourseRepository courseRepository;
    private final EntranceExamRepository examRepository;

    public AdminService(CourseRepository courseRepository, EntranceExamRepository examRepository) {
        this.courseRepository = courseRepository;
        this.examRepository = examRepository;
    }

    public Course createCourse(CourseRequest req) {
        if (courseRepository.existsById(req.id())) {
            throw new DuplicateResourceException("Course with ID '" + req.id() + "' already exists");
        }
        Course course = new Course(
            req.id(), req.code(), req.name(), req.degreeType(), req.duration(),
            req.eligibility(), req.costRangeGovt(), req.costRangePrivate(),
            req.examIds() != null ? req.examIds() : List.of(),
            req.careerIds() != null ? req.careerIds() : List.of(),
            req.furtherStudies() != null ? req.furtherStudies() : List.of(),
            req.description(),
            req.curriculumHighlights() != null ? req.curriculumHighlights() : List.of(),
            req.domains() != null ? req.domains() : List.of(),
            req.isPcmPrimary(),
            Instant.now()
        );
        return courseRepository.save(course);
    }

    public Course updateCourse(String id, CourseRequest req) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course with ID '" + id + "' not found");
        }
        Course updated = new Course(
            id, req.code(), req.name(), req.degreeType(), req.duration(),
            req.eligibility(), req.costRangeGovt(), req.costRangePrivate(),
            req.examIds() != null ? req.examIds() : List.of(),
            req.careerIds() != null ? req.careerIds() : List.of(),
            req.furtherStudies() != null ? req.furtherStudies() : List.of(),
            req.description(),
            req.curriculumHighlights() != null ? req.curriculumHighlights() : List.of(),
            req.domains() != null ? req.domains() : List.of(),
            req.isPcmPrimary(),
            Instant.now()
        );
        return courseRepository.save(updated);
    }

    public void deleteCourse(String id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course with ID '" + id + "' not found");
        }
        courseRepository.deleteById(id);
    }

    public EntranceExam createExam(ExamRequest req) {
        if (examRepository.existsById(req.id())) {
            throw new DuplicateResourceException("Entrance exam with ID '" + req.id() + "' already exists");
        }
        EntranceExam exam = new EntranceExam(
            req.id(), req.name(), req.fullName(), req.conductingBody(),
            req.eligibility(), req.frequency(), req.applicationMonths(),
            req.examMonths(), req.patternSummary(), req.officialUrl(),
            req.difficulty(), req.keyTips(),
            req.unlockedCourseIds() != null ? req.unlockedCourseIds() : List.of(),
            Instant.now()
        );
        return examRepository.save(exam);
    }

    public EntranceExam updateExam(String id, ExamRequest req) {
        if (!examRepository.existsById(id)) {
            throw new ResourceNotFoundException("Entrance exam with ID '" + id + "' not found");
        }
        EntranceExam updated = new EntranceExam(
            id, req.name(), req.fullName(), req.conductingBody(),
            req.eligibility(), req.frequency(), req.applicationMonths(),
            req.examMonths(), req.patternSummary(), req.officialUrl(),
            req.difficulty(), req.keyTips(),
            req.unlockedCourseIds() != null ? req.unlockedCourseIds() : List.of(),
            Instant.now()
        );
        return examRepository.save(updated);
    }

    public void deleteExam(String id) {
        if (!examRepository.existsById(id)) {
            throw new ResourceNotFoundException("Entrance exam with ID '" + id + "' not found");
        }
        examRepository.deleteById(id);
    }
}
