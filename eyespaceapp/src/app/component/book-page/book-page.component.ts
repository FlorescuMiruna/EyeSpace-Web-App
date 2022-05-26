import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BookService } from 'src/app/service/book.service';
import { RatingService } from 'src/app/service/rating.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  bookAPI: Book = new Book();
  constructor(private bookService: BookService, private authenticationService: AuthenticationService, private userService: UserService,  private formBuilder: FormBuilder, private ratingService: RatingService , private router: Router) { }

  ngOnInit(): void {
    this.initializeBook();
  }

  initializeBook() {

    this.refreshUserFromLocalChash(this.authenticationService.getUserFromLocalCache().id);
    // var idIMDB  = this.movieService.getMovieIdImdb();
    var idIMDB = '';
    var temp = localStorage.getItem('bookId');
    if (temp !== null) {
      var idIMDB = temp;
    }



    this.bookService.getAPIBook(idIMDB).subscribe(res => {

      this.bookAPI = res;
     

      // console.log("Exista?",this.checkPosterExists(this.movieAPI.posterUrl));
       console.log("BOOK:",this.bookAPI);

      // console.log("favorites:", this.user.favorites)
      // this.checkWatched();
      // this.checkInWatchList();
      // this.checkFavorite();
      // this.initializeComments();
      // this.initializeRating();

    }, err => {

      console.log("Error while fetching data");
      console.log(err);
    });


  }

  refreshUserFromLocalChash(id: number) {

    this.userService.getUserById(id).subscribe(res => {

      this.authenticationService.addUserToLocalCache(res);


    }, err => {
      console.log("Error while fetching data.")
    });
  }

  goToProfile(){
    this.router.navigate(['/user/management']);
    localStorage.setItem('page', 'Profile');
  }

  goToUsers(){
    this.router.navigate(['/user/management']);
    localStorage.setItem('page', 'Users');
  }

  goToSettings(){
    this.router.navigate(['/user/management']);
    localStorage.setItem('page', 'Settings');
  }

}
