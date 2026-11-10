package com.pathway.explorer.model;

import java.util.List;

public record EntranceExam(
    String id,
    String name,
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
