import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CommentService {
  
  private host = environment.apiUrl;
  getAllCommentsByMovieIdURL: string;

  constructor(private http: HttpClient) {
    this.getAllCommentsByMovieIdURL = `${this.host}/comment/movie/`;
  }

  getAllCommentsByMovieId(movieId: String): Observable<Comment[]> {

    var URL = this.getAllCommentsByMovieIdURL + movieId;
    return this.http.get<Comment[]>(URL);
  }
}
