import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


export class AuthModule {}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuNavBarComponent } from './menu-nav-bar/menu-nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FullHomepageComponent } from './full-homepage/full-homepage.component';
import { FullHomepageRootComponent } from './full-homepage-root/full-homepage-root.component';
import { RemoveRemarkRootComponent } from './remove-remark-root/remove-remark-root.component';
import { RemoveRemarkUserComponent } from './remove-remark-user/remove-remark-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuNavBarComponent,
    MovieDetailComponent,
    HomepageComponent,
    LoginComponent,
    AddUserComponent,
    NavbarAdminComponent,
    AddMovieComponent,
    FullHomepageComponent,
    FullHomepageRootComponent,
    RemoveRemarkRootComponent,
    RemoveRemarkUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
