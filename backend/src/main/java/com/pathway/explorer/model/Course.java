package com.pathway.explorer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "courses")
@CompoundIndexes({
    @CompoundIndex(name = "course_domain_code_idx", def = "{'domains': 1, 'code': 1}")
})
public record Course(
    @Id String id,
    @Indexed String code,
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
    boolean isPcmPrimary,
    @LastModifiedDate Instant updatedAt
) {
    public Course(
        String id, String code, String name, String degreeType, String duration, String eligibility,
        String costRangeGovt, String costRangePrivate, List<String> examIds, List<String> careerIds,
        List<String> furtherStudies, String description, List<String> curriculumHighlights,
        List<String> domains, boolean isPcmPrimary
    ) {
        this(id, code, name, degreeType, duration, eligibility, costRangeGovt, costRangePrivate,
             examIds, careerIds, furtherStudies, description, curriculumHighlights, domains,
             isPcmPrimary, Instant.now());
    }
}
