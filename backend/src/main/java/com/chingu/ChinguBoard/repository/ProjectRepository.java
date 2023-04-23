package com.chingu.ChinguBoard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chingu.ChinguBoard.model.Project;

public interface ProjectRepository extends MongoRepository<Project, String> {
    
}
