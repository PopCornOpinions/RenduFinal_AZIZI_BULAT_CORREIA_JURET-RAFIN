import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
  export class NavbarAdminComponent implements OnInit {
  ngOnInit() {
  }
  onLogout() {
    // Ajoutez ici la logique de déconnexion (par exemple, supprimer les tokens d'authentification, etc.)
    // Une fois déconnecté, redirigez l'utilisateur vers la page de connexion
    window.location.href = '#/'; // Remplacez 'login' par la route de votre page de connexion
  }
  onSeeCritics():void{
    window.location.href = '#/removeCriticRoot';
  }
  onAddMovie(){
    window.location.href = '#/addmovie';
  }
}
