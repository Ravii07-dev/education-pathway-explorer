package com.pathway.explorer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "user_shortlists")
@CompoundIndexes({
    @CompoundIndex(name = "user_item_idx", def = "{'userId': 1, 'itemId': 1, 'itemType': 1}")
})
public class UserShortlist {

    @Id
    private String id;

    private String userId; // "anonymous" for guest mode or user ID
    private String itemId;
    private String itemType; // "course", "career", "exam"
    private String title;
    private String subtitle;
    private String domain;
    private String userNotes;
    private Instant dateAdded = Instant.now();

    @LastModifiedDate
    private Instant updatedAt = Instant.now();

    public UserShortlist() {}

    public UserShortlist(String userId, String itemId, String itemType, String title, String subtitle, String domain, String userNotes) {
        this.userId = userId != null ? userId : "anonymous";
        this.itemId = itemId;
        this.itemType = itemType;
        this.title = title;
        this.subtitle = subtitle;
        this.domain = domain;
        this.userNotes = userNotes;
        this.dateAdded = Instant.now();
        this.updatedAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getItemType() { return itemType; }
    public void setItemType(String itemType) { this.itemType = itemType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getUserNotes() { return userNotes; }
    public void setUserNotes(String userNotes) { this.userNotes = userNotes; }

    public Instant getDateAdded() { return dateAdded; }
    public void setDateAdded(Instant dateAdded) { this.dateAdded = dateAdded; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
