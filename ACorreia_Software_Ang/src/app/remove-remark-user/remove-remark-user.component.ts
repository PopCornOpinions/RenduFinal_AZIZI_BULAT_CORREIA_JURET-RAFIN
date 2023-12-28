import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {CriticService} from "../critic.service";
import {RemoveService} from "../remove.service";
import {RemarkService} from "../remark.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-remove-remark-user',
  templateUrl: './remove-remark-user.component.html',
  styleUrls: ['./remove-remark-user.component.css']
})
export class RemoveRemarkUserComponent implements OnInit{critic_id: number | undefined;
  user_id : number = 0;
  movie_id : number = 0;

  movie: any[] = []; //même s'il n'y a qu'un seul élément on met un tableau
  critics: any[] = []
  critic_date = new Date();
  critic_remark: string = '';
  critic_mark: number = 5;

  usernameS : string | null = this.userService.getUsername();
  username : string = "";

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private movieService: MovieService,
      private criticService: CriticService,
      private removeService: RemoveService,
      private remarkService: RemarkService,
      private userService : UserService,
  ) { }

  checkNum(){
    if(this.usernameS != null) this.username = this.usernameS
  }

  ngOnInit() {
    this.checkNum();
    console.log("Le Username est : ", this.username);
    console.log("Initialisation");

    this.activatedRoute.params.subscribe(params => {
      this.userService.getIdByUsername(this.username).subscribe(
          (result: string) => {
            this.user_id = parseInt(result, 10);
            console.log("Résultat de l'appel HTTP 1 : ", this.user_id);

            // Maintenant que vous avez l'ID utilisateur, récupérez les critiques
            this.criticService.getCriticsFromAUserId(this.user_id).subscribe(
                critics => {
                  this.critics = critics;
                  console.log('Critiques récupérées:', this.critics);
                },
                error => {
                  console.error('Erreur lors de la récupération des détails des critiques:', error);
                }
            );
          },
          (error) => {
            console.error("Erreur lors de la récupération de l'ID : ", error);
            // Gérez l'erreur ici
          }
      );
    });
  }

  submitremove(id_critic:number)
  {
    console.log("Lancement de la suppression de test")
    this.activatedRoute.params.subscribe(params => {
      console.log('Suppression de la critique qui a pour id' + id_critic);
      this.removeService.removeCritic(id_critic).subscribe(
          (response) => {
            console.log('Demande de suppression soumise avec succès', response);
            // Traitez la réponse du serveur ici si nécessaire
          },
          (error) => {
            console.error('Erreur lors de la demande de suppression', error);
            // Gérez les erreurs ici si nécessaire
          }
      );
      window.location.reload();
    });

  }

}
