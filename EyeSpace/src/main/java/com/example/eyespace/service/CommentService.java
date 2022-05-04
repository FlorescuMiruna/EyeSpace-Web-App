package com.example.eyespace.service;


import com.example.eyespace.exception.domain.NotFoundException;
import com.example.eyespace.model.Comment;
import com.example.eyespace.model.Movie;
import com.example.eyespace.model.User;
import com.example.eyespace.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    private  final  MovieService movieService;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserService userService, MovieService movieService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.movieService = movieService;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment addComment(Comment comment, String movieId, Long userId) {

        comment.setDate(LocalDate.now());

        Movie movie = movieService.getMovieById(movieId);
        User user = userService.findUserById(userId);

        comment.setMovie(movie);
        comment.setUser(user);

        commentRepository.save(comment);

        return comment;
    }

    public Comment getComment(Long id) {
        Optional<Comment> optionalSubject = commentRepository.findById(id);
        return optionalSubject.orElseThrow(() -> new NotFoundException("Comment not found!", "comment.not.found"));
    }

    public void deletComment(Long id){
        Optional<Comment> commentOptional = commentRepository.findById(id);

        if(commentOptional.isPresent()){
            commentRepository.delete(commentOptional.get());
        }else {
            throw new NotFoundException("Comment not found!", "comment.not.found");
        }
    }


    public Comment updateComment(Long id, Comment commentUpdated){
        Optional<Comment> commentOptional = commentRepository.findById(id);
        if(commentOptional.isPresent()){
            commentUpdated.setId(id);
            commentUpdated.setMovie(commentOptional.get().getMovie());
           commentUpdated.setUser(commentOptional.get().getUser());
            commentUpdated.setText(commentUpdated.getText() == null ? commentOptional.get().getText() : commentUpdated.getText());
            commentUpdated.setDate(commentUpdated.getDate() == null ? commentOptional.get().getDate() : commentUpdated.getDate());


            return commentRepository.save(commentUpdated);
        }else {
            throw new NotFoundException("Comment not found!", "comment.not.found");
        }

    }


}
