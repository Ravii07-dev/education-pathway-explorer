package com.pathway.explorer.service;

import com.pathway.explorer.dto.ShortlistRequest;
import com.pathway.explorer.model.UserShortlist;
import com.pathway.explorer.repository.UserShortlistRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ShortlistService {

    private final UserShortlistRepository shortlistRepository;

    public ShortlistService(UserShortlistRepository shortlistRepository) {
        this.shortlistRepository = shortlistRepository;
    }

    public List<UserShortlist> getUserShortlist(String userId) {
        String effectiveUser = (userId != null && !userId.isBlank()) ? userId : "anonymous";
        return shortlistRepository.findByUserId(effectiveUser);
    }

    public UserShortlist addToShortlist(String userId, ShortlistRequest req) {
        String effectiveUser = (userId != null && !userId.isBlank()) ? userId : "anonymous";

        return shortlistRepository.findByUserIdAndItemIdAndItemType(effectiveUser, req.id(), req.type())
            .map(existing -> {
                existing.setUserNotes(req.userNotes());
                existing.setTitle(req.title() != null ? req.title() : existing.getTitle());
                existing.setSubtitle(req.subtitle() != null ? req.subtitle() : existing.getSubtitle());
                existing.setDomain(req.domain() != null ? req.domain() : existing.getDomain());
                existing.setUpdatedAt(Instant.now());
                return shortlistRepository.save(existing);
            })
            .orElseGet(() -> {
                UserShortlist newItem = new UserShortlist(
                    effectiveUser,
                    req.id(),
                    req.type(),
                    req.title() != null ? req.title() : "",
                    req.subtitle() != null ? req.subtitle() : "",
                    req.domain() != null ? req.domain() : "",
                    req.userNotes() != null ? req.userNotes() : ""
                );
                return shortlistRepository.save(newItem);
            });
    }

    public boolean removeFromShortlist(String userId, String type, String id) {
        String effectiveUser = (userId != null && !userId.isBlank()) ? userId : "anonymous";
        shortlistRepository.deleteByUserIdAndItemTypeAndItemId(effectiveUser, type, id);
        return true;
    }

    public void clearShortlist(String userId) {
        String effectiveUser = (userId != null && !userId.isBlank()) ? userId : "anonymous";
        shortlistRepository.deleteByUserId(effectiveUser);
    }

    public String exportMarkdown(String userId) {
        List<UserShortlist> items = getUserShortlist(userId);
        StringBuilder sb = new StringBuilder();
        sb.append("# 🎓 Education Pathway Explorer - My Curious Shortlist\n\n");
        sb.append("*Exported on: ").append(Instant.now()).append("*\n\n");
        sb.append("| Type | Title | Domain / Subtitle | Personal Notes |\n");
        sb.append("| :--- | :--- | :--- | :--- |\n");

        for (UserShortlist it : items) {
            sb.append("| **").append(it.getItemType().toUpperCase()).append("** | ")
              .append(it.getTitle()).append(" | ")
              .append(it.getSubtitle() != null ? it.getSubtitle() : "").append(" | ")
              .append(it.getUserNotes() != null ? it.getUserNotes().replace("\n", " ") : "-").append(" |\n");
        }
        return sb.toString();
    }
}
