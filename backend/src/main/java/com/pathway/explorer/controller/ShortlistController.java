package com.pathway.explorer.controller;

import com.pathway.explorer.dto.ShortlistRequest;
import com.pathway.explorer.model.UserShortlist;
import com.pathway.explorer.security.UserPrincipal;
import com.pathway.explorer.service.ShortlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shortlist")
@Tag(name = "Shortlists & Bookmarks", description = "Scoped bookmarking endpoints for curious items and personal notes")
public class ShortlistController {

    private final ShortlistService shortlistService;

    public ShortlistController(ShortlistService shortlistService) {
        this.shortlistService = shortlistService;
    }

    @GetMapping
    @Operation(summary = "Get user's saved shortlist (scoped to authenticated user or anonymous session)")
    public ResponseEntity<List<UserShortlist>> getShortlist(@AuthenticationPrincipal UserPrincipal principal) {
        String userId = principal != null ? principal.getId() : "anonymous";
        return ResponseEntity.ok(shortlistService.getUserShortlist(userId));
    }

    @PostMapping
    @Operation(summary = "Save or update a course, career, or exam in user's shortlist")
    public ResponseEntity<UserShortlist> addToShortlist(
        @AuthenticationPrincipal UserPrincipal principal,
        @Valid @RequestBody ShortlistRequest request
    ) {
        String userId = principal != null ? principal.getId() : "anonymous";
        UserShortlist saved = shortlistService.addToShortlist(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{type}/{id}")
    @Operation(summary = "Remove an item from user's shortlist")
    public ResponseEntity<Void> removeFromShortlist(
        @AuthenticationPrincipal UserPrincipal principal,
        @PathVariable String type,
        @PathVariable String id
    ) {
        String userId = principal != null ? principal.getId() : "anonymous";
        shortlistService.removeFromShortlist(userId, type, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    @Operation(summary = "Clear all items from user's shortlist")
    public ResponseEntity<Void> clearShortlist(@AuthenticationPrincipal UserPrincipal principal) {
        String userId = principal != null ? principal.getId() : "anonymous";
        shortlistService.clearShortlist(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/export")
    @Operation(summary = "Export user shortlist as formatted Markdown document")
    public ResponseEntity<String> exportMarkdown(@AuthenticationPrincipal UserPrincipal principal) {
        String userId = principal != null ? principal.getId() : "anonymous";
        String md = shortlistService.exportMarkdown(userId);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"education_pathway_shortlist.md\"")
            .contentType(MediaType.parseMediaType("text/markdown; charset=UTF-8"))
            .body(md);
    }
}
