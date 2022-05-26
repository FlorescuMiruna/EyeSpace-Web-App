import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../model/book';
import { BookSearchDetails } from '../model/book-search-details';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  searchURL: string;
  getAPIBookURL: string;
  private host = environment.apiUrl;
  
  constructor(private http: HttpClient) { 
    this.searchURL = `${this.host}/book/API/search/`;
    this.getAPIBookURL = `${this.host}/book/API/`;
  }

  getAllSearchBooks(TITLE: String): Observable<BookSearchDetails[]> {
    var URL = "";
    // TITLE = TITLE.replace(/\s/g, "");

    URL = this.searchURL + TITLE;

    return this.http.get<BookSearchDetails[]>(URL);

  }

  
  getAPIBook(idImdb: String): Observable<Book> {
    var URL = "";

    URL = this.getAPIBookURL + idImdb;

    return this.http.get<Book>(URL);

  }
}
