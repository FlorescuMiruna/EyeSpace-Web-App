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

  
  movieAPI:Movie = new Movie();
  isWatched:boolean = false;
  subscriptions: any;
  


  constructor(private movieService: MovieService, private authenticationService:AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {

    this.initializeMovie();


  }

  calculateClasses() {
    if(this.isWatched === false)
      return 'btn btn-outline-success';
    else
    return 'btn btn-success';
}

refreshUserFromLocalChash(id:number){
  this.userService.getUserById(id).subscribe(res=>{


   console.log("response USER from db",res);
    this.authenticationService.addUserToLocalCache(res);
    console.log("USER FROM LOCAL CACHE AHTER:",this.authenticationService.getUserFromLocalCache())
    
},err=>{
  console.log("Error while fetching data.")
});
}

  initializeMovie(){

    // var idIMDB  = this.movieService.getMovieIdImdb();
    var idIMDB = '';
    var localMovie = localStorage.getItem('movieIdImdb');
    if( localMovie!== null){
      var idIMDB = localMovie;
    }

    console.log('idIMDB', idIMDB)
     
    this.movieService.getAPIMovie(idIMDB).subscribe(res=>{


      console.log("imdb movie res",res);
      this.movieAPI = res;
      console.log("imdb movie ",this.movieAPI);
 

      
  },err=>{
    console.log("Error while fetching data.")
  });

  }


  addToWatchList(){
    
    var id  = this.authenticationService.getUserFromLocalCache().id;

    this.movieService.addMovie(this.movieAPI,id).subscribe(res=>{
      this.isWatched = true;
      console.log("FILMUL:",res);
     // this.isWatched = true;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'The movie was added to your watch list',
        showConfirmButton: false,
        timer: 1500
      })

      // Swal.fire('Hello Angular');  
      // this.getAllMovies();
     
      this.refreshUserFromLocalChash(this.authenticationService.getUserFromLocalCache().id);
 
      
  },err=>{
      console.log(err);
      // this.getAllMovies();
  });

  }


}
