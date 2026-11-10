package com.pathway.explorer.model;

import java.util.List;

public record EducationLevel(
    String id,
    String name,
    String badge,
    String category,
    String tagline,
    String description,
    String typicalAge,
    List<String> keyStreamsUnlocked,
    List<String> courseIds
) {}
