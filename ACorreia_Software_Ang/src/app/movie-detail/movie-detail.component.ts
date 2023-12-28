import {Component, OnInit} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {CriticService} from "../critic.service";
import { RemarkService } from '../remark.service';
import { RemoveService } from '../remove.service';
import {UserService} from "../user.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {
  id: number | undefined;
  movie: any[] = []; //même s'il n'y a qu'un seul élément on met un tableau
  critics: any[] = [];
  description: string = '';
  note: number = 5;
  user_id : number = 0;
  usernameS : string | null = this.userService.getUsername();
  username : string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private criticService: CriticService,
    private removeService: RemoveService,
    private remarkService: RemarkService,
    private userService: UserService

  ) {
    //this.username = this.userService.username;
  }

  checkNum(){
    if(this.usernameS != null) this.username = this.usernameS
  }
  submitremove(id_critic:number)
  {
    console.log("Lancement de la suppression de test")
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      if(this.user_id == 0) {
        console.log("On est dans le cas 0" , this.user_id)
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
      }
      else{
        console.log("On est dans l'autre cas : ", this.user_id)
        this.criticService.getRemarkIdbyUserIdAndMovieId(this.user_id,this.id).subscribe((response : Observable<any>)=>{
              console.log('Remarque soumise avec succès', response);
              if(Array.isArray(response) && response.includes(id_critic)){
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
              }
              // Traitez la réponse du serveur ici si nécessaire
            },
            (error) => {
              console.error('Erreur lors de la soumission de la remarque', error);
              // Gérez les erreurs ici si nécessaire
        }
        )
      }
    });

  }

  onBack(){
    if(this.user_id == 0) window.location.href = "#/homeroot";
    else window.location.href = "#/home";
  }

  onSubmit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      console.log('La description est', this.description)
      this.remarkService.submitRemark(this.description,this.note,this.id, this.user_id).subscribe(
        (response) => {
          console.log('Remarque soumise avec succès', response);
          // Traitez la réponse du serveur ici si nécessaire
        },
        (error) => {
          console.error('Erreur lors de la soumission de la remarque', error);
          // Gérez les erreurs ici si nécessaire
        }
      );
    });
    window.location.reload();
  }

  ngOnInit() {
    this.checkNum();
    //this.username = this.userService.getUsername();
    console.log("Username :", this.username)
    this.activatedRoute.params.subscribe(params => {
      this.userService.getIdByUsername(this.username).subscribe(
          (result: string) => {
            this.user_id = parseInt(result, 10);
            console.log("Résultat de l'appel HTTP : ", this.user_id);
            // Traitez la réponse ici
          },
          (error) => {
            console.error("Erreur lors de la récupération de l'ID : ", error);
            // Gérez l'erreur ici
          }
      );
      this.id = +params['id'];

      if (this.id) {
        this.movieService.getMovieById(this.id).subscribe(movie => {
          this.movie = movie;
          console.log('Détails du film:', this.movie);
        }, error => {
          console.error('Erreur lors de la récupération des détails du film:', error);
        });
        this.criticService.getCriticsFromAMovieById(this.id).subscribe(critics => {
          this.critics = critics;
          console.log('Critiques récupérées:', this.critics);
        }, error => {
          console.error('Erreur lors de la récupération des détails des critiques:', error);
        });
      }
    });
  }

  onDisconnect(){
    window.location.href = "#/";
  }
}


