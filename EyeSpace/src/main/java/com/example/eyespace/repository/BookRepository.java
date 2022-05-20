package com.example.eyespace.repository;

import com.example.eyespace.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,String> {
}