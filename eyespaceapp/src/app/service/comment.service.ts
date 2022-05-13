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
  deleteCommentURL: string;

  updateCommURL: string;
  likeCommURL : string;
  unlikeCommURL: string;

  constructor(private http: HttpClient) {
    this.getAllCommentsByMovieIdURL = `${this.host}/comment/movie/`;
    this.addCommentURL = `${this.host}/comment/movie/`;
    this.deleteCommentURL = `${this.host}/comment/`;
    this.likeCommURL =  `${this.host}/comment/`;
    this.unlikeCommURL =  `${this.host}/comment/`;
    this.updateCommURL = `${this.host}/comment/`;


  }

  getAllCommentsByMovieId(movieId: String): Observable<Comm[]> {

    var URL = this.getAllCommentsByMovieIdURL + movieId;
    return this.http.get<Comm[]>(URL);
  }

  addComment(comm : Comm, movieId : string, userId: number ): Observable<Comm> {
    var URL = this.getAllCommentsByMovieIdURL + movieId + '/user/' + userId;
    return this.http.post<Comm>(URL,comm);
  }

  deleteComment(comm: Comm): Observable<Comm> {
    return this.http.delete<Comm>(this.deleteCommentURL +comm.id);
  }

  likeComm(comm: Comm, userId: number): Observable<Comm>{
    var URL = this.likeCommURL + comm.id + '/like/' + userId;
    // console.log(URL);
    return this.http.put<Comm>(URL, comm);

  }

  unlikeComm(comm: Comm, userId: number): Observable<Comm>{
    var URL = this.likeCommURL + comm.id + '/unlike/' + userId;
    // console.log(URL);
    return this.http.put<Comm>(URL, comm);

  }

  updateComm(comm : Comm): Observable<Comm>{
    return this.http.put<Comm>(this.updateCommURL + comm.id, comm);

  }



}
