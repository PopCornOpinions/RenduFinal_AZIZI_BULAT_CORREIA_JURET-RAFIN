// remark.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    usernamesTab : string[] = [];
    userIds : number[] = [];
    password : string = '';
    username : string = "";
    private usernameKey = 'username';
        constructor(private http: HttpClient) {}


    setUsername(username: string): void {
        localStorage.setItem(this.usernameKey, username);
    }

    getUsername(): string |null {
        return localStorage.getItem(this.usernameKey);
    }
    submitUser(username : string, email : string, password : string) {
        const formData = {
            username: username,
            email: email,
            password: password,
        };
        console.log('Envoi de ',formData)
        return this.http.post('http://localhost:3000/api/adduser', formData);
    }

    getIdByUsername(username: string): Observable<string> {
        console.log("On essaye de se connecter à la BDD pour récup l'id :", username);
        const result = this.http.get<string>(`http://localhost:3000/api/getidbyusername?username=${username}`);
        console.log("Resultat : ", result);
        return result;
    }

    getPassword(username: string): Observable<string> {
            console.log("On essaye de se connecter");
        const result = this.http.get<string>(`http://localhost:3000/api/getpassword?username=${username}`);
        return result;
    }

}




