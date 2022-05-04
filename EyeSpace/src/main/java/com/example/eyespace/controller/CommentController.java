package com.example.eyespace.controller;

import com.example.eyespace.model.Comment;
import com.example.eyespace.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("")
    public List<Comment> getAllComments(){
        return commentService.getAllComments();
    }

    @PostMapping("/movie/{movieId}/user/{userId}")
    public Comment addComment(@RequestBody Comment comment, @PathVariable String movieId, @PathVariable  Long userId){
        commentService.addComment(comment,movieId,userId);
        return comment;
    }

    @PostMapping("/movie")
    public Comment addCommentTest(@RequestBody Comment comment){
        commentService.addComment2(comment);
        return comment;
    }


}
