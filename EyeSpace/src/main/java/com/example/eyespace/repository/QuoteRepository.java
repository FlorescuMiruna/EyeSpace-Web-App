package com.example.eyespace.repository;

import com.example.eyespace.model.Comment;
import com.example.eyespace.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote,Long> {

    List<Quote> findByUserId(Long userId);
}
