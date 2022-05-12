package com.example.eyespace.service;

import com.example.eyespace.exception.domain.NotFoundException;
import com.example.eyespace.model.Comment;
import com.example.eyespace.model.Movie;
import com.example.eyespace.model.Rating;
import com.example.eyespace.model.User;
import com.example.eyespace.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();

    }

    public Rating getRating(Long id) {
        Optional<Rating> optionalRating = ratingRepository.findById(id);
        return optionalRating.orElseThrow(() -> new NotFoundException("Rating not found!", "rating.not.found"));
    }
    public List<Rating> getAllRatingsByMovieId(String movieId) {
        return ratingRepository.findByMovieId(movieId);
    }



    public Rating addRating(Rating rating, String movieId, Long userId) {


        List<Rating> ratings = getAllRatings();

        /***
         * Daca am deja un Rating dat de acest user la acest film, nu vreau sa mai adaug un rating nou,
         * ci sa ii modific valoarea Ratingului deja existent.
         */
        for (Rating rating1 : ratings) {

            if (rating1.getUser().getId() == userId && rating1.getMovie().getId().equals(movieId)) {
                rating.setId(rating1.getId());
                break;
            }
        }

        Movie movie = movieService.getMovieById(movieId);
        User user = userService.findUserById(userId);
        rating.setMovie(movie);
        rating.setUser(user);


        return ratingRepository.save(rating);

    }

//    public Rating getRatingByUserAndMovie(String movieId, Long userId) {
//        List<Rating> ratings = ratingRepository.findByMovieId(movieId);
//          ratings = ratings.stream()
//                .filter(c -> c.getUser().getId() == userId)
//                .collect(Collectors.toList());
//
//        System.out.println("ratings:" + ratings.get(0));
//        return  ratings.get(ratings.size()-1);
//
//
//
//    }
}
