import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class HangmanService {

  constructor(private http: HttpClient) { }

  getQuestions() {        
    let large = Math.floor(Math.random() * 10 + 3);
    return this.http.get<string[]>(apiPath+large);
  }
}


const apiPath = 'https://clientes.api.greenborn.com.ar/public-random-word?c=5&l=';
