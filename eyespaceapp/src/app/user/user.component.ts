import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/role.enum';
import { CustomHttpRespone } from '../model/custom-http-response';
import { FileUploadStatus } from '../model/file-upload.status';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private titleSubject = new BehaviorSubject<String>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[] = [];
  public user: User = new User;
  public refreshing: any;
  private subscriptions: Subscription[] = [];
  public selectedUser: User = new User();
  public fileName: any;
  //public profileImage: File = new File([],"");
  public profileImage: any;
  public editUser = new User();
  private currentUsername: string = "";
  public fileStatus = new FileUploadStatus();

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.checkPage();
    this.user = this.authenticationService.getUserFromLocalCache();
    console.log("USER", this.user)
    this.getUsers(true);
    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  checkPage() {
    this.changeTitle(localStorage.getItem('page') || '');

    if (localStorage.getItem('page') === 'Profile')
      this.clickButton('goToProfile');
    if (localStorage.getItem('page') === 'Settings')
      this.clickButton('goToSettings');
    if (localStorage.getItem('page') === 'Users')
      this.clickButton('goToUsers');
  }

  public changeTitle(title: string): void {

    this.titleSubject.next(title);
    localStorage.setItem('page', title);
  }
  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );

  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }
  public get isAdmin(): boolean {

    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }
  public get isSuperAdmin(): boolean {

    return this.getUserRole() === Role.SUPER_ADMIN;
  }

  public get isManager(): boolean {
    return this.isAdmin || this.getUserRole() === Role.MANAGER;
  }

  public get isAdminOrManager(): boolean {
    return this.isAdmin || this.isManager;
  }


  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.clickButton('openUserInfo');
  }
  private clickButton(buttonId: string): void {

    const element = document.getElementById(buttonId);
    if (element !== null)
      element.click();
  }

  public onProfileImageChange(fileName: string, profileImage: File): void {
    console.log("** onProfileImageChange")
    console.log(fileName, profileImage);
    this.fileName = fileName;
    this.profileImage = profileImage;
    console.log("Name:", fileName);
    console.log(profileImage)
  }

  public saveNewUser(): void {
    console.log("aaa")
    this.clickButton('new-user-save');
  }
  public onAddNewUser(userForm: NgForm): void {
    console.log("off")
    const formData = this.userService.createUserFormDate(null, userForm.value, this.profileImage);
    this.subscriptions.push(
      this.userService.addUser(formData).subscribe(
        (response: User) => {
          console.log(response);
          this.clickButton('new-user-close');
          this.getUsers(false);
          this.fileName = null as any;
          this.profileImage = null as any;
          userForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} added successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null as any;
        }
      )
    );
  }
  public searchUsers(searchTerm: string): void {
    const results: User[] = [];
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(user);
        console.log(results);
      }
    }
    this.users = results;
    if (results.length === 0 || !searchTerm) {
      this.users = this.userService.getUsersFromLocalCache();
    }
  }
  public onEditUser(editUser: User): void {
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    this.clickButton('openUserEdit');
  }
  public onUpdateUser(): void {
    const formData = this.userService.createUserFormDate(this.currentUsername, this.editUser, this.profileImage);
    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe(
        (response: User) => {
          this.clickButton('closeEditUserModalButton');
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
    );
  }
  public onDeleteUser(username: string): void {

    Swal.fire({
      title: 'Are you sure you want to delete the user?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#4E9A9B',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {



        this.subscriptions.push(
          this.userService.deleteUser(username).subscribe(
            (response: CustomHttpRespone) => {
              this.sendNotification(NotificationType.SUCCESS, response.message);
              this.getUsers(false);
            },
            (error: HttpErrorResponse) => {
              this.sendNotification(NotificationType.ERROR, error.error.message);
            }
          )
        );




      }
    })
    

  }

  public onResetPassword(emailForm: NgForm): void {
    this.refreshing = true;
    const emailAddress = emailForm.value['reset-password-email'];
    this.subscriptions.push(
      this.userService.resetPassword(emailAddress).subscribe(
        (response: CustomHttpRespone) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.refreshing = false;
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
          this.refreshing = false;
        },
        () => emailForm.reset()
      )
    );
  }

  public onUpdatePassword(paswordForm: NgForm): void {
    this.refreshing = true;
    if(paswordForm.value['update-password-email1'] !== paswordForm.value['update-password-email2']){
      this.refreshing = false;
        Swal.fire({
          icon: 'error',

          title: 'You must enter the same password',
          text: 'Please try again',
      
        })
    }
    else {
      const password = paswordForm.value['update-password-email2'];
      const emailAddress = this.authenticationService.getUserFromLocalCache().email;
      this.subscriptions.push(
        this.userService.updatePassword(emailAddress,password ).subscribe(
          (response: CustomHttpRespone) => {
            this.sendNotification(NotificationType.SUCCESS, response.message);
            this.refreshing = false;
          },
          (error: HttpErrorResponse) => {
            this.sendNotification(NotificationType.WARNING, error.error.message);
            this.refreshing = false;
          },
          () => paswordForm.reset()
        )
      );
    }

  }
  public onUpdateProfileImage(): void {
    console.log("** onUpdateProfileImage")
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('profileImage', this.profileImage);
    this.subscriptions.push(
      this.userService.updateProfileImage(formData).subscribe(
        (event: HttpEvent<any>) => {
          this.reportUploadProgress(event);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.fileStatus.status = 'done';
        }
      )
    );
  }
  public onUpdateCurrentUser(user: User): void {
    this.refreshing = true;
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    const formData = this.userService.createUserFormDate(this.currentUsername, user, this.profileImage);
    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe(
        (response: User) => {
          this.authenticationService.addUserToLocalCache(response);
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
          this.profileImage = null;
        }
      )
    );
  }
  private reportUploadProgress(event: HttpEvent<any>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total)
          this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
        this.fileStatus.status = 'progress';
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.user.profileImageUrl = `${event.body.profileImageUrl}?time=${new Date().getTime()}`;
          this.sendNotification(NotificationType.SUCCESS, `${event.body.firstName}\'s profile image updated successfully`);
          this.fileStatus.status = 'done';
          break;
        } else {
          this.sendNotification(NotificationType.ERROR, `Unable to upload image. Please try again`);
          break;
        }
      default:
        `Finished all processes`;
    }
  }

  public updateProfileImage(): void {
    console.log("before click??")
    this.clickButton('profile-image-input');
  }
  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  goToProfile(){
    
    localStorage.setItem('page', 'Profile');
    this.checkPage();
  }

  goToUsers(){
   
    localStorage.setItem('page', 'Users');
    this.checkPage();
  }

  goToSettings(){

    localStorage.setItem('page', 'Settings');
    this.checkPage();
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

}

