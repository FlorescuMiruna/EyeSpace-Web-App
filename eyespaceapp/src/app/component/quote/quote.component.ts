
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder} from '@angular/forms';

import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { Quote } from 'src/app/model/quote';


import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { QuoteService } from 'src/app/service/quote.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

   user: User = this.authenticationService.getUserFromLocalCache();
   quotes: Quote[] = [];
   movies: Movie[] = [];
   myQuoteObj: Quote = new Quote();
   myQuoteObjEdit : Quote = new Quote();
   testVar : Boolean = true;

   quoteDetails !: FormGroup;
  quoteDetailsEdit !: FormGroup;
  

  constructor(private authenticationService: AuthenticationService,private quoteService: QuoteService,private router: Router,private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {


    this.quoteDetails = this.formBuilder.group({

      text: [''],
      // person:[''],
      theme:[''],
      movieId: ['']
 
    });

    this.quoteDetailsEdit = this.formBuilder.group({
      id: [''],
      textt: [''],
      // personn: [''],
      themee:['']
      
    });


    this.initializeQuotes();
    this.initializeMovies();

  }



  initializeQuotes() {


    this.quoteService.getAllQuotesByUserId(this.user.id).subscribe(res => {


      this.quotes = res;
      console.log(res);
   
      
    this.quoteDetails = this.formBuilder.group({
      id: [''],
      text: [''],
      // person:[''],
      theme:[''],
      movieId: ['']
    });


    }, err => {
      console.log("Error while fetching data")
      console.log(err);
    });

  }

  addQuote(){

    this.myQuoteObj.text = this.quoteDetails.value.text;
    // this.myQuoteObj.person = this.quoteDetails.value.person;
    this.myQuoteObj.theme = this.quoteDetails.value.theme;

    var movieId = this.quoteDetails.value.movieId;
  
    console.log("Form",this.quoteDetails.value)
    console.log("OBJ",this.myQuoteObj)


    // if(this.authenticationService.getUserFromLocalCache().movies.length === 0){
  
    // }

    if(this.quoteDetails.value.movieId === "")
    {
      Swal.fire({
        icon: 'error',
     
        title: "You must select a movie in order to add the quote!",
        
      })
    }
    else{
      let userId = this.authenticationService.getUserFromLocalCache().id;

    this.quoteService.addQuote(this.myQuoteObj, movieId, userId).subscribe(res => {
      // console.log("res", res);
      this.initializeQuotes();
      Swal.fire({
        position: 'center',
        // imageUrl: res.movie.posterUrl,
        // imageHeight: 150,
        // imageWidth: 150,
        icon: 'success',
        title: `The quote from ${res.movie.title} was added to your list`,
        showConfirmButton: false,
        timer: 2000
      })

    }, err => {
      console.log("EROARE");
      console.log(err);

    });

    }

    
  }

  editQuote(quote:Quote){

    this.quoteDetailsEdit.controls['id'].setValue(quote.id);
    this.quoteDetailsEdit.controls['textt'].setValue(quote.text);
    // this.quoteDetailsEdit.controls['personn'].setValue(quote.person);
    this.quoteDetailsEdit.controls['themee'].setValue(quote.theme);
   

    console.log(this.quoteDetailsEdit.value)
 

  }

  updateQuote(){

    this.myQuoteObjEdit.id = this.quoteDetailsEdit.value.id;
    this.myQuoteObjEdit.text = this.quoteDetailsEdit.value.textt;
    // this.myQuoteObjEdit.person = this.quoteDetailsEdit.value.personn;
    this.myQuoteObjEdit.theme = this.quoteDetailsEdit.value.themee;

    console.log("OBJ", this.myQuoteObjEdit);
    
    this.quoteService.updateQuote(this.myQuoteObjEdit).subscribe(res=>{
      console.log("res",res);

      this.quoteDetailsEdit = this.formBuilder.group({
        id : [''],
        textt : [''],
        // personn: [''],
        themee:['']

  
      });  
     
      this.initializeQuotes();
    },err=>{
      console.log(err);
    })

  }
  deleteQuote(quote: Quote) {
    Swal.fire({
  title: 'Are you sure you want to delete your quote?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#4E9A9B',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {


    this.quoteService.deleteQuote(quote).subscribe(res => {
      Swal.fire(
        'The comment was deleted!',
      )
      this.initializeQuotes();
    }, err => {
      
      console.log("ERROR:", err);

    })






  }
})


}

  refreshUserFromLocalChash(id: number) {

    this.userService.getUserById(id).subscribe(res => {

      this.authenticationService.addUserToLocalCache(res);


    }, err => {
      console.log("Error while fetching data.")
    });
  }

  initializeMovies(){
    this.refreshUserFromLocalChash(this.authenticationService.getUserFromLocalCache().id);
    console.log("USER",this.authenticationService.getUserFromLocalCache())

    this.movies = this.authenticationService.getUserFromLocalCache().movies;

    console.log("MOVIES:", this.movies)

  
   

  }
  

  calculateClass(){
    return "additional";

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
    this.router.navigate(['/my-movies']);
    localStorage.setItem('my-movies', 'All');

  }
  
  goToMyWatchedMovies(){
    this.router.navigate(['/my-movies']);
    localStorage.setItem('my-movies', 'Watched');
  }
  goToMyWatchListMovies(){
    this.router.navigate(['/my-movies']);
    localStorage.setItem('my-movies', 'WatchList');
  }

  goToMyFavoriteMovies(){
    this.router.navigate(['/my-movies']);
    localStorage.setItem('my-movies', 'Favorites');

  }
  public  isDark(theme: String): boolean {
    if (theme == "Dark")
      return true;
    else return false;
  }
  public  isLight(theme: String): boolean {
    if (theme == "Light")
      return true;
    else return false;
  }
  public  isBlue(theme: String): boolean {
    if (theme == "Blue")
      return true;
    else return false;
  }

  public  isPink(theme: String): boolean {
    if (theme == "Pink")
      return true;
    else return false;
  }



}
