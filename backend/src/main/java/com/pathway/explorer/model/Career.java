package com.pathway.explorer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "careers")
@CompoundIndexes({
    @CompoundIndex(name = "career_domain_title_idx", def = "{'domain': 1, 'title': 1}")
})
public record Career(
    @Id String id,
    @Indexed String title,
    @Indexed String domain,
    String shortDesc,
    List<String> dayToDay,
    List<String> skills,
    String salaryEntry,
    String salaryMid,
    String growthOutlook,
    String growthReason,
    List<String> courseIds,
    List<RouteStep> routes,
    @LastModifiedDate Instant updatedAt
) {
    public Career(
        String id, String title, String domain, String shortDesc,
        List<String> dayToDay, List<String> skills, String salaryEntry,
        String salaryMid, String growthOutlook, String growthReason,
        List<String> courseIds, List<RouteStep> routes
    ) {
        this(id, title, domain, shortDesc, dayToDay, skills, salaryEntry,
             salaryMid, growthOutlook, growthReason, courseIds, routes, Instant.now());
    }
}
