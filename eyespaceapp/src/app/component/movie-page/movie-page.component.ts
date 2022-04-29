import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MovieService } from 'src/app/service/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  
  movieAPI:Movie = new Movie();


  constructor(private movieService: MovieService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.initializeMovie();


  }

  initializeMovie(){
     var idIMDB  = this.movieService.getMovieIdImdb();

     
    this.movieService.getAPIMovie(idIMDB).subscribe(res=>{


      console.log("imdb movie res",res);
      this.movieAPI = res;
      console.log("imdb movie ",this.movieAPI);
 

      
  },err=>{
    console.log("Error while fetching data.")
  });

  }

  addToWatchList(){
   console.log(this.authenticationService.getUserFromLocalCache());
    this.movieService.addMovie(this.movieAPI).subscribe(res=>{
      console.log(res);
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'The movie was added to your watch list',
        showConfirmButton: false,
        timer: 1500
      })

      // Swal.fire('Hello Angular');  
      // this.getAllMovies();
      console.log("USERUL LOGAT:");
      console.log(this.authenticationService.getUserFromLocalCache())
      
  },err=>{
      console.log(err);
      // this.getAllMovies();
  });

  }


}
