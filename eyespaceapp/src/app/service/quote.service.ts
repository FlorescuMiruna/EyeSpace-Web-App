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
  constructor(private http :HttpClient) { 
    this.getAllQuotesByUserIdURL = `${this.host}/quote/user/`;
  }

  getAllQuotesByUserId(userId: number): Observable<Quote[]> {

    var URL = this.getAllQuotesByUserIdURL + userId;
    return this.http.get<Quote[]>(URL);
  }
}
