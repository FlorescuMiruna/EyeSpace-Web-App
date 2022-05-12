package com.example.eyespace.repository;

import com.example.eyespace.model.Movie;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface MovieRepository extends JpaRepository<Movie,Integer> {
    Movie getByTitle(String title);

    Movie findByTitle(String title);

    Movie findById(String id);

    ArrayList<Movie> findByIsPopular(Boolean isPopular, Sort rankk);


}