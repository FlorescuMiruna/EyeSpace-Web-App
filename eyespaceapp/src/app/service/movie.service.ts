import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { MovieSearchDetails } from '../model/movie-search-details';

@Injectable({
  providedIn: 'root'
})
export class MovieService {



  addMovieURL: string;
  getMovieURL: string;
  updateMovieURL: string;
  deleteMovieURL: string;
  searchURL: string;
  getAPIMovieURL: string;
  movieIdImdb : string;

  constructor(private http: HttpClient) { 
    this.addMovieURL = 'http://localhost:8026/movie';
    this.getMovieURL = 'http://localhost:8026/movie';
    this.updateMovieURL = 'http://localhost:8026/movie';
    this.deleteMovieURL = 'http://localhost:8026/movie';

    this.searchURL = 'http://localhost:8026/movie/API/search/';

    this.getAPIMovieURL = 'http://localhost:8026/movie/API/';

    this.movieIdImdb = 'default';

  }

  setMovieIdImdb(idIMDB: string){
    this.movieIdImdb = idIMDB;
  }

  getMovieIdImdb(){
    return this.movieIdImdb;
  }
  
  addMovie(movie : Movie): Observable<Movie> {
    return this.http.post<Movie>(this.addMovieURL,movie);
  }

  getAllMovies(): Observable<Movie[]>{
    console.log("movie originea",this.http.get<Movie[]>(this.getMovieURL) )
    return this.http.get<Movie[]>(this.getMovieURL);
  }
  updateMovie(movie :Movie) : Observable<Movie>{
    return this.http.put<Movie>(this.updateMovieURL, movie);
  }
  deleteMovie(movie : Movie) : Observable<Movie> {
    return this.http.delete<Movie>(this.deleteMovieURL+'/'+movie.id);
  }
 

  getAllSearchMovies(TITLE: String): Observable<MovieSearchDetails[]>{
    var URL = "";

    URL = this.searchURL + TITLE;

    // console.log("Filmulele:", this.http.get<MovieSearch[]>(this.searchURL))
    return this.http.get<MovieSearchDetails[]>(URL);

  }

  getAPIMovie(idImdb: String): Observable<Movie>{
    var URL = "";

    URL = this.getAPIMovieURL +idImdb ;

    return this.http.get<Movie>(URL);

  }

  /** GET hero by id. Will 404 if id not found */
  // public deleteEmployee(employeeId: number): Observable<void> {
  //   return this.http.delete<void>(`http://localhost:8090/movie/${employeeId}`);
  // }
  // getAllMovies(): Observable<Movie[]>{
  //   return this.http.get<Movie[]>(this.getMovieURL);
  // }


}
