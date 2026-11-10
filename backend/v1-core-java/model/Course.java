package com.pathway.explorer.model;

import java.util.List;

public record Course(
    String id,
    String code,
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
