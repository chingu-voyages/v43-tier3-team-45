package com.chingu.ChinguBoard.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chingu.ChinguBoard.model.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {
    
}
