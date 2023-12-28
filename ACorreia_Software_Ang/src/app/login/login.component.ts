import { Component, OnInit,Injectable } from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    usernamesTab: string[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private http: HttpClient) {
    }

    ngOnInit() {
    }

    onLogin() {
        if(this.username != '' && this.password != ''){
            this.userService.getPassword(this.username).subscribe(
                (password: string) => {
                    console.log('Mot de passe récupéré :', password);
                    if (this.password == password) {
                        console.log("Succès !")
                        this.userService.setUsername(this.username);
                        if(this.username == "root") window.location.href = '#/homeroot';
                        else window.location.href = '#/home';
                    } else {
                        console.log('Invalid credentials');
                    }
                    // Faites ce que vous devez faire avec le mot de passe récupéré
                },
                error => {
                    console.error('Erreur lors de la récupération du mot de passe :', error);
                    // Gérez les erreurs ici
                }
            );
        }
        else
        {
            console.log("Contenu vide");
        }
    }

}