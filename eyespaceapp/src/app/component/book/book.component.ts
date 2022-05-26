import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookSearchDetails } from 'src/app/model/book-search-details';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookSearchDetailForm !: FormGroup;
  bookSearchList: BookSearchDetails[] = [];


  NAME: String = "";

  constructor(private router: Router, private formBuilder: FormBuilder, private bookService: BookService) { 
 
  }

  ngOnInit(): void {
    this.bookSearchDetailForm = this.formBuilder.group({

      id: [''],
      name: [''],
      year: [''],
      coverUrl: ['']
    });
  }



  search() {

    this.NAME = this.bookSearchDetailForm.value.name;
    this.getAllSearchBooks(this.NAME);
  }

  getAllSearchBooks(NAME: String) {

    this.bookService.getAllSearchBooks(NAME).subscribe(res => {


      this.bookSearchList = res;
      console.log("bookSearch List:", this.bookSearchList)

    }, err => {
      console.log("Error while fetching data")
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

  goToBook(BookSearchDetails: BookSearchDetails) {


    this.router.navigate(['/book-page'])
    localStorage.setItem("bookId", BookSearchDetails.id.toString());


  }

}
