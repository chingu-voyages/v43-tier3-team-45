package com.chingu.ChinguBoard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chingu.ChinguBoard.model.Team;

public interface TeamRepository extends MongoRepository<Team, String> {
    
}
