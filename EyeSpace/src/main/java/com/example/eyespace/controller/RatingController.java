package com.example.eyespace.controller;

import com.example.eyespace.model.Comment;
import com.example.eyespace.model.Rating;
import com.example.eyespace.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping("")
    public List<Rating> getAllRatings(){
        return ratingService.getAllRatings();
    }

    @GetMapping("/movie/{movieId}")
    public List<Rating> getAllRatingsByMovieId(@PathVariable String movieId){
        return ratingService.getAllRatingsByMovieId(movieId);
    }

    @GetMapping("/{id}")
    public Rating getRating(@PathVariable Long id){
        return ratingService.getRating(id);
    }

    @GetMapping("/movie/{movieId}/user/{userId}")
    public Rating getRatingByUserAndMovie( @PathVariable String movieId, @PathVariable  Long userId){
         return ratingService.getRatingByUserAndMovie(movieId,userId);
    }
    @PostMapping("/movie/{movieId}/user/{userId}")
    public Rating addRating(@RequestBody Rating rating, @PathVariable String movieId, @PathVariable  Long userId){
        ratingService.addRating(rating,movieId,userId);
        return rating;
    }
}
