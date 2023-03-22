package com.chingu.ChinguBoard.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projects")
public class Project {
    
    @Id
    private String id;

    private String name;

    private Team team;

    private String description;

    private String teamId;

    @Transient
    private List<Issue> issues;

    private List<String> issueIds;

    public Project() {
        this.issues = new ArrayList<>();
    }

    public void addIssue(Issue issue) {
        this.issues.add(issue);
        this.issueIds.add(issue.getId());
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTeamId() {
        return this.teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public List<Issue> getIssues() {
        return this.issues;
    }

    public void setIssues(List<Issue> issues) {
        this.issues = issues;
    }

    public List<String> getIssueIds() {
        return this.issueIds;
    }

    public void setIssueIds(List<String> issueIds) {
        this.issueIds = issueIds;
    }

}
