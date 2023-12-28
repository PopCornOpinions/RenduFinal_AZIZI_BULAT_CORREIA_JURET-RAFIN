import {Component, OnInit} from '@angular/core';
import {MovieService} from "../movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CriticService} from "../critic.service";
import {RemarkService} from "../remark.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
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


  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private criticService: CriticService,
              private remarkService: RemarkService) {}

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterMovies();
  }

  ngOnInit() {
    // Appelez la méthode getMovies() du service pour récupérer les films
    this.movieService.getMovies().subscribe(
      (data) => {
        this.movies = data;
        this.filteredMovies = [...this.movies];// Mettez à jour la propriété avec les données récupérées
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des films :', error);
      }
    );
  }
  filterMovies() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredMovies = [...this.movies]; // Affiche tous les films si la barre de recherche est vide
    } else {
      this.filteredMovies = this.movies.filter(movie =>
        movie.movie_title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}
