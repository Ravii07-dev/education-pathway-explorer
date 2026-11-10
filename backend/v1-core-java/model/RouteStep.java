package com.pathway.explorer.model;

import java.util.List;

public record RouteStep(
    String title,
    String type,
    String description,
    List<String> steps,
    String typicalDuration,
    String requiredExamsOrPrep
) {}
