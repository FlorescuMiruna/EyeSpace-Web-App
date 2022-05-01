import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Movie } from 'src/app/model/movie';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
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

  constructor(private movieService: MovieService, private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {

    this.initializeMovie();



  }

  calculateClasses() {
    if (this.isWatched === false)
      return 'btn btn-outline-success';
    else
      return 'btn btn-success';
  }

  /*Verific daca filmul este in lista user-ului de filme vazute*/
  checkWatched(): void {

    let found: boolean = false;
    let movies: Movie[] = this.authenticationService.getUserFromLocalCache().movies;
    // console.log("this.movieAPI", this.movieAPI);

    for (let movie of movies) {
      if (movie.id == this.movieAPI.id) {
        // console.log(movie)
        found = true;
        this.isWatched = true;
        break;
      }
    }
    if (found == false)
      this.isWatched = false;
  }

  refreshUserFromLocalChash(id: number) {
    this.userService.getUserById(id).subscribe(res => {

      this.authenticationService.addUserToLocalCache(res);
      console.log("USER FROM LOCAL CACHE AFTER:", this.authenticationService.getUserFromLocalCache())

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
      console.log("ESTE VAZUT FILMUL?", this.isWatched);

    }, err => {
      console.log("Error while fetching data")
    });


  }


  addMovieToWatchList() {
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
          console.log("Id-es:",this.movieAPI.id,userId );
          this.movieService.deleteUserFromMovie(this.movieAPI.id,userId).subscribe(res => {

           console.log(res);
           Swal.fire(
            'The movie was removed!',
          )
          this.isWatched = false;
      
          }, err => {
            console.log(err)
            console.log("Error while fetching data")
          });
      



        }
      })
    }
  }




}
