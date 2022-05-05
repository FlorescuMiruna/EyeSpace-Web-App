import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {

  movies: Movie[] = [];
  movies_watch_list: Movie[] = [];

  constructor(private movieService: MovieService, private authenticationService: AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.initializeLists();
  }

  initializeLists(){
    console.log("USER",this.authenticationService.getUserFromLocalCache())
    this.movies = this.authenticationService.getUserFromLocalCache().movies;
    this.movies_watch_list = this.authenticationService.getUserFromLocalCache().movies_watch_list;


    //Nu vreau ca elementele din lista de filme vizionate sa mai apara si in Watch list
    this.movies_watch_list =  this.movies_watch_list.filter(val => !(this.movies.map(a => a.id)).includes(val.id));


  }

  goToMovie(movie: Movie) {


    this.router.navigate(['/movie-page'])
    localStorage.setItem("movieIdImdb", movie.id)


  }

}
