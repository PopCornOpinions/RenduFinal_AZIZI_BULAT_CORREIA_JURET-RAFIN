// remove.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RemoveService {
  constructor(private http: HttpClient) {}

  removeCritic(id:number) {
    const formData = {
      critic_id: id
    };
    console.log('Envoi de demande de suppression',formData)
    return this.http.post('http://localhost:3000/api/removecritic', formData);
  }
}




