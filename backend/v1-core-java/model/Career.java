package com.pathway.explorer.model;

import java.util.List;

public record Career(
    String id,
    String title,
    String domain,
    String shortDesc,
    List<String> dayToDay,
    List<String> skills,
    String salaryEntry,
    String salaryMid,
    String growthOutlook,
    String growthReason,
    List<String> courseIds,
    List<RouteStep> routes
) {}
