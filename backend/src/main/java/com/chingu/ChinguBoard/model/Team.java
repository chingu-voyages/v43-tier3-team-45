package com.chingu.ChinguBoard.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "teams")
public class Team {
    
    @Id
    private String id;

    private String name;

    private List<User> members;

    private List<Project> projects;

    public Team() {
        this.members = new ArrayList<>();
        this.projects = new ArrayList<>();
    }

    public List<User> addMember(User user) {
        this.members.add(user);
        return this.members;
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

}
