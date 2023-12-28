import { Component } from '@angular/core';
import {MovieService} from "../movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CriticService} from "../critic.service";
import {RemarkService} from "../remark.service";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  title = '';
  movies: any[] = []; // Définissez une propriété pour stocker les films
  filteredMovies:any[] = [];
  searchTerm:string = '';
  id: number | undefined;
  poster : string ='';
  description : string='';
  date : Date = new Date();
  releasedate : string = '';
  filmgenre : string = '';
  duration : number = 0;
  filmdirector : string = '';

  constructor (private movieService: MovieService,
               private activatedRoute: ActivatedRoute,
               private router: Router,){}

  onSubmit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.releasedate = this.date.toString();
      console.log('La description est', this.description)
      this.movieService.submitMovie(this.title,this.poster, this.description, this.releasedate,this.filmgenre,this.duration,this.filmdirector).subscribe(
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
    window.location.href = '#/homeroot';
  }
}
