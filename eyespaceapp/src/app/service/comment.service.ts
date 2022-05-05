import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comm } from '../model/comm';
import { MovieSearchDetails } from '../model/movie-search-details';

@Injectable({
  providedIn: 'root'
})


export class CommentService {
  
  private host = environment.apiUrl;
  getAllCommentsByMovieIdURL: string;
  addCommentURL: string;

  constructor(private http: HttpClient) {
    this.getAllCommentsByMovieIdURL = `${this.host}/comment/movie/`;
    this.addCommentURL = `${this.host}/comment/movie/`
  }

  getAllCommentsByMovieId(movieId: String): Observable<Comm[]> {

    var URL = this.getAllCommentsByMovieIdURL + movieId;
    return this.http.get<Comm[]>(URL);
  }

  addComment(comm : Comm, movieId : string, userId: number ): Observable<Comm> {
    var URL = this.getAllCommentsByMovieIdURL + movieId + '/user/' + userId;
    console.log("URL:",URL);
    return this.http.post<Comm>(URL,comm);
  }



}
