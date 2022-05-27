
import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/model/quote';


import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { QuoteService } from 'src/app/service/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

   user: User = this.authenticationService.getUserFromLocalCache();
   quotes: Quote[] = [];

  constructor(private authenticationService: AuthenticationService,private quoteService: QuoteService) { }

  ngOnInit(): void {

    this.initializeQuotes();
  }

  initializeQuotes() {
    this.quoteService.getAllQuotesByUserId(this.user.id).subscribe(res => {


      this.quotes = res;
      console.log(res);
      console.log(this.quotes[0].movie.posterUrl)

      // this.quotes[] = res[0];

      /**Iau din lista doar comentariile carora le-am dat like*/


    }, err => {
      console.log("Error while fetching data")
      console.log(err);
    });

  }

}
