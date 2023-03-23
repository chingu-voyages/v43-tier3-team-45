package com.chingu.ChinguBoard.mapper;

import org.springframework.stereotype.Service;

import com.chingu.ChinguBoard.dto.CommentDTO;
import com.chingu.ChinguBoard.model.Comment;

@Service
public class CommentDTOMapper {

    private final UserDTOMapper userDTOMapper;

    public CommentDTOMapper(UserDTOMapper userDTOMapper) {
        this.userDTOMapper = userDTOMapper;
    }

    public Comment toEntity(CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setId(commentDTO.id());
        comment.setText(commentDTO.text());
        comment.setCreatedAt(commentDTO.createdAt());
        comment.setCreatedById(commentDTO.createdBy().id());
        comment.setCreatedBy(userDTOMapper.toEntity(commentDTO.createdBy()));
        return comment;
    }

    public CommentDTO toDTO(Comment comment) {
        return new CommentDTO(comment.getId(),
                comment.getText(),
                comment.getCreatedAt(),
                userDTOMapper.toDTO(comment.getCreatedBy()));
    }

}
