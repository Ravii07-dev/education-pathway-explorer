package com.pathway.explorer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "entrance_exams")
public record EntranceExam(
    @Id String id,
    @Indexed String name,
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
    List<String> unlockedCourseIds,
    @LastModifiedDate Instant updatedAt
) {
    public EntranceExam(
        String id, String name, String fullName, String conductingBody,
        String eligibility, String frequency, String applicationMonths,
        String examMonths, String patternSummary, String officialUrl,
        String difficulty, String keyTips, List<String> unlockedCourseIds
    ) {
        this(id, name, fullName, conductingBody, eligibility, frequency,
             applicationMonths, examMonths, patternSummary, officialUrl,
             difficulty, keyTips, unlockedCourseIds, Instant.now());
    }
}
