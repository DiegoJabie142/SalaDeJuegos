import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private apiUrl = 'https://api.quiz-contest.xyz/questions';

  constructor(private http: HttpClient) {}

  getQuestions(
    limit: number = 10,
    page: number = 1,
    category: string = 'geography'
  ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', '$2b$12$l0TqnbrPUILhp3Mb./Fpm.7OdQwZJsDRblb8HxdURGQ4/bOfqMySK');
    const url = `${this.apiUrl}?limit=${limit}&page=${page}&category=${category}`;
    
    return this.http.get<any>(url, { headers });
  }
}
