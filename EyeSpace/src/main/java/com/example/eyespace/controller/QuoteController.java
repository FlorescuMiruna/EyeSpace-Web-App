package com.example.eyespace.controller;

import com.example.eyespace.model.Comment;
import com.example.eyespace.model.Quote;
import com.example.eyespace.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quote")
public class QuoteController {

    private final QuoteService quoteService;

    @Autowired
    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @GetMapping("")
    public List<Quote> getAllQuotes(){
        return quoteService.getAllQuotes();
    }

    @PostMapping("/movie/{movieId}/user/{userId}")
    public Quote addQuote(@RequestBody Quote quote, @PathVariable String movieId, @PathVariable  Long userId){
        quoteService.addQuote(quote,movieId,userId);
        return quote;
    }

    @DeleteMapping("/{id}")
    public void deleteQuote(@PathVariable Long id){
        quoteService.deleteQuote(id);
    }

    @PutMapping("/{id}")
    public Quote updateQuote(@PathVariable Long id, @RequestBody Quote quote) {

        quote = quoteService.updateQuote(id, quote);
        return quote;
    }


    @GetMapping("/user/{userId}")
    public List<Quote> getAllQuotesByUserId(@PathVariable Long userId){
        return quoteService.getAllQuotesByUserId(userId);
    }
}
