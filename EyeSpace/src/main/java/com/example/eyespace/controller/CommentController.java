package com.example.eyespace.controller;

import com.example.eyespace.model.Comment;
import com.example.eyespace.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.Subject;
import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;
    private Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("")
    public List<Comment> getAllComments(){
        return commentService.getAllComments();
    }

    @GetMapping("/movie/{movieId}")
    public List<Comment> getAllCommentsByMovieId(@PathVariable String movieId){
        return commentService.getAllCommentsByMovieId(movieId);
    }

    @GetMapping("/{id}")
    public Comment getComment(@PathVariable("id") Long id) {
        Comment comment = commentService.getComment(id);
        return comment;
    }

    @PostMapping("/movie/{movieId}/user/{userId}")
    public Comment addComment(@RequestBody Comment comment,
                              @PathVariable String movieId,
                              @PathVariable  Long userId){
        commentService.addComment(comment,movieId,userId);
        return comment;
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id){


        commentService.deletComment(id);

    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment comment) {

        comment = commentService.updateComment(id, comment);

        logger.info("Updated comment {}", comment);
        return comment;
    }

    @PutMapping("/{id}/like/{userId}")
    public void likeComment(@PathVariable Long id, @PathVariable Long userId){
        commentService.likeComment(id,userId);
    }

    @PutMapping("/{id}/unlike/{userId}")
    public void unlikeComment(@PathVariable Long id, @PathVariable Long userId){
        commentService.unlikeComment(id,userId);
    }






}
