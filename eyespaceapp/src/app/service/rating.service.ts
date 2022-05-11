import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rating } from '../model/rating';

@Injectable({
  providedIn: 'root'
})


export class RatingService {

  private host = environment.apiUrl;
  addRatingURL:string;

  constructor(private http: HttpClient) { 
    this.addRatingURL = `${this.host}/rating/movie/`;
  }

  addRating(rating : Rating, movieId : string, userId: number ): Observable<Rating> {
    var URL = this.addRatingURL + movieId + '/user/' + userId;
    console.log(URL);
    return this.http.post<Rating>(URL,rating);
  }
}
