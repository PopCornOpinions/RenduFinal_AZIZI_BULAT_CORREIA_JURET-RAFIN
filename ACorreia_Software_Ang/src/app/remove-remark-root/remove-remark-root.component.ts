import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {CriticService} from "../critic.service";
import {RemoveService} from "../remove.service";
import {RemarkService} from "../remark.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-remove-remark-root',
  templateUrl: './remove-remark-root.component.html',
  styleUrls: ['./remove-remark-root.component.css']
})
export class RemoveRemarkRootComponent implements OnInit{
  critic_id: number | undefined;
  user_id : number = 0;
  movie_id : number = 0;

  movie: any[] = []; //même s'il n'y a qu'un seul élément on met un tableau
  critics: any[] = []
  critic_date = new Date();
  critic_remark: string = '';
  critic_mark: number = 5;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private movieService: MovieService,
      private criticService: CriticService,
      private removeService: RemoveService,
      private remarkService: RemarkService
  ) { }

  ngOnInit() {
    console.log("Initialisation")
    this.activatedRoute.params.subscribe(params => {

        this.criticService.getCritics().subscribe(critics => {
          this.critics = critics;
          console.log('Critiques récupérées:', this.critics);
        }, error => {
          console.error('Erreur lors de la récupération des détails des critiques:', error);
        });

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
