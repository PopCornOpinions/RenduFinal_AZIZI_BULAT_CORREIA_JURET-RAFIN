// critic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CriticService {
  constructor(private http: HttpClient) {}

  getCriticsFromAMovieById(movieId: number): Observable<any> {
    console.log("go")
    return this.http.get(`/api/movie-critics/${movieId}`)
      .pipe(
        map(response => response)
      );
  }
  getCritics() : Observable<any>{
    console.log("Recuperons les critiques")
    const result = this.http.get(`/api/movie-critics`)
        .pipe(
            map(response => response)
        );
    console.log(result);
    return result;
  }
  getRemarkIdbyUserIdAndMovieId(user_id : number, movieId : number): Observable<any>{
    console.log("On essaye de se connecter à la BDD :",user_id, movieId)
    const result = this.http.get(`/api/get_movie-critic/?user_id=${user_id}&&movie_id=${movieId}`)
        .pipe(
            map(response => response)
        );
    console.log("Resultat : ", result);
    return result
  }
  getCriticsFromAUserId(user_id : number):Observable<any>{
    console.log("On se connecte à la BDD pour la récup des critiques" , user_id)
    const result =  this.http.get(`/api/movie-critics_byUser_id/?user_id=${user_id}`)
        .pipe(
            map(response => response)
        );
    console.log("Résulat :", result);
    return result;
  }
}



