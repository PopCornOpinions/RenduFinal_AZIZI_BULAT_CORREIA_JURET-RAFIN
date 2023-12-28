// Importez les modules nécessaires
import { Component, OnInit } from '@angular/core';
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.css']
})

export class MenuNavBarComponent implements OnInit {
  ngOnInit() {
  }
  onMove(){
    window.location.href ='#/removeCriticUser';
  }
  onLogout() {
    // Ajoutez ici la logique de déconnexion (par exemple, supprimer les tokens d'authentification, etc.)
    // Une fois déconnecté, redirigez l'utilisateur vers la page de connexion
    window.location.href = '#/'; // Remplacez 'login' par la route de votre page de connexion
  }
}
