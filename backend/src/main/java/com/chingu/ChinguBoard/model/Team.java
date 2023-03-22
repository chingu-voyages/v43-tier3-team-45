package com.chingu.ChinguBoard.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "teams")
public class Team {
    
    @Id
    private String id;

    private String name;

    @Transient
    private List<User> members;

    @Transient
    private List<Project> projects;

    private List<String> memberIds;

    private List<String> projectIds;

    public Team() {
        this.members = new ArrayList<>();
        this.projects = new ArrayList<>();
    }

    public Team(String name) {
        super();
        this.name = name;
    }

    public List<User> addMember(User user) {
        this.members.add(user);
        return this.members;
    }

    public void addProject(Project project) {
        this.projects.add(project);
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

    public List<User> getMembers() {
        return this.members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> project) {
        this.projects = project;
    }

    public List<String> getMemberIds() {
        return this.memberIds;
    }

    public void setMemberIds(List<String> memberIds) {
        this.memberIds = memberIds;
    }

    public List<String> getProjectIds() {
        return this.projectIds;
    }

    public void setProjectIds(List<String> projectIds) {
        this.projectIds = projectIds;
    }

}
