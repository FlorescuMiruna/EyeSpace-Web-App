import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { User } from '../model/user';
import { NotificationType } from '../enum/notification-type.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading: boolean | undefined;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }
  }

  public onRegister(user: User): void {
    this.showLoading = true;

   /** 
    * Validam adresa de email
    * Conditii:
    * 1.Emailul nu este gol
    * 2.Contine simbolul @ cu cel putin o litera inaintea lui
    * 3.Simbolul @ este urmat de cel putin 2 litere dupa el
    * 4.Se termina cu punct si cel putin 2 litere dupa el
    */
    if(/(.+)@(.+){2,}\.(.+){2,}/.test(user.email) === false){
      Swal.fire({
        icon: 'error',
        title: 'Please enter a valid email address!',
 
      })

      this.showLoading = false;
    }

    else{
      this.subscriptions.push(
        this.authenticationService.register(user).subscribe(
          (response: User) => {
            this.showLoading = false;
            this.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.firstName}.`);
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.showLoading = false;
          }
        )
      );
    }
    
 


  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
