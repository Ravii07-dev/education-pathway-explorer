package com.pathway.explorer.model;

public record ShortlistItem(
    String id,
    String type,
    String title,
    String subtitle,
    String domain,
    String dateAdded,
    String userNotes
) {}
