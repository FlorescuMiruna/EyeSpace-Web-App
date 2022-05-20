package com.example.eyespace.controller;

import com.example.eyespace.model.Book;
import com.example.eyespace.model.BookSearchDetails;
import com.example.eyespace.model.Movie;
import com.example.eyespace.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("/book")
public class BookController {

    BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/API/search/{title}")
    public ArrayList<BookSearchDetails> searchBookApi(@PathVariable String title) throws IOException, InterruptedException {

        return bookService.searchBookApi(title);
    }
    @GetMapping("/API/{id}")
    public Book getMovieByIdApiIMDB(@PathVariable String id) throws IOException, InterruptedException {
        return bookService.getBookByIdApi(id);
    }


}

