package com.example.eyespace.repository;

import com.example.eyespace.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;


public interface CommentRepository extends JpaRepository<Comment,Integer> {
}
