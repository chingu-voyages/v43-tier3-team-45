package com.chingu.ChinguBoard.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comment {
    
    @Id
    private String id;

    // the user who created this comment. not sure to store user as the id or the actual object
    @Transient
    private User createdBy;

    private String createdById;

    // the content of this comment
    private String text;

    private Instant createdAt;

    public Comment() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getCreatedById() {
        return this.createdById;
    }

    public void setCreatedById(String createdById) {
        this.createdById = createdById;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
    
}
