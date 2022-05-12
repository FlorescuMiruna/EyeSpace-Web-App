import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Comm } from 'src/app/model/comm';
import { Movie } from 'src/app/model/movie';
import { Rating } from 'src/app/model/rating';
import { User } from 'src/app/model/user';

import { AuthenticationService } from 'src/app/service/authentication.service';
import { CommentService } from 'src/app/service/comment.service';
import { MovieService } from 'src/app/service/movie.service';
import { RatingService } from 'src/app/service/rating.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  public form !: FormGroup;

  movieAPI: Movie = new Movie();
  isWatched: boolean = false;
  isInWatchList: boolean = false;
  isFavorite: boolean = false;
  text: string = '';
  comments: Comm[] = [];
  ratings: Rating[] = [];
  myRating: Rating = new Rating();


  myCommObj: Comm = new Comm();
  myRatingObj: Rating = new Rating();
  commDetails !: FormGroup;
  user: User = this.authenticationService.getUserFromLocalCache();
  likedComms: Comm[] = [];
  averageRating: number = 0;


  constructor(private movieService: MovieService, private authenticationService: AuthenticationService, private userService: UserService, private commentService: CommentService, private formBuilder: FormBuilder, private ratingService: RatingService) { }

  ngOnInit(): void {

    this.initializeMovie();

    this.commDetails = this.formBuilder.group({
      text: ['']
    });


    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
    })


  }
  rate() {


    if (this.form.value.rating !== "") {

      this.myRatingObj.ratingValue = this.form.value.rating;
      let userId = this.authenticationService.getUserFromLocalCache().id;

      this.ratingService.addRating(this.myRatingObj, this.movieAPI.id, userId).subscribe(res => {
        this.initializeRating();

      }, err => {
        console.log("EROARE");
        console.log(err);

      });
    }


  }
  addComm() {

    console.log("this.commDetails.value", this.commDetails.value);
    this.myCommObj.text = this.commDetails.value.text;

    let userId = this.authenticationService.getUserFromLocalCache().id;

    this.commentService.addComment(this.myCommObj, this.movieAPI.id, userId).subscribe(res => {
      // console.log("res", res);
      this.initializeComments();

    }, err => {
      console.log("EROARE");
      console.log(err);

    });
  }

  deleteComm(comm: Comm) {

    this.commentService.deleteComment(comm).subscribe(res => {
      this.initializeComments();
    }, err => {
      console.log("ERROR:", err);

    })
  }

  editComm(comm: Comm) {
    // this.commDetails.controls['id'].setValue(comm.id);
    // this.commDetails.controls['text'].setValue(comm.text);
    // this.commDetails.controls['likes'].setValue(comm.likes);
    // this.commDetails.controls['date'].setValue(comm.date);
    // this.commDetails.controls['movie'].setValue(comm.movie);
    // this.commDetails.controls['user'].setValue(comm.user);
    console.log("this.commDetails", this.commDetails.value)
  }

  updateComm() {
    //  console.log("here")
  }

  calculateClasses1() {
    if (this.isWatched === false)
      return 'btn btn-outline-success';
    else
      return 'btn btn-success';
  }


  calculateClasses2() {
    if (this.isInWatchList === false)
      return 'btn btn-outline-dark';
    else
      return 'btn btn-dark';
  }
  calculateFavoriteClass() {
    if (this.isFavorite === false)
      return 'fa fa-heart-o';
    else
      return 'fa fa-heart';
  }


  calculateLikeClass(comm: Comm) {
    if (this.likedComms.includes(comm))
      return 'fa fa-heart text-danger';
    else
      return 'fa fa-heart text';
  }

  /*Verific daca filmul este in lista user-ului de filme vazute*/
  checkWatched(): void {

    let found: boolean = false;
    let movies: Movie[] = this.authenticationService.getUserFromLocalCache().movies;

    for (let movie of movies) {
      if (movie.id == this.movieAPI.id) {
        found = true;
        this.isWatched = true;
        break;
      }
    }
    if (found == false)
      this.isWatched = false;
  }
  /*Verific daca filmul este in WATCH-list-ul userului*/
  checkInWatchList(): void {

    let found: boolean = false;
    let movies_watch_list: Movie[] = this.authenticationService.getUserFromLocalCache().movies_watch_list;

    for (let movie of movies_watch_list) {
      if (movie.id == this.movieAPI.id) {
        found = true;
        this.isInWatchList = true;
        break;
      }
    }
    if (found == false)
      this.isInWatchList = false;
  }

  checkFavorite(): void {

    let found: boolean = false;
    let movies: Movie[] = this.authenticationService.getUserFromLocalCache().favorites;

    for (let movie of movies) {
      if (movie.id == this.movieAPI.id) {
        found = true;
        this.isFavorite = true;
        break;
      }
    }
    if (found == false)
      this.isFavorite = false;
  }


  refreshUserFromLocalChash(id: number) {

    this.userService.getUserById(id).subscribe(res => {

      this.authenticationService.addUserToLocalCache(res);


    }, err => {
      console.log("Error while fetching data.")
    });
  }

  initializeMovie() {

    this.refreshUserFromLocalChash(this.authenticationService.getUserFromLocalCache().id);
    // var idIMDB  = this.movieService.getMovieIdImdb();
    var idIMDB = '';
    var temp = localStorage.getItem('movieIdImdb');
    if (temp !== null) {
      var idIMDB = temp;
    }



    this.movieService.getAPIMovie(idIMDB).subscribe(res => {

      this.movieAPI = res;
      console.log("favorites:", this.user.favorites)
      this.checkWatched();
      this.checkInWatchList();
      this.checkFavorite();
      this.initializeComments();
      this.initializeRating();

    }, err => {
      console.log("Error while fetching data")
    });


  }

  initializeRating() {

    this.ratingService.getAllRatingsByMovieId(this.movieAPI.id).subscribe(res => {

      this.ratings = res;
      /**
       * Verific daca am mai dat un rating acestui film si daca este in baza de date pentru a 
       * putea initializa form-ul
       */
      var temp = this.ratings.filter(rating => rating.user.id == this.user.id);
      this.myRating = temp[temp.length - 1];
      if (this.ratings.length > 0)
        this.averageRating = this.calculateAverageRating(this.ratings)

      if (this.myRating !== undefined) {
        this.form = this.formBuilder.group({
          rating: [this.myRating.ratingValue.toString(), Validators.required],
        })
      }



    }, err => {
      console.log("Error while fetching data")
      console.log(err);
    });



  }

  calculateAverageRating(ratings: Rating[]) {
    let average = 0;
    for (let rating of ratings) {
      average += rating.ratingValue;

    }
    console.log("type:", typeof (average / ratings.length))
    return Math.round(average * 100 / ratings.length) / 100;

  }

  initializeComments() {
    this.commentService.getAllCommentsByMovieId(this.movieAPI.id).subscribe(res => {


      this.comments = res;

      /**Iau din lista doar comentariile carora le-am dat like*/

      this.likedComms = this.comments.filter(val => val.likes.includes(this.user.id))



    }, err => {
      console.log("Error while fetching data")
      console.log(err);
    });

  }


  addMovie() {
    if (!this.isWatched) {
      var id = this.authenticationService.getUserFromLocalCache().id;
      this.movieService.addMovie(this.movieAPI, id).subscribe(res => {

        // console.log("Filmul a fost adaugat cu sucess:", res);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The movie was added to your list',
          showConfirmButton: false,
          timer: 1500
        })

        this.refreshUserFromLocalChash(this.authenticationService.getUserFromLocalCache().id);
        this.isWatched = true;
        console.log("ESTE VAZUT FILMUL?", this.isWatched);

      }, err => {
        console.log(err);

      });

    }
    else {
      Swal.fire({
        title: 'Do you want to remove the movie from your list?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#4E9A9B',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {


          let userId = this.authenticationService.getUserFromLocalCache().id;

          this.movieService.removeMovieFromUser(this.movieAPI.id, userId).subscribe(res => {


            Swal.fire(
              'The movie was removed!',
            )
            this.isWatched = false;

            //Atunci cand sterg filmul din lista il sterg si din lista favoritelor

            this.movieService.removeMovieFromFavorites(this.movieAPI.id, userId).subscribe(res => {


              this.isFavorite = false;

            }, err => {
              console.log(err)
              console.log("Error while fetching data")
            });


            this.refreshUserFromLocalChash(userId);





          }, err => {
            console.log(err)
            console.log("Error while fetching data")
          });

          this.refreshUserFromLocalChash(userId);


        }
      })
    }
  }

  addMovieToWatchList() {

    if (!this.isInWatchList) {
      var id = this.authenticationService.getUserFromLocalCache().id;
      this.movieService.addMovieToWatchList(this.movieAPI, id).subscribe(res => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The movie was added to your WATCH list',
          showConfirmButton: false,
          timer: 1500
        })


        this.refreshUserFromLocalChash(this.authenticationService.getUserFromLocalCache().id);
        this.isInWatchList = true;
        console.log("ESTE IN WATCH FILMUL?", this.isWatched);

      }, err => {
        console.log(err);

      });
    }
    else {
      Swal.fire({
        title: 'Do you want to remove the movie from your WATCH list?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#4E9A9B',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {


          let userId = this.authenticationService.getUserFromLocalCache().id;

          this.movieService.removeWatchListMovieFromUser(this.movieAPI.id, userId).subscribe(res => {

            console.log(res);
            Swal.fire(
              'The movie was removed!',
            )
            this.isInWatchList = false;

          }, err => {
            console.log(err)
            console.log("Error while fetching data")
          });


          this.refreshUserFromLocalChash(userId);

        }
      })
    }

  }

  likeComm(comm: Comm, userId: number) {

    if (!this.likedComms.includes(comm)) {
      this.commentService.likeComm(comm, userId).subscribe(res => {


        this.initializeComments();

      }, err => {
        console.log("ERROR:", err);

      })
    }
    else {
      this.commentService.unlikeComm(comm, userId).subscribe(res => {

        this.initializeComments();

      }, err => {
        console.log("ERROR:", err);

      })

    }



  }

  addMovieToFavorites(movie: Movie, userId: number) {

    if (!this.isFavorite) {
      this.movieService.addMovieToFavorites(movie, userId).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The movie was added to your FAVORITES',
          showConfirmButton: false,
          timer: 1500
        })


        this.refreshUserFromLocalChash(this.authenticationService.getUserFromLocalCache().id);
        this.isFavorite = true;
        console.log("ESTE VAZUT FILMUL?", this.isWatched);


      }, err => {
        console.log("ERROR:", err);

      })
    } else {
      Swal.fire({
        title: 'Do you want to remove the movie from FAVORITES?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#4E9A9B',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {


          let userId = this.authenticationService.getUserFromLocalCache().id;

          this.movieService.removeMovieFromFavorites(this.movieAPI.id, userId).subscribe(res => {

            console.log(res);
            Swal.fire(
              'The movie was removed!',
            )
            this.isFavorite = false;

          }, err => {
            console.log(err)
            console.log("Error while fetching data")
          });


          this.refreshUserFromLocalChash(userId);

        }
      })
    }




  }

}
