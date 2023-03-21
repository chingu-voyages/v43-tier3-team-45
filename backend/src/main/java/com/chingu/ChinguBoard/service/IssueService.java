package com.chingu.ChinguBoard.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.repository.IssueRepository;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public Issue getIssue(String id) {
        return issueRepository.findById(id).orElseThrow();
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }
    
}
