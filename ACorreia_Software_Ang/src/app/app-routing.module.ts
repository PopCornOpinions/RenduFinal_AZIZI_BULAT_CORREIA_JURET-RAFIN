import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MenuNavBarComponent} from "./menu-nav-bar/menu-nav-bar.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {NavbarAdminComponent} from "./navbar-admin/navbar-admin.component";
import {AddMovieComponent} from "./add-movie/add-movie.component";
import {FullHomepageComponent} from "./full-homepage/full-homepage.component";
import {FullHomepageRootComponent} from "./full-homepage-root/full-homepage-root.component";
import {RemoveRemarkRootComponent} from "./remove-remark-root/remove-remark-root.component";
import {RemoveRemarkUserComponent} from "./remove-remark-user/remove-remark-user.component";


const routes: Routes = [
  { path: 'homeroot', component: FullHomepageRootComponent },
  { path: 'home', component: FullHomepageComponent},
  { path: 'movie/:id', component: MovieDetailComponent },
  { path : 'removeCriticRoot', component : RemoveRemarkRootComponent},
  {path : 'removeCriticUser', component : RemoveRemarkUserComponent},
  { path:'', component: LoginComponent},
  { path : 'adduser', component : AddUserComponent},
  {path : 'addmovie',component : AddMovieComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
