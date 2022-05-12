import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response';
import { Movie } from '../model/movie';
import { MovieSearchDetails } from '../model/movie-search-details';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private host = environment.apiUrl;


  addMovieURL: string;
  getMovieURL: string;
  updateMovieURL: string;
  deleteMovieURL: string;
  searchURL: string;
  getAPIMovieURL: string;
  movieIdImdb: string;
  assignMovieToUserURL: string;
  removeMovieFromUserURL: string;
  addMovieToWatchListURL: string;
  removeWatchListMovieFromUserURL: string;
  addMovieToFavoritesURL: string;
  removeMovieFromFavoritesURL:string;

  constructor(private http: HttpClient) {
    this.addMovieURL = `${this.host}/movie/watched/user/`;
    this.addMovieToWatchListURL = `${this.host}/movie/watch-list/user/`;

    this.getMovieURL = `${this.host}/movie`;
    this.updateMovieURL = `${this.host}/movie`;
    this.deleteMovieURL = `${this.host}/movie`;
    this.assignMovieToUserURL = `${this.host}/user/`;
    this.searchURL = `${this.host}/movie/API/search/`;
    this.getAPIMovieURL = `${this.host}/movie/API/`;

    this.removeMovieFromUserURL = `${this.host}/movie/remove/`;
    this.removeWatchListMovieFromUserURL = `${this.host}/movie/remove/watch-list/`;

    this.addMovieToFavoritesURL =`${this.host}/movie/favorite/user/`
    this.removeMovieFromFavoritesURL =`${this.host}/movie/remove-favorite/`

    this.movieIdImdb = 'default';
  }

  setMovieIdImdb(idIMDB: string) {
    this.movieIdImdb = idIMDB;

  }

  getMovieIdImdb() {
    return this.movieIdImdb;
  }

  addMovie(movie: Movie, id: number): Observable<Movie> {
    var URL = "";
    URL = this.addMovieURL + id.toString();

    return this.http.post<Movie>(URL, movie);
  }

  addMovieToWatchList(movie: Movie, id: number): Observable<Movie> {
    var URL = "";
    URL = this.addMovieToWatchListURL + id.toString();

    return this.http.post<Movie>(URL, movie);
  }


  getAllMovies(): Observable<Movie[]> {
  
    return this.http.get<Movie[]>(this.getMovieURL);
  }
  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.updateMovieURL, movie);
  }
  deleteMovie(movie: Movie): Observable<Movie> {
    return this.http.delete<Movie>(this.deleteMovieURL + '/' + movie.id);
  }

  public removeMovieFromUser(movieId: string, userId: number): Observable<any> {
    return this.http.put<any>(this.removeMovieFromUserURL + movieId + '/user/' + userId.toString(), null);
  }

  removeWatchListMovieFromUser(movieId: string, userId: number):  Observable<any>{
    return this.http.put<any>(this.removeWatchListMovieFromUserURL + movieId + '/user/' + userId.toString(), null);

  }


  getAllSearchMovies(TITLE: String): Observable<MovieSearchDetails[]> {
    var URL = "";
    TITLE = TITLE.replace(/\s/g, "");

    URL = this.searchURL + TITLE;

    return this.http.get<MovieSearchDetails[]>(URL);

  }

  getAPIMovie(idImdb: String): Observable<Movie> {
    var URL = "";

    URL = this.getAPIMovieURL + idImdb;

    return this.http.get<Movie>(URL);

  }

  addMovieToFavorites(movie: Movie, id: number): Observable<Movie> {
    var URL = "";
    URL = this.addMovieToFavoritesURL + id.toString();
 

    return this.http.post<Movie>(URL, movie);
  }

  public removeMovieFromFavorites(movieId: string, userId: number): Observable<any> {

    var URL = this.removeMovieFromFavoritesURL + movieId + '/user/' + userId.toString();
    console.log("URL de remove",URL)
    return this.http.put<any>(URL, null);
  }






}
