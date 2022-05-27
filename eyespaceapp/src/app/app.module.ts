import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieComponent } from './component/movie/movie.component';
import { MoviePageComponent } from './component/movie-page/movie-page.component';
import { MyMoviesComponent } from './component/my-movies/my-movies.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { HomeComponent } from './component/home/home.component';
import { BookComponent } from './component/book/book.component';
import { BookPageComponent } from './component/book-page/book-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuoteComponent } from './component/quote/quote.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    RegisterComponent,
    UserComponent,
    MovieComponent,
    MoviePageComponent,
    MyMoviesComponent,
    HomeComponent,
    BookComponent,
    BookPageComponent,
    ProfileComponent,
    PageNotFoundComponent,
    QuoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule,
    NgxStarRatingModule
    
  ],
  providers: [ NotificationService,AuthenticationGuard, AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
