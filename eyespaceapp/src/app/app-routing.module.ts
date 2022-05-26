import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './component/book/book.component';

import { HomeComponent } from './component/home/home.component';
import { MoviePageComponent } from './component/movie-page/movie-page.component';
import { MovieComponent } from './component/movie/movie.component';
import { MyMoviesComponent } from './component/my-movies/my-movies.component';
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
  {path: 'home', component:HomeComponent},
  {path: 'book', component:BookComponent},


  // { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
