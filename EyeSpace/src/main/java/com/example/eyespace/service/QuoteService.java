package com.example.eyespace.service;


import com.example.eyespace.exception.domain.NotFoundException;
import com.example.eyespace.model.Comment;
import com.example.eyespace.model.Movie;
import com.example.eyespace.model.Quote;
import com.example.eyespace.model.User;
import com.example.eyespace.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class QuoteService {

    private  final QuoteRepository quoteRepository;
    private final UserService userService;
    private  final  MovieService movieService;


    @Autowired
    public QuoteService(QuoteRepository quoteRepository, UserService userService, MovieService movieService) {
        this.quoteRepository = quoteRepository;
        this.userService = userService;
        this.movieService = movieService;
    }

    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    public Quote addQuote(Quote quote, String movieId, Long userId) {



        Movie movie = movieService.getMovieById(movieId);
        User user = userService.findUserById(userId);

        quote.setMovie(movie);
        quote.setUser(user);

        quoteRepository.save(quote);

        return quote;
    }

    public void deleteQuote(Long id){
        Optional<Quote> quoteOptional = quoteRepository.findById(id);

        if(quoteOptional.isPresent()){
            quoteRepository.delete(quoteOptional.get());
        }else {
            throw new NotFoundException("Quote not found!", "quote.not.found");
        }
    }


    public Quote updateQuote(Long id, Quote quoteUpdated){
        System.out.println("quoteUpdated" + quoteUpdated.toString());
        Optional<Quote> quoteOptional = quoteRepository.findById(id);
        if(quoteOptional.isPresent()){
            quoteUpdated.setId(id);
            quoteUpdated.setMovie(quoteOptional.get().getMovie());
            quoteUpdated.setUser(quoteOptional.get().getUser());


            quoteUpdated.setText(quoteUpdated.getText() == null ? quoteOptional.get().getText() : quoteUpdated.getText());
            quoteUpdated.setPerson(quoteUpdated.getPerson() == null ? quoteOptional.get().getPerson() : quoteUpdated.getPerson());
            quoteUpdated.setTheme(quoteUpdated.getTheme() == null ? quoteOptional.get().getTheme() : quoteUpdated.getTheme());

            return quoteRepository.save(quoteUpdated);
        }else {
            throw new NotFoundException("Quote not found!", "quote.not.found");
        }

    }

    public List<Quote> getAllQuotesByUserId(Long userId) {
        return quoteRepository.findByUserId(userId);
    }
}
