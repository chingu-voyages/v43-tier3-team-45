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

    /**
     * think it is best for Team to have a list of Project IDs instead of the actual object
     * example workflow:
     * when user first gets to the board, the client only gets list of all teams (GET request to `/api/teams`) and display all current teams (maybe add a field of List<String> teamNames to be able to display team names without calling teams API)
     * when user clicks on a team, client sends GET request to `/api/teans/{id}` to get the Team object, which would 
     */
    private List<Project> projects;

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
