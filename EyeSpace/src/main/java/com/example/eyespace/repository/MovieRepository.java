package com.example.eyespace.repository;

import com.example.eyespace.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie,Integer> {
    Movie getByTitle(String title);

    Movie findByTitle(String title);


}