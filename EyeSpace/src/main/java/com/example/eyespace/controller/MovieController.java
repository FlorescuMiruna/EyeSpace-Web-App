package com.example.eyespace.controller;

import com.example.eyespace.model.Movie;
import com.example.eyespace.model.MovieSearchDetails;
import com.example.eyespace.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
        System.out.println("************* removeMovieFromUser ************");
        movieService.removeMovieFromUser(movieId,userId);

    }

    @PutMapping("/remove/watch-list/{movieId}/user/{userId}")
    public void removeWatchListMovieFromUser(@PathVariable String movieId,@PathVariable Long userId){
        System.out.println("************* removeWatchListMovieFromUser ************");

        movieService.removeWatchListMovieFromUser(movieId,userId);

    }

    @PostMapping("/all")
    public List<Movie> addAllMovies(@RequestBody List<Movie> movies) {
        return movieService.addAllMovies(movies);
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

    @GetMapping("/hello")
    public String hello() throws IOException, InterruptedException {
        return "Hello from my spring boot app";
    }

    @GetMapping("/API/search/{title}")
    public ArrayList<MovieSearchDetails> searchMovieApiIMDB(@PathVariable String title) throws IOException, InterruptedException {

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
//    @PutMapping("")
//    public Movie updateMovie(@RequestBody Movie movie) {
//        return movieService.updateMovie(movie);
//    }



}