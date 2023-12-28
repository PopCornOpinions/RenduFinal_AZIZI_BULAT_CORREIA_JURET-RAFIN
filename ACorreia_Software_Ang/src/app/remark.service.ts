// remark.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RemarkService {
  constructor(private http: HttpClient) {}

  submitRemark(description: string, note: number,id:number, user_id:number) {
    const formData = {
      description: description,
      note: note,
      movie_id: id,
      user_id : user_id
    };
    console.log('Envoi de ',formData)
    return this.http.post('http://localhost:3000/api/submitcritic', formData);
  }



}




