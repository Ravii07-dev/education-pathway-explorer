package com.pathway.explorer.model;

import java.util.List;

public record SwitchingRoute(
    String id,
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
