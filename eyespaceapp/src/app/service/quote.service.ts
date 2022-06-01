import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quote } from '../model/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
    
  private host = environment.apiUrl;

  getAllQuotesByUserIdURL : string = '';
  addQuoteURL: string;
  deleteQuoteURL: string;
  updateQuoteURL: string;

  constructor(private http :HttpClient) { 
    this.getAllQuotesByUserIdURL = `${this.host}/quote/user/`;
    this.addQuoteURL = `${this.host}/quote/movie/`;
    this.deleteQuoteURL = `${this.host}/quote/`;
    this.updateQuoteURL = `${this.host}/quote/`;
  }

  getAllQuotesByUserId(userId: number): Observable<Quote[]> {

    var URL = this.getAllQuotesByUserIdURL + userId;
    return this.http.get<Quote[]>(URL);
  }

  addQuote(quote : Quote, movieId : string, userId: number ): Observable<Quote> {
    var URL = this.addQuoteURL + movieId + '/user/' + userId;
    console.log(URL);
    return this.http.post<Quote>(URL,quote);
  }
  deleteQuote(quote: Quote): Observable<Quote> {
    return this.http.delete<Quote>(this.deleteQuoteURL +quote.id);
  }

  updateQuote(quote : Quote): Observable<Quote>{
    return this.http.put<Quote>(this.updateQuoteURL + quote.id, quote);

  }
}
