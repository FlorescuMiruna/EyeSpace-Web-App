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
  movieIdImdb : string;
  assignMovieToUserURL: string;
  deleteUserFromMovieURL: string;

  constructor(private http: HttpClient) { 
    this.addMovieURL = 'http://localhost:8026/movie/user/';
    this.getMovieURL = 'http://localhost:8026/movie';
    this.updateMovieURL = 'http://localhost:8026/movie';
    this.deleteMovieURL = 'http://localhost:8026/movie';
    this.assignMovieToUserURL = 'http://localhost:8026/user/';
    this.searchURL = 'http://localhost:8026/movie/API/search/';
    this.getAPIMovieURL = 'http://localhost:8026/movie/API/';

    this.deleteUserFromMovieURL = `${this.host}/movie/remove/`;

    this.movieIdImdb = 'default';
  }

  setMovieIdImdb(idIMDB: string){
    this.movieIdImdb = idIMDB;

  }

  getMovieIdImdb(){
    return this.movieIdImdb;
  }
  
  addMovie(movie : Movie,id: number): Observable<Movie> {
    var URL = "";
    URL = this.addMovieURL + id.toString();
    console.log("URL:", URL);
    return this.http.post<Movie>(URL,movie);
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
  // deleteUserFromMovie(movieId:string,userId:number): void{
  //   this.http.post('/api?data=' + id, null).map(
  //     (response: any) => {
  //       return response;
  //     }
  //   )
  // }
  public deleteUserFromMovie(movieId:string,userId:number): Observable<any> {
    return this.http.put<any>(this.deleteUserFromMovieURL + movieId + '/user/' + userId.toString(), null);
  }

 

  getAllSearchMovies(TITLE: String): Observable<MovieSearchDetails[]>{
    var URL = "";

    URL = this.searchURL + TITLE;

    // console.log("Filmele:", this.http.get<MovieSearch[]>(this.searchURL))
    return this.http.get<MovieSearchDetails[]>(URL);

  }

  getAPIMovie(idImdb: String): Observable<Movie>{
    var URL = "";

    URL = this.getAPIMovieURL +idImdb ;

    return this.http.get<Movie>(URL);

  }



}
