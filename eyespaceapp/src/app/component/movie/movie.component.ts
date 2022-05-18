import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieSearchDetails } from 'src/app/model/movie-search-details';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {


  movieSearchDetailForm !: FormGroup;
  movieSearchList: MovieSearchDetails[] = [];

  mostPopularMovies: Movie[] = [];
  TITLE: String = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private movieService: MovieService) { }

  ngOnInit(): void {

    this.movieSearchDetailForm = this.formBuilder.group({

      idIMDB: [''],
      title: [''],
      year: [''],
      posterUrl: ['']
    });

    this.initalizeMostPopularMovies();
  }


  getAllSearchMovies(TITLE: String) {

    this.movieService.getAllSearchMovies(TITLE).subscribe(res => {


      this.movieSearchList = res;
      console.log("movieSearch List:", this.movieSearchList)

    }, err => {
      console.log("Error while fetching data")
    });

  }




  search() {

    this.TITLE = this.movieSearchDetailForm.value.title;
    this.getAllSearchMovies(this.TITLE);
  }
  goToMovie(movieSearchDetails: MovieSearchDetails) {


    this.router.navigate(['/movie-page'])
    localStorage.setItem("movieIdImdb", movieSearchDetails.idIMDB)


  }

  initalizeMostPopularMovies(){
    this.movieService.getMostPopularMovies().subscribe(res => {

      this.mostPopularMovies = res;
      // this.mostPopularMovies = this.mostPopularMovies.slice(0,5); // de sters
      console.log("most popular:", this.mostPopularMovies)

    }, err => {
      console.log("Error while fetching data")
    });
  }

  goToPopularMovie(movie: Movie) {


    this.router.navigate(['/movie-page'])
    localStorage.setItem("movieIdImdb", movie.id)


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