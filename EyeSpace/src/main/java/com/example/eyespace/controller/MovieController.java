package com.example.eyespace.controller;

import com.example.eyespace.model.Movie;
import com.example.eyespace.model.MovieSearchDetails;
import com.example.eyespace.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/movie")
//@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {


    MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/watched/user/{userId}")
    public Movie addMovie(@RequestBody Movie movie,@PathVariable Long userId){

         movieService.addMovie(movie,userId);
         return movie;
    }

    @PostMapping("/watch-list/user/{userId}")
    public Movie addMovieToWatchList(@RequestBody Movie movie,@PathVariable Long userId){

        movieService.addMovieToWatchList(movie,userId);
        return movie;
    }
    @PutMapping("/remove/{movieId}/user/{userId}")
    public void removeMovieFromUser(@PathVariable String movieId,@PathVariable Long userId){

        movieService.removeMovieFromUser(movieId,userId);

    }

    @PutMapping("/remove/watch-list/{movieId}/user/{userId}")
    public void removeWatchListMovieFromUser(@PathVariable String movieId,@PathVariable Long userId){


        movieService.removeWatchListMovieFromUser(movieId,userId);

    }

    @PutMapping("/remove-favorite/{movieId}/user/{userId}")
    public void removeMovieFromFavorites(@PathVariable String movieId,@PathVariable Long userId){

        movieService.removeMovieFromFavorites(movieId,userId);

    }





    @GetMapping("/title/{name}")
    public  Movie getMovieByName(@PathVariable String name) {
        return  movieService.getMovieByTitle(name);
    }




    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable String id){
        return movieService.getMovieById(id);
    }

    @GetMapping("")
    public List<Movie> getAllMovies(){
        return movieService.getAllMovies();
    }



    @GetMapping("/API/search/{title}")



    public ArrayList<MovieSearchDetails> searchMovieApiIMDB(@PathVariable String title) throws IOException, InterruptedException {
//[a-zA-Z0-9_ ]*
        return movieService.searchMovieApiIMDB(title);
    }


    @GetMapping("/API/{id}")
    public  Movie getMovieByIdApiIMDB( @PathVariable String id) throws IOException, InterruptedException {
        return movieService.getMovieByIdApiIMDB(id);
    }





    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable String id){
         movieService.deleteMovie(id);

    }

    @PostMapping("/favorite/user/{userId}")
    public Movie addMovieToFavorites(@RequestBody Movie movie, @PathVariable Long userId){
        movieService.addMovieToFavorites(movie,userId);
        return movie;
    }

//    @PutMapping("/{id}/remove-favorite/user/{userId}")
//    public void removeMovieFromFavorites(@PathVariable String id, @PathVariable Long userId){
//        movieService.removeMovieFromFavorites(id,userId);
//    }



//    @PutMapping("")
//    public Movie updateMovie(@RequestBody Movie movie) {
//        return movieService.updateMovie(movie);
//    }



}