package com.chingu.ChinguBoard.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projects")
public class Project {
    
    @Id
    private String id;

    private Team team;

    private List<Issue> issues;

    public Project() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public List<Issue> getIssues() {
        return this.issues;
    }

    public void setIssues(List<Issue> issues) {
        this.issues = issues;
    }

}
