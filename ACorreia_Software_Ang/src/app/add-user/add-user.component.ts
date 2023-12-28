import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {ObjectUnsubscribedError, Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
    username: string = "";
    email: string = "";
    password: string = "";
    id: number | undefined;
    usernamesTab : string[] = [];

constructor(private activatedRoute: ActivatedRoute,
            private router: Router,
            private userService: UserService,
            private http: HttpClient) {}

    ngOnInit(): void {
        this.getUsersName();
    }
    getUsersName(): void
    {
        this.callToDBNames().subscribe(
            (data: any[]) => {
                this.usernamesTab = data.map(user => user.user_pseudo);
                console.log('Voici les noms des utilisateurs :', this.usernamesTab);
            },
            (error) => {
                console.error('Erreur lors de la récupération des noms des utilisateurs', error);
            }
        );
        console.log('Voici les noms des utilisateurs :', this.usernamesTab);
    }

    callToDBNames(): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:3000/getnames');
    }

  onSubmit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      console.log('Le username est : ', this.username);
      console.log('Le email est : ', this.email);
      console.log('Le password est : ', this.password);
        console.log('Les noms sont : ', this.usernamesTab);
      if(this.usernamesTab.includes(this.username)){
          console.log("Nom déjà utilisé")
          window.location.href = '#/adduser';
      }
      else{
          this.userService.submitUser(this.username,this.email, this.password).subscribe(
              (response) => {
                  console.log('User soumis avec succès', response);
                  // Traitez la réponse du serveur ici si nécessaire
              },
              (error) => {
                  console.error('Erreur lors de la soumission du user', error);
                  // Gérez les erreurs ici si nécessaire
              }
          );
          this.userService.setUsername(this.username);
          window.location.href = '#/home';
      }
    });
  }
}

