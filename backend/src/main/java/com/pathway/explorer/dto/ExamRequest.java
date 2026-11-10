package com.pathway.explorer.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record ExamRequest(
    @NotBlank(message = "Exam ID is required")
    String id,

    @NotBlank(message = "Exam name is required (e.g. JEE Main)")
    String name,

    @NotBlank(message = "Full name is required")
    String fullName,

    String conductingBody,
    String eligibility,
    String frequency,
    String applicationMonths,
    String examMonths,
    String patternSummary,
    String officialUrl,
    String difficulty,
    String keyTips,
    List<String> unlockedCourseIds
) {}
