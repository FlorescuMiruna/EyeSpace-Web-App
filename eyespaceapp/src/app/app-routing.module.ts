import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './component/book-page/book-page.component';
import { BookComponent } from './component/book/book.component';

import { HomeComponent } from './component/home/home.component';
import { MoviePageComponent } from './component/movie-page/movie-page.component';
import { MovieComponent } from './component/movie/movie.component';
import { MyMoviesComponent } from './component/my-movies/my-movies.component';
import { QuoteComponent } from './component/quote/quote.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'movie', component:MovieComponent},
  {path: 'movie-page', component:MoviePageComponent},
  { path: 'user/management', component: UserComponent },
  {path: 'my-movies', component:MyMoviesComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'reset-password', component:ResetPasswordComponent},
  {path: 'quotes', component:QuoteComponent},
  // {path: 'home', component:HomeComponent},
  // {path: 'book', component:BookComponent},
  // {path: 'book-page', component:BookPageComponent},
 //Wild Card Route for 404 request
 { path: '**', pathMatch: 'full', component: PageNotFoundComponent },

  // { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
