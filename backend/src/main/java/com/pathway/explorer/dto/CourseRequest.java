package com.pathway.explorer.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record CourseRequest(
    @NotBlank(message = "Course ID is required")
    String id,

    @NotBlank(message = "Course code is required (e.g. B.Tech CSE)")
    String code,

    @NotBlank(message = "Course name is required")
    String name,

    String degreeType,
    String duration,
    String eligibility,
    String costRangeGovt,
    String costRangePrivate,
    List<String> examIds,
    List<String> careerIds,
    List<String> furtherStudies,
    String description,
    List<String> curriculumHighlights,
    List<String> domains,
    boolean isPcmPrimary
) {}
