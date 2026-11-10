package com.pathway.explorer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "education_levels")
public record EducationLevel(
    @Id String id,
    String name,
    String badge,
    String category,
    String tagline,
    String description,
    String typicalAge,
    List<String> keyStreamsUnlocked,
    List<String> courseIds
) {}
