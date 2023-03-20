package com.chingu.ChinguBoard.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chingu.ChinguBoard.model.Issue;

public interface IssueRepository extends MongoRepository<Issue, String> {
    
}
