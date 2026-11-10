package com.pathway.explorer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "switching_routes")
public record SwitchingRoute(
    @Id String id,
    String title,
    String fromDomain,
    String toDomain,
    String commonScenario,
    String howToSwitch,
    String requirements,
    String timeline,
    String difficulty,
    List<String> proTips,
    List<String> recommendedCoursesOrCerts
) {}
