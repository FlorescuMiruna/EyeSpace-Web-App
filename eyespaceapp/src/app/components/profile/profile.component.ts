import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User = new User;
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
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
