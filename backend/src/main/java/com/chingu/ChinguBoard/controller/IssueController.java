package com.chingu.ChinguBoard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chingu.ChinguBoard.dto.IssueDTO;
import com.chingu.ChinguBoard.dto.IssueListDTO;
import com.chingu.ChinguBoard.mapper.IssueDTOMapper;
import com.chingu.ChinguBoard.mapper.IssueListDTOMapper;
import com.chingu.ChinguBoard.model.Issue;
import com.chingu.ChinguBoard.service.IssueService;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;

    private final IssueDTOMapper issueDTOMapper;

    private final IssueListDTOMapper issueListDTOMapper;

    public IssueController(IssueService issueService, IssueDTOMapper issueDTOMapper, IssueListDTOMapper issueListDTOMapper) {
        this.issueService = issueService;
        this.issueDTOMapper = issueDTOMapper;
        this.issueListDTOMapper = issueListDTOMapper;
    }

    @PostMapping("/create")
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueDTO issueDTO, @RequestParam String projectId) {
        Issue issue = issueDTOMapper.toEntity(issueDTO);
        Issue savedIssue = issueService.createIssue(issue, projectId);
        return ResponseEntity.ok(issueDTOMapper.toDTO(savedIssue));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDTO> getIssue(@PathVariable String id) {
        Issue issue = issueService.getIssue(id);
        return ResponseEntity.ok(issueDTOMapper.toDTO(issue));
    }

    /**
     * Client would send the changes to an issue all at once when user closes the issue modal so no need to send back IssueDTO,
     * will instead send back IssueListDTO for updating UI for the board
     */
    @PatchMapping("/{id}")
    public ResponseEntity<IssueListDTO> updateIssue(@RequestBody IssueDTO issueDTO, @PathVariable String id) {
        Issue issue = issueDTOMapper.toEntity(issueDTO);
        Issue updatedIssue = issueService.updateIssue(issue);
        return ResponseEntity.ok(issueListDTOMapper.toDTO(updatedIssue));
    }
}
