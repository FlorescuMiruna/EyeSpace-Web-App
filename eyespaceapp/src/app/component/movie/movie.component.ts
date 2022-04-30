import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieSearchDetails } from 'src/app/model/movie-search-details';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  // movieDetail !: FormGroup;
  movieSearchDetail !: FormGroup;
  // movieObj : Movie = new Movie();
  // movieList: Movie[] = [];
  movieSearchList: MovieSearchDetails[] = [];
  // movieAPI:Movie = new Movie();
  TITLE: String = "";
  constructor(private router : Router, private formBuilder: FormBuilder, private movieService: MovieService) { }

  ngOnInit(): void {



    console.log("Se reinoieste?")
    
  

    this.movieSearchDetail = this.formBuilder.group({
      

      idIMDB:[''],
      title : [''],
      year: [''],
     posterUrl:['']
    }); 
  }


  getAllSearchMovies(TITLE: String){
    console.log("TITLE din getAllSearchMovies",TITLE)
    this.movieService.getAllSearchMovies(TITLE).subscribe(res=>{

      console.log("movieSearchList",this.movieSearchList)
      this.movieSearchList = res;

      
  },err=>{
    console.log("error while fetching data.")
  });

  }




  search(){

    this.TITLE = this.movieSearchDetail.value.title;

    console.log("value",this.movieSearchDetail.value.title);
    console.log("TITLUL:",this.TITLE);
    this.getAllSearchMovies(this.TITLE);
    // window.location.reload();
  }
  goToMovie(movieSearchDetails: MovieSearchDetails){

    
     this.router.navigate(['/movie-page'])
    console.log("movieSearch",movieSearchDetails);
    this.movieService.setMovieIdImdb(movieSearchDetails.idIMDB);
    localStorage.setItem("movieIdImdb", movieSearchDetails.idIMDB)

  //   this.movieService.getAPIMovie(movieSearch.idIMDB).subscribe(res=>{

  //     this.movieAPI = res;

  //     console.log("imdb movie res",res);
  //     console.log("imdb movie ",this.movieAPI);
 

      
  // },err=>{
  //   console.log("error while fetching data.")
  // });

  }

}