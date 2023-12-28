// movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>('/api/movies')
      .pipe(
        map(response => response)
      );
  }

  getMovieById(movieId: number): Observable<any> {
    return this.http.get(`/api/movies/${movieId}`)
      .pipe(
        map(response => response)
      );
  }
  submitMovie(title : String, poster :String, description : String, releasedate : String, filmgenre : String, duration : number, filmdirector : String) {
    const formData = {
      title : title,
      poster : poster,
      description : description,
      releaseDate : releasedate,
      filmGenre : filmgenre,
      duration : duration,
      filmdirector : filmdirector
    };
    console.log('Envoi de ',formData)
    return this.http.post('http://localhost:3000/api/submitMovie', formData);
  }
}



