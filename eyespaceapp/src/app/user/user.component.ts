import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private titleSubject = new BehaviorSubject<String>('Users');
  public titleAction$ = this.titleSubject.asObservable();

  constructor() { }

  
  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  ngOnInit(): void {
  }

}