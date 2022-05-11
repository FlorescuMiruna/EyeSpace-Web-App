package com.example.eyespace.repository;


import com.example.eyespace.model.Comment;
import com.example.eyespace.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByMovieId(String movieId);
}
