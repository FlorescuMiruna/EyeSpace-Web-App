import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Comm } from 'src/app/model/comm';
import { Movie } from 'src/app/model/movie';
import { User } from 'src/app/model/user';

import { AuthenticationService } from 'src/app/service/authentication.service';
import { CommentService } from 'src/app/service/comment.service';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {


  movieAPI: Movie = new Movie();
  isWatched: boolean = false;
  isInWatchList: boolean = false;
  text: string = '';
  comments: Comm[] = [];
  myCommObj: Comm = new Comm()
  commDetails !: FormGroup;
  user: User = this.authenticationService.getUserFromLocalCache();
  // likedComms: number[] = [];

   likedComms : Comm[] = [];
  constructor(private movieService: MovieService, private authenticationService: AuthenticationService, private userService: UserService, private commentService: CommentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.initializeMovie();

    this.commDetails = this.formBuilder.group({
      text: ['']
    });


  }
  addComm() {

    console.log(this.commDetails);
    console.log(this.commDetails.value);
    this.myCommObj.text = this.commDetails.value.text;

    let userId = this.authenticationService.getUserFromLocalCache().id;

    this.commentService.addComment(this.myCommObj, this.movieAPI.id, userId).subscribe(res => {
      console.log(res);
      this.initializeComments();

    }, err => {
      console.log("EROARE");
      console.log(err);

    });
  }

  deleteComm(comm: Comm) {

    this.commentService.deleteComment(comm).subscribe(res => {
      console.log(res);
      this.initializeComments();
    }, err => {
      console.log("ERROR:", err);

    })
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

  calculateLikeClass(comm: Comm){
    if(this.likedComms.includes(comm))
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

    console.log('idIMDB:', idIMDB)

    this.movieService.getAPIMovie(idIMDB).subscribe(res => {

      this.movieAPI = res;
      console.log("this.movieAPI:", this.movieAPI)
      this.checkWatched();
      this.checkInWatchList();
      console.log("ESTE VAZUT FILMUL?", this.isWatched);
      console.log("ESTE IN WATCH-LIST FILMUL?", this.isInWatchList);
      this.initializeComments();

    }, err => {
      console.log("Error while fetching data")
    });


  }

  initializeComments() {
    this.commentService.getAllCommentsByMovieId(this.movieAPI.id).subscribe(res => {


      this.comments = res;
      
      // Iau din lista doar comentariile carora le-am dat like

      this.likedComms = this.comments.filter(val => val.likes.includes(this.user.id))

      console.log("Comments:", this.comments);
      console.log("Liked comments:", this.likedComms);
 

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
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#4E9A9B',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {


          let userId = this.authenticationService.getUserFromLocalCache().id;

          this.movieService.removeMovieFromUser(this.movieAPI.id, userId).subscribe(res => {

            console.log(res);
            Swal.fire(
              'The movie was removed!',
            )
            this.isWatched = false;

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

    if(!this.likedComms.includes(comm)){
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


}
