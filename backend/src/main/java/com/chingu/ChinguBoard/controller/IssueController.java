package com.chingu.ChinguBoard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chingu.ChinguBoard.dto.IssueDTO;
import com.chingu.ChinguBoard.mapper.IssueDTOMapper;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.service.IssueService;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    private final IssueDTOMapper issueDTOMapper;

    public IssueController(IssueService issueService, IssueDTOMapper issueDTOMapper) {
        this.issueService = issueService;
        this.issueDTOMapper = issueDTOMapper;
    }

    // TODO: change to DTO
    @PostMapping()
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
        Issue savedIssue = issueService.createIssue(issue);
        return ResponseEntity.ok(savedIssue);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDTO> getIssue(@PathVariable String id) {
        Issue issue = issueService.getIssue(id);
        return ResponseEntity.ok(issueDTOMapper.toDTO(issue));
    }
}
