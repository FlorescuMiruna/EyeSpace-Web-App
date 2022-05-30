import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {

  movies: Movie[] = [];
  movies_watch_list: Movie[] = [];
  favorites: Movie[] = [];
  time: [number,number] = [0,0];
  favorites_ids : String[] = [];
  user: User = this.authenticationService.getUserFromLocalCache();
  pageAll: Boolean = true;
  pageFavorites: Boolean = true;
  pageWatched: Boolean = true;
  pageWatchList: Boolean = true;
  constructor(private userService: UserService,private movieService: MovieService, private authenticationService: AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.initializeLists();
    this.checkPage();
  }


  checkPage(){

    var page = localStorage.getItem("my-movies") || "";
    this.pageWatchList = true;
    this.pageWatched = true;
    this.pageFavorites = true;
    if(page== "Watched"){
      this.pageWatchList = false;
      this.pageFavorites = false;
    }


     if(page== "WatchList"){
      this.pageWatched = false;
      this.pageFavorites = false;
     
    }
    if(page== "Favorites"){
      this.pageWatchList = false;
      this.pageWatched = false;

    }

    console.log("***********************")
    console.log("pageWatchList",this.pageWatchList);
    console.log("pageWatched",this.pageWatched);
    console.log("pageFavorites",this.pageFavorites);

  }
  initializeLists(){
    this.refreshUserFromLocalChash(this.authenticationService.getUserFromLocalCache().id);
    console.log("USER",this.authenticationService.getUserFromLocalCache())

    this.movies = this.authenticationService.getUserFromLocalCache().movies;
    this.movies_watch_list = this.authenticationService.getUserFromLocalCache().movies_watch_list;
    this.favorites = this.authenticationService.getUserFromLocalCache().favorites;
    this.favorites_ids = this.favorites.map(x => x.id);
    console.log("fav:",this.favorites_ids)

    //Nu vreau ca elementele din lista de filme vizionate sa mai apara si in Watch list
    this.movies_watch_list =  this.movies_watch_list.filter(val => !(this.movies.map(a => a.id)).includes(val.id));


    let minutes = 0;
    for(let movie of this.movies){
      minutes += movie.duration;


    }

    this.time = this.convertMinutes(minutes);
   

  }

  convertMinutes(minutes: number) : [number,number]{
    let hours: number;
    let days: number;
    console.log(minutes)
    hours = Math.floor(minutes/60);
    days = Math.floor(hours/24);
    hours = hours%24;
    
    return [days,hours];

  }

  goToMovie(movie: Movie) {


    this.router.navigate(['/movie-page'])
    localStorage.setItem("movieIdImdb", movie.id)


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
  goToMyMovies(){
    // this.router.navigate(['/my-movies']);
    localStorage.setItem('my-movies', 'All');
    this.checkPage();
    console.log("goToMyMovies");

  }
  
  goToMyWatchedMovies(){
    // this.router.navigate(['/my-movies']);
    localStorage.setItem('my-movies', 'Watched');
    this.checkPage();
  }
  goToMyWatchListMovies(){
   // this.router.navigate(['/my-movies']);
    localStorage.setItem('my-movies', 'WatchList');
    this.checkPage();
  }

  goToMyFavoriteMovies(){
   // this.router.navigate(['/my-movies']);
    localStorage.setItem('my-movies', 'Favorites');
    this.checkPage();

  }
  

}
