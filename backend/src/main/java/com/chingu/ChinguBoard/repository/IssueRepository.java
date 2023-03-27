package com.chingu.ChinguBoard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chingu.ChinguBoard.model.Issue;

public interface IssueRepository extends MongoRepository<Issue, String> {
    
}
