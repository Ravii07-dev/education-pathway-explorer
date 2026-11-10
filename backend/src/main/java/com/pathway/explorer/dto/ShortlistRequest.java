package com.pathway.explorer.dto;

import jakarta.validation.constraints.NotBlank;

public record ShortlistRequest(
    @NotBlank(message = "Item ID is required")
    String id,

    @NotBlank(message = "Item type is required (course, career, exam)")
    String type,

    String title,
    String subtitle,
    String domain,
    String userNotes
) {}
