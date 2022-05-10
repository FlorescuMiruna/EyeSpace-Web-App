package com.example.eyespace.service;

import com.example.eyespace.model.Comment;
import com.example.eyespace.model.Movie;
import com.example.eyespace.model.Rating;
import com.example.eyespace.model.User;
import com.example.eyespace.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final MovieService movieService;
    private final UserService userService;

    @Autowired
    public RatingService(RatingRepository ratingRepository, MovieService movieService, UserService userService) {
        this.ratingRepository = ratingRepository;
        this.movieService = movieService;
        this.userService = userService;
    }

    public List<Rating> getAllRatings(){
        return ratingRepository.findAll();

    }

    public Rating addRating(Rating rating, String movieId, Long userId) {



        Movie movie = movieService.getMovieById(movieId);
        User user = userService.findUserById(userId);

        rating.setMovie(movie);
        rating.setUser(user);


        ratingRepository.save(rating);

        return rating;
    }
}
