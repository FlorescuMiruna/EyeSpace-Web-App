package com.example.eyespace.service;

import com.example.eyespace.exception.domain.NotFoundException;
import com.example.eyespace.model.Movie;
import com.example.eyespace.model.MovieSearchDetails;
import com.example.eyespace.model.User;
import com.example.eyespace.repository.MovieRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Value("${apiIMDBKey}")
    private String apiIMDBKey;

//    @Autowired
   private final MovieRepository movieRepository;


    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;

    }



    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    public Movie addMovie(Movie movie){

        return movieRepository.save(movie);

    }



    public List<Movie> addAllMovies(List<Movie> movies) {
        return  movieRepository.saveAll(movies);
    }

    public Movie getMovieById(int id){
//        return movieRepository.findById(id);
        Optional<Movie> movieOptional = movieRepository.findById(id);
        return movieOptional.orElseThrow(() -> new NotFoundException("Movie not found!", "movie.not.found"));
    }

    public Movie getMovieByTitle(String title){
        return movieRepository.findByTitle(title);
    }

    public boolean deleteMovieByID(int id) {
        Movie existingMovie = movieRepository.getById(id);
        if(existingMovie != null) {
            movieRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Movie updateMovie(Movie movie) {
        Movie existingMovie = movieRepository.findById(movie.getId()).orElse(null);
        System.out.println(movie);
        if(existingMovie == null) {
            System.out.println("Movie not found");
            return  movieRepository.save(movie);
        }else  {
            existingMovie.setTitle(movie.getTitle());
            existingMovie.setDirector(movie.getDirector());
            existingMovie.setRating(movie.getRating());
            movieRepository.save(existingMovie);
        }
        return movie;
    }

    public JSONObject MovieAPI() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb-data-searching.p.rapidapi.com/om?t=man%20of%20steel"))
                .header("x-rapidapi-host", "imdb-data-searching.p.rapidapi.com")
                .header("x-rapidapi-key", "91a92978f3msh9c72cd78b7b7ce7p159252jsnc2427ab6c01c")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        JSONObject jsonObject = null;

        try {
            jsonObject = new JSONObject(response.body());
        } catch (JSONException err) {
            System.out.println(err);
        }

        System.out.println(jsonObject);
        return jsonObject;
    }

    public ArrayList<MovieSearchDetails> searchMovieApiIMDB(String title) throws IOException, InterruptedException {

        ArrayList<MovieSearchDetails> movieSearchDetailsList = new ArrayList<MovieSearchDetails>();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb-api.com/API/SearchMovie/" + apiIMDBKey +"/" + title))
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
//        System.out.println(response.body());
//
//        System.out.println(response.body());
        JSONObject json = new JSONObject(response.body());

//        System.out.println("SEARCH: " + json.get("results").getClass());

        JSONArray array = (JSONArray) json.get("results");


        Integer dim = 3;
        if(array.length()<3){
            dim = array.length();
        }
        for(int i = 0; i < dim; i++)
        {
            JSONObject movieJson = array.getJSONObject(i);
//            System.out.println("MOVIE JSON" + movieJson);
            movieSearchDetailsList.add(jsonToMovieSearchDetails(movieJson));

        }

        System.out.println("Cheie" + apiIMDBKey);

//        System.out.println("LISTA" + movieSearchDetailsList);
//
//        JSONObject movieSearchDetailsJson = array.getJSONObject(0);
//        System.out.println("LOOK:" + movieSearchDetailsJson);
//        MovieSearchDetails movieSearchDetails = jsonToMovieSearchDetails(movieSearchDetailsJson);
        return movieSearchDetailsList;
    }

    public Movie getMovieByIdApiIMDB(String id) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb-api.com/en/API/Title/" + apiIMDBKey + "/" + id))
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        JSONObject json = new JSONObject(response.body());

        System.out.println(json);
        System.out.println(json.get("genres"));
        System.out.println(json.get("genres").getClass());
        System.out.println(json.get("id"));
        System.out.println(json.getClass());


//        ObjectMapper mapper = new ObjectMapper();
//        Movie movie = mapper.readValue(response.body(), Movie.class);
//        System.out.println(movie.toString());

        Movie movie = jsonToMovie(json);
        System.out.println("Movie din getMovieByIdApiIMDB:" + movie.toString());
        return movie;


    }

    public MovieSearchDetails jsonToMovieSearchDetails(JSONObject jsonObject){
        MovieSearchDetails movieSearchDetails = new MovieSearchDetails();
        movieSearchDetails.setIdIMDB((String) jsonObject.get("id"));
        movieSearchDetails.setTitle((String) jsonObject.get("title"));
        movieSearchDetails.setYear((String) jsonObject.get("description"));
        movieSearchDetails.setPosterUrl((String) jsonObject.get("image"));

        System.out.println("el la inceput: " + movieSearchDetails.toString());
        return  movieSearchDetails;
    }

    public Movie jsonToMovie(JSONObject jsonObject){
        Movie movie = new Movie();
        movie.setIdIMDB((String) jsonObject.get("id"));
        movie.setTitle((String) jsonObject.get("title"));
        movie.setDirector((String) jsonObject.get("directors"));
        movie.setRating((String) jsonObject.get("imDbRating"));
        movie.setGenre((String) jsonObject.get("genres"));
        movie.setDate((String) jsonObject.get("releaseDate"));
        movie.setPlot((String) jsonObject.get("plot"));
        movie.setPosterUrl((String) jsonObject.get("image"));
        System.out.println();
        System.out.println("Movie din jsonToMovie:" + movie.toString());
        return movie;
    }





}