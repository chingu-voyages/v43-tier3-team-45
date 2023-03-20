package com.chingu.ChinguBoard.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chingu.ChinguBoard.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    
    public Optional<User> findByEmail(String email);
    
}
